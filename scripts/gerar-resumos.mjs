/**
 * GERA OS RESUMOS EM PDF — roda depois do `astro build` (veja "build" no package.json).
 *
 * Para cada página dist/resumos/<guia>/index.html, abre no Chromium (Playwright)
 * e salva dist/resumos/<guia>.pdf, A4, uma página.
 * Serve o dist/ num servidor local simples, para os caminhos /caa/_astro/...
 * funcionarem como no site publicado.
 *
 * Para quando: a página passa de uma folha ou o PDF passa de LIMITE_KB
 * (o arquivo precisa ser leve para circular no WhatsApp).
 */
import { createServer } from 'node:http';
import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { join, extname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const BASE = (process.env.CAA_BASE ?? '/').replace(/\/$/, '');
const LIMITE_KB = 600;

const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff',
};

/** Todas as pastas com index.html dentro de dist/resumos/ */
async function paginasDeResumo(pasta) {
  const saida = [];
  for (const item of await readdir(pasta, { withFileTypes: true })) {
    const caminho = join(pasta, item.name);
    if (item.isDirectory()) saida.push(...(await paginasDeResumo(caminho)));
    else if (item.name === 'index.html') saida.push(pasta);
  }
  return saida;
}

const servidor = createServer(async (req, res) => {
  let caminho = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (BASE && caminho.startsWith(BASE)) caminho = caminho.slice(BASE.length);
  if (caminho.endsWith('/')) caminho += 'index.html';
  try {
    const conteudo = await readFile(join(DIST, caminho));
    res.writeHead(200, { 'content-type': TIPOS[extname(caminho)] ?? 'application/octet-stream' });
    res.end(conteudo);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((ok) => servidor.listen(0, '127.0.0.1', ok));
const porta = servidor.address().port;

const pastas = await paginasDeResumo(join(DIST, 'resumos')).catch(() => []);
const navegador = await chromium.launch();
const pagina = await navegador.newPage();
await pagina.emulateMedia({ media: 'print', colorScheme: 'light' });
const erros = [];

for (const pasta of pastas) {
  const id = relative(join(DIST, 'resumos'), pasta).split(sep).join('/');
  await pagina.goto(`http://127.0.0.1:${porta}${BASE}/resumos/${id}/`, { waitUntil: 'networkidle' });
  await pagina.evaluate(() => document.fonts.ready);

  // A .folha tem altura fixa de A4: se o conteúdo for maior, não cabe em uma página
  const transborda = await pagina.evaluate(() => {
    const f = document.querySelector('.folha');
    return f ? f.scrollHeight - f.clientHeight : 0;
  });
  if (transborda > 1) {
    erros.push(`${id}: o resumo passou de uma página (sobram ${transborda}px). Encurte a mensagem, os pontos do "Em 1 minuto" ou o diagrama.`);
    continue;
  }

  const destino = `${pasta}.pdf`;
  await writeFile(destino, await pagina.pdf({ preferCSSPageSize: true, printBackground: true }));
  const kb = Math.round((await stat(destino)).size / 1024);
  if (kb > LIMITE_KB) erros.push(`${id}: o PDF ficou com ${kb} KB (limite ${LIMITE_KB} KB). Use um diagrama mais leve (SVG).`);
  console.log(`[resumos] ${id}.pdf (${kb} KB)`);
}

await navegador.close();
servidor.close();

if (erros.length) {
  console.error(`\n[resumos] Não foi possível gerar ${erros.length} resumo(s):\n- ${erros.join('\n- ')}`);
  process.exit(1);
}
