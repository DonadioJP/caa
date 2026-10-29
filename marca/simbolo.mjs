/**
 * Desenho do símbolo da marca — um corte da paisagem: céu, sol, vaca pastando,
 * pasto e solo com raízes. Usado pelo gerador de arquivos (gerar-marca.mjs) e
 * pelo componente do site (src/components/marca/Simbolo.astro), para que exista
 * um único desenho.
 *
 * Cada cor pode ser um hex ("#3F7A2C"), uma variável CSS ("var(--ilu-pasto)")
 * ou { cor, opacidade } para a versão monocromática.
 */
export const CORES = {
  ceu: '#8EC3E6',
  sol: '#F2C14E',
  colina: '#79AE4E',
  pasto: '#3F7A2C',
  solo: '#8A4527', // terra roxa
  soloFundo: '#5F2E19',
  raiz: '#E3B48F',
  vaca: '#24331D',
};

export const CORES_CSS = {
  ceu: 'var(--ilu-ceu)', sol: 'var(--ilu-sol)', colina: 'var(--ilu-colina)', pasto: 'var(--ilu-pasto)',
  solo: 'var(--ilu-solo)', soloFundo: 'var(--ilu-solo-fundo)', raiz: 'var(--ilu-raiz)', vaca: 'var(--ilu-vaca)',
};

const pinta = (c, prop = 'fill') => {
  if (typeof c === 'object') return `${prop}="${c.cor}" ${prop}-opacity="${c.opacidade}"`;
  return c.startsWith('var(') ? `style="${prop}:${c}"` : `${prop}="${c}"`;
};

export function simbolo({ cores = CORES, raizes = true, sol = true, vaca = true, id = 'caa' } = {}) {
  const raizesSvg = [[17, 71.2], [36, 70.3], [57, 70.3], [78, 69.4]]
    .map(([x, y], i) =>
      `<path d="M${x} ${y} c-.4 3 -2 5 -3.2 7.6 M${x + .6} ${y} c.2 3.4 -.6 6.4 .2 10 M${x + 1.2} ${y} c.8 2.4 2.6 4 3 ${6 + (i % 2) * 2} M${x + .3} ${y + 3} c-1.6 1 -2.2 2.4 -2.6 3.8"/>`)
    .join('');
  return `<defs><clipPath id="${id}-c"><circle cx="50" cy="50" r="48"/></clipPath></defs>
<g clip-path="url(#${id}-c)">
<rect width="100" height="100" ${pinta(cores.ceu)}/>
${sol ? `<circle cx="72" cy="27" r="8" ${pinta(cores.sol)}/>` : ''}
<path d="M0 56 C 20 45, 44 46, 62 52 S 90 55, 100 49 V100 H0Z" ${pinta(cores.colina)}/>
${vaca ? `<g ${pinta(cores.vaca)} transform="translate(23.5 36)">
<path d="M8 .6 Q15 -.4 20.5 -.2 Q23.6 0 24.4 2.4 L24.8 7.4 Q24.8 8.6 23.4 8.6 Q15 9.3 8.6 8.4 Q7.2 8.2 6.6 7.4 L4.6 10.2 L2.6 12.8 Q1.6 13.6 .6 12.9 Q0 12.4 .4 11.6 L2.4 7.4 Q3.6 5.2 5.4 3.4 Q6.6 1.4 8 .6Z"/>
<path d="M4.4 5.2 L7.4 4 L5.8 6.8Z"/><path d="M15.6 8.6 Q17.4 11 19.2 8.6Z"/>
<rect x="7.6" y="7.6" width="1.45" height="6.4" rx=".5"/><rect x="10.4" y="7.6" width="1.45" height="6.4" rx=".5"/>
<rect x="19.8" y="7.6" width="1.45" height="6.4" rx=".5"/><rect x="22.6" y="7.6" width="1.45" height="6.4" rx=".5"/>
<ellipse cx="25.6" cy="9.2" rx=".7" ry="1.1"/>
</g>
<path d="M24.3 1.4 Q26.2 3.6 25.6 8.6" transform="translate(23.5 36)" fill="none" ${pinta(cores.vaca, 'stroke')} stroke-width=".8" stroke-linecap="round"/>` : ''}
<path d="M0 63 C 18 58, 34 57, 52 61 S 84 64, 100 58 V100 H0Z" ${pinta(cores.pasto)}/>
<path d="M0 72 C 30 69.5, 66 70.5, 100 68.5 V100 H0Z" ${pinta(cores.solo)}/>
<path d="M0 87 C 34 85, 70 87, 100 84.5 V100 H0Z" ${pinta(cores.soloFundo)}/>
${raizes ? `<g fill="none" ${pinta(cores.raiz, 'stroke')} stroke-width=".8" stroke-linecap="round" opacity=".8">${raizesSvg}</g>` : ''}
</g>`;
}
