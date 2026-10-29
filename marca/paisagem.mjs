/**
 * A paisagem larga (céu, sol, duas vacas, pasto, solo com raízes).
 * Usada na abertura do site (Paisagem.astro), no fundo das aulas
 * (public/marca/paisagem.svg) e em miniaturas de vídeo.
 */
import { CORES } from './simbolo.mjs';

const VACA = `<path d="M8 .6 Q15 -.4 20.5 -.2 Q23.6 0 24.4 2.4 L24.8 7.4 Q24.8 8.6 23.4 8.6 Q15 9.3 8.6 8.4 Q7.2 8.2 6.6 7.4 L4.6 10.2 L2.6 12.8 Q1.6 13.6 .6 12.9 Q0 12.4 .4 11.6 L2.4 7.4 Q3.6 5.2 5.4 3.4 Q6.6 1.4 8 .6Z"/>
<path d="M4.4 5.2 L7.4 4 L5.8 6.8Z"/><path d="M15.6 8.6 Q17.4 11 19.2 8.6Z"/>
<rect x="7.6" y="7.6" width="1.45" height="6.4" rx=".5"/><rect x="10.4" y="7.6" width="1.45" height="6.4" rx=".5"/>
<rect x="19.8" y="7.6" width="1.45" height="6.4" rx=".5"/><rect x="22.6" y="7.6" width="1.45" height="6.4" rx=".5"/>
<ellipse cx="25.6" cy="9.2" rx=".7" ry="1.1"/>`;

const pinta = (c, prop = 'fill') => (c.startsWith('var(') ? `style="${prop}:${c}"` : `${prop}="${c}"`);

export function paisagem({ cores = CORES } = {}) {
  const raizes = Array.from({ length: 14 }, (_, i) => {
    const x = 40 + i * 86 + (i % 3) * 9;
    const y = 196 - Math.sin(i * 1.3) * 3;
    const c = 14 + (i % 4) * 5;
    return `M${x} ${y} c-2 ${c * .5} -8 ${c * .8} -12 ${c} M${x + 2} ${y} c1 ${c * .6} -2 ${c} 1 ${c + 8} M${x + 4} ${y} c3 ${c * .4} 9 ${c * .7} 11 ${c - 2}`;
  }).join(' ');
  return `<rect width="1200" height="300" ${pinta(cores.ceu)}/>
<circle cx="1010" cy="92" r="30" ${pinta(cores.sol)}/>
<path d="M0 150 C 180 108, 360 112, 560 140 S 900 160, 1200 118 V300 H0Z" ${pinta(cores.colina)}/>
<g ${pinta(cores.vaca)} transform="translate(300 83) scale(2.8)">${VACA}
<path d="M24.3 1.4 Q26.2 3.6 25.6 8.6" fill="none" ${pinta(cores.vaca, 'stroke')} stroke-width=".8" stroke-linecap="round"/></g>
<g ${pinta(cores.vaca)} transform="translate(760 122) scale(-2.1 2.1)">${VACA}</g>
<path d="M0 176 C 200 160, 420 158, 640 170 S 1000 178, 1200 160 V300 H0Z" ${pinta(cores.pasto)}/>
<path d="M0 198 C 300 190, 700 194, 1200 186 V300 H0Z" ${pinta(cores.solo)}/>
<path d="M0 262 C 340 256, 760 262, 1200 252 V300 H0Z" ${pinta(cores.soloFundo)}/>
<path d="${raizes}" fill="none" ${pinta(cores.raiz, 'stroke')} stroke-width="1.5" stroke-linecap="round" opacity=".6"/>`;
}
