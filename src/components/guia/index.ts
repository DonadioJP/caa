// Componentes disponíveis em qualquer guia.mdx, sem precisar importar.
// O Caderno de Campo não entra aqui: ele fica em caderno.md, na pasta do guia,
// e o layout o mostra no fim da página.
import Aviso from './Aviso.astro';
import Protocolo from './Protocolo.astro';
import Checklist from './Checklist.astro';
import Dica from './Dica.astro';
import ExemploReal from './ExemploReal.astro';
import ArvoreDeDecisao from './ArvoreDeDecisao.astro';

export const componentesDoGuia = { Aviso, Protocolo, Checklist, Dica, ExemploReal, ArvoreDeDecisao };
