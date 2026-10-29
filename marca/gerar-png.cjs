// Gera versões PNG da marca (ícone do celular, redes sociais, miniaturas de vídeo).
// Rodar depois de gerar-marca.mjs:  node marca/gerar-png.cjs
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../public/marca');
const svg = (f) => fs.readFileSync(path.join(dir, f), 'utf8');
const trabalhos = [
  ['caa-icone-180.png', 'caa-simbolo.svg', 180, 180, '#F7F9F5', 10],
  ['caa-icone-512.png', 'caa-simbolo.svg', 512, 512, 'transparent', 0],
  ['caa-horizontal.png', 'caa-horizontal.svg', 1200, 240, 'transparent', 20],
  ['caa-horizontal-escuro.png', 'caa-horizontal-escuro.svg', 1200, 240, 'transparent', 20],
];
(async () => {
  const b = await chromium.launch();
  for (const [saida, origem, w, h, fundo, margem] of trabalhos) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.setContent(`<style>html,body{margin:0;background:${fundo}}div{box-sizing:border-box;width:${w}px;height:${h}px;padding:${margem}px;display:flex;align-items:center;justify-content:center}svg{max-width:100%;max-height:100%;height:100%}</style><div>${svg(origem)}</div>`);
    await p.screenshot({ path: path.join(dir, saida), omitBackground: fundo === 'transparent' });
    await p.close();
  }
  await b.close();
  console.log('PNGs gerados');
})();
