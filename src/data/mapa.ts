/**
 * MAPA DA PROPRIEDADE (página inicial)
 *
 * Cada elemento da paisagem leva a uma seção do portal.
 * `caminho` é o endereço da seção na taxonomia; nome, descrição e
 * contagem de guias vêm de lá automaticamente.
 * `pino` é a posição do marcador no desenho (viewBox 1200 × 520).
 *
 * Para mudar um destino, troque o `caminho`. Para mudar o texto curto
 * dos atalhos, troque o `rotulo`.
 */
export interface PontoDoMapa {
  id: string;
  caminho: string;
  rotulo: string;
  pino: [x: number, y: number];
}

export const pontosDoMapa: PontoDoMapa[] = [
  { id: 'clima', caminho: 'bases-ecologicas/clima', rotulo: 'Clima', pino: [1000, 112] },
  { id: 'gestao', caminho: 'gestao', rotulo: 'Gestão e sociedade', pino: [1126, 188] },
  { id: 'infraestrutura', caminho: 'infraestrutura', rotulo: 'Instalações', pino: [959, 238] },
  { id: 'silvipastoris', caminho: 'bases-ecologicas/silvipastoris', rotulo: 'Árvores', pino: [470, 182] },
  { id: 'vacas', caminho: 'producao/bovinocultura-leite', rotulo: 'Vacas leiteiras', pino: [596, 246] },
  { id: 'bezerras', caminho: 'producao/bovinocultura-leite/bezerras', rotulo: 'Bezerras', pino: [700, 262] },
  { id: 'pastoreio', caminho: 'bases-ecologicas/pastoreio', rotulo: 'Pastoreio', pino: [937, 313] },
  { id: 'pastagens', caminho: 'bases-ecologicas/pastagens', rotulo: 'Pastagens', pino: [350, 338] },
  { id: 'agua', caminho: 'bases-ecologicas/agua', rotulo: 'Água', pino: [230, 352] },
  { id: 'restauracao', caminho: 'bases-ecologicas/restauracao', rotulo: 'Restauração', pino: [66, 334] },
  { id: 'solo', caminho: 'bases-ecologicas/solo', rotulo: 'Solo', pino: [820, 452] },
  { id: 'fundamentos', caminho: 'fundamentos', rotulo: 'Fundamentos', pino: [470, 446] },
];
