/**
 * Gera os arquivos da marca em /public/marca e o favicon.
 * Rodar com: node marca/gerar-marca.mjs
 * O texto vira contorno, para que os SVGs abram em qualquer programa
 * (Inkscape, Kdenlive, LibreOffice) mesmo sem as fontes instaladas.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';
import { simbolo } from './simbolo.mjs';
import { paisagem } from './paisagem.mjs';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const saida = path.join(raiz, 'public/marca');
fs.mkdirSync(saida, { recursive: true });

const titulo = 'Criação Animal Agroecológica';
const svg = (vb, corpo) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="${titulo}"><title>${titulo}</title>${corpo}</svg>\n`;
const grava = (arq, conteudo) => fs.writeFileSync(path.join(saida, arq), conteudo);

/* ---------- Texto em contornos ---------- */
const fonte = (arq) => opentype.parse(fs.readFileSync(path.join(raiz, 'node_modules/@fontsource/alegreya/files', arq)).buffer);
const negrito = fonte('alegreya-latin-700-normal.woff');
const italico = fonte('alegreya-latin-500-italic.woff');
const contorno = (f, texto, x, y, tam, cor) => ({
  d: `<path d="${f.getPath(texto, x, y, tam).toPathData(2)}" fill="${cor}"/>`,
  larg: f.getAdvanceWidth(texto, tam),
});

function horizontal(tinta, verde, id) {
  const l1 = contorno(negrito, 'Criação Animal', 116, 46, 44, tinta);
  const l2 = contorno(italico, 'Agroecológica', 117, 86, 40, verde);
  const larg = Math.ceil(116 + Math.max(l1.larg, l2.larg) + 6);
  return svg(`0 0 ${larg} 100`, simbolo({ id }) + l1.d + l2.d);
}

function vertical(tinta, verde, id) {
  const l1 = contorno(negrito, 'Criação Animal', 0, 0, 44, tinta);
  const l2 = contorno(italico, 'Agroecológica', 0, 0, 40, verde);
  const larg = Math.ceil(Math.max(l1.larg, l2.larg, 160)) + 8;
  const cx = larg / 2;
  const t1 = contorno(negrito, 'Criação Animal', cx - l1.larg / 2, 214, 44, tinta);
  const t2 = contorno(italico, 'Agroecológica', cx - l2.larg / 2, 256, 40, verde);
  return svg(`0 0 ${larg} 270`, `<g transform="translate(${cx - 80} 0) scale(1.6)">${simbolo({ id })}</g>` + t1.d + t2.d);
}

grava('caa-simbolo.svg', svg('0 0 100 100', simbolo()));
grava('caa-horizontal.svg', horizontal('#1B2318', '#3B6B2A', 'hc'));
grava('caa-horizontal-escuro.svg', horizontal('#E4EBE0', '#93C873', 'he'));
grava('caa-vertical.svg', vertical('#1B2318', '#3B6B2A', 'vc'));
grava('caa-vertical-escuro.svg', vertical('#E4EBE0', '#93C873', 've'));

// Monocromática (carimbo, impressão P&B, bordado): uma cor em tons
const m = (op) => ({ cor: '#1B2318', opacidade: op });
grava('caa-simbolo-mono.svg', svg('0 0 100 100', simbolo({
  id: 'm',
  cores: { ceu: m(.15), sol: m(.45), colina: m(.45), pasto: m(.7), solo: m(.85), soloFundo: m(1), raiz: '#FFFFFF', vaca: m(1) },
})));

// Favicon: sem raízes (somem em 16–32 px)
fs.writeFileSync(path.join(raiz, 'public/favicon.svg'), svg('0 0 100 100', simbolo({ raizes: false, id: 'f' })));

// Paisagem larga: fundo das aulas, capas de vídeo, cabeçalhos de PDF
// O céu desbota para o fundo da página no alto, para a faixa não ter borda dura
const ceuDegrade = `<defs><linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7F9F5"/><stop offset=".45" stop-color="#8EC3E6"/></linearGradient></defs>`;
grava('paisagem.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice">${ceuDegrade}${paisagem().replace('<rect width="1200" height="300" fill="#8EC3E6"/>', '<rect width="1200" height="300" fill="url(#ceu)"/>')}</svg>\n`);

console.log('Marca gerada em', saida);
