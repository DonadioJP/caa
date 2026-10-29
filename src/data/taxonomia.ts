/**
 * TAXONOMIA DO PORTAL
 *
 * Árvore de seções. Cada nó vira uma página-índice automaticamente
 * (ex.: /producao/bovinocultura-leite/bezerras/).
 *
 * `planejados` lista os guias previstos. O painel de produção (/painel/)
 * compara essa lista com os guias já escritos, para você ver a cobertura.
 * O slug planejado deve ser igual ao nome da pasta do guia quando ele for criado.
 *
 * `materiais` lista o que acompanha a seção sem ser um guia: ferramentas
 * interativas (Shiny), Open Machines, apresentações avulsas (Reveal.js) e
 * histórias de dados (Quarto). Aparecem no painel e, quando prontos, na
 * página da seção.
 */

export type TipoMaterial = 'ferramenta' | 'open-machine' | 'apresentacao' | 'historia';

export interface No {
  slug: string;
  nome: string;
  descricao?: string;
  /** false = seção ainda não aberta ao público (fica fora do menu) */
  ativo?: boolean;
  planejados?: [slug: string, titulo: string][];
  materiais?: [tipo: TipoMaterial, id: string, titulo: string][];
  filhos?: No[];
}

export const taxonomia: No[] = [
  {
    slug: 'fundamentos',
    nome: 'Fundamentos',
    descricao: 'As bases conceituais e éticas da criação animal agroecológica.',
    planejados: [
      ['o-que-e-agroecologia', 'O que é agroecologia?'],
      ['principios', 'Princípios da criação animal agroecológica'],
      ['pensamento-sistemico', 'Pensamento sistêmico e ciclos de nutrientes'],
      ['etica-bem-estar', 'Ética e bem-estar animal'],
      ['soberania-alimentar', 'Soberania alimentar e produção local'],
      ['como-usar', 'Como usar este portal'],
    ],
  },
  {
    slug: 'bases-ecologicas',
    nome: 'Bases Ecológicas e Manejo da Paisagem',
    descricao: 'Clima, solo, água, árvores, pastagens e restauração — a base de qualquer sistema.',
    filhos: [
      {
        slug: 'clima', nome: 'Clima e Ambiente',
        descricao: 'Clima local, chuva, seca, calor e frio, monitoramento por satélite, gases de efeito estufa e adaptação.',
        planejados: [
          ['clima-local', 'Compreendendo o clima local para planejamento'],
          ['chuva-produtividade', 'Padrões de chuva e produtividade'],
          ['manejo-seca', 'Manejo de seca'],
          ['estresse-termico', 'Estresse térmico em sistemas pastoris'],
          ['geadas-frio', 'Geadas e frio: proteção'],
          ['ventos', 'Ventos: erosão e conforto'],
          ['microclima', 'Microclima e gestão'],
          ['ndvi-monitoramento', 'NDVI e ferramentas de monitoramento'],
          ['mudancas-climaticas', 'Adaptação às mudanças climáticas'],
          ['pegada-carbono', 'Pegada de carbono da produção animal'],
          ['gases-efeito-estufa', 'Gases de efeito estufa (metano, N₂O)'],
          ['ferramentas-meteorologicas', 'Ferramentas meteorológicas gratuitas'],
        ],
      },
      {
        slug: 'solo', nome: 'Solo',
        descricao: 'Estrutura, biologia, matéria orgânica, compactação, análise, compostagem, carbono e recuperação.',
        planejados: [
          ['conhecendo-o-solo', 'Conhecendo o solo: textura, estrutura e biologia'],
          ['saude-do-solo', 'Saúde do solo'],
          ['materia-organica', 'Matéria orgânica do solo'],
          ['compactacao', 'Compactação sob pastejo'],
          ['biologia-do-solo', 'Biologia do solo (bactérias, fungos, minhocas)'],
          ['infiltracao', 'Infiltração de água no solo'],
          ['ph-calagem-gessagem', 'pH, calagem e gessagem'],
          ['ciclagem-nutrientes', 'Ciclagem de nutrientes'],
          ['fezes-urina', 'Distribuição de fezes e urina'],
          ['analise-de-solo', 'Amostragem e interpretação de análise de solo'],
          ['compostagem', 'Compostagem para fertilidade'],
          ['biofertilizantes', 'Biofertilizantes e inoculantes'],
          ['insumos-externos', 'Redução de insumos externos'],
          ['sequestro-carbono', 'Sequestro de carbono no solo'],
          ['minhocas-indicadoras', 'Minhocas como indicadoras'],
          ['degradacao-do-solo', 'Degradação do solo: identificação e recuperação'],
          ['avaliacao-visual', 'Avaliação visual do solo'],
        ],
        materiais: [
          ['ferramenta', 'autoavaliacao-saude-solo', 'Autoavaliação da Saúde do Solo'],
          ['ferramenta', 'painel-saude-solo', 'Painel de Saúde do Solo'],
          ['open-machine', 'infiltrometro-pvc', 'Infiltrômetro simples de PVC'],
          ['open-machine', 'amostrador-solo', 'Amostrador de solo de baixo custo'],
        ],
      },
      {
        slug: 'agua', nome: 'Água',
        descricao: 'Exigências hídricas, bebedouros, qualidade, bacias, matas ciliares, irrigação e captação.',
        planejados: [
          ['exigencias-hidricas', 'Exigências hídricas dos animais'],
          ['bebedouros', 'Desenho e posicionamento de bebedouros'],
          ['qualidade-da-agua', 'Qualidade da água: testes e tratamento'],
          ['bacias-hidrograficas', 'Manejo de bacias hidrográficas'],
          ['matas-ciliares', 'Matas ciliares e zonas ripárias'],
          ['irrigacao', 'Irrigação de pastagens'],
          ['areas-umidas', 'Manejo de áreas úmidas'],
          ['captacao-chuva', 'Captação de água da chuva'],
          ['sistemas-gravidade', 'Sistemas de água por gravidade'],
          ['agua-silvipastoril', 'Água em sistemas silvipastoris'],
          ['reuso-conservacao', 'Reuso e conservação de água'],
        ],
        materiais: [
          ['open-machine', 'bebedouro-gravidade', 'Bebedouro abastecido por gravidade'],
        ],
      },
      {
        slug: 'silvipastoris', nome: 'Árvores e Sistemas Silvipastoris',
        descricao: 'Escolha e estabelecimento de árvores, sombra, forrageiras, madeira, frutíferas, carbono e comportamento animal.',
        planejados: [
          ['introducao', 'Introdução aos sistemas silvipastoris'],
          ['selecao-especies', 'Seleção de espécies arbóreas'],
          ['estabelecimento', 'Estabelecimento de árvores em pastagens'],
          ['manejo-sombra', 'Manejo da sombra'],
          ['arvores-forrageiras', 'Árvores forrageiras e arbustos'],
          ['madeira', 'Produção de madeira integrada'],
          ['frutiferas', 'Frutíferas em pastagens'],
          ['cercas-vivas', 'Cercas vivas'],
          ['carbono-biodiversidade', 'Benefícios de carbono e biodiversidade'],
          ['comportamento-animal', 'Comportamento animal em sistemas silvipastoris'],
          ['densidade-arborea', 'Planejamento de densidade arbórea'],
        ],
        materiais: [
          ['apresentacao', 'carbono-silvipastoris', 'Sequestro de carbono em sistemas silvipastoris'],
          ['open-machine', 'estrutura-sombra', 'Estrutura de sombra para o estabelecimento silvipastoril'],
        ],
      },
      {
        slug: 'pastagens', nome: 'Pastagens e Forragem',
        descricao: 'Espécies forrageiras, pastagens polifíticas, leguminosas, qualidade, vazios forrageiros e planejamento anual.',
        planejados: [
          ['especies-forrageiras', 'Identificação e seleção de espécies forrageiras'],
          ['pastagens-polifiticas', 'Pastagens polifíticas'],
          ['gramineas-tropicais', 'Gramíneas tropicais'],
          ['gramineas-temperadas', 'Gramíneas temperadas'],
          ['leguminosas', 'Leguminosas forrageiras'],
          ['qualidade-forragem', 'Qualidade da forragem'],
          ['produtividade', 'Produtividade da pastagem'],
          ['vazios-forrageiros', 'Vazios forrageiros'],
          ['sobressemeadura', 'Sobressemeadura e renovação'],
          ['plantas-indicadoras', 'Plantas indicadoras'],
          ['conservacao-forragem', 'Conservação de forragem (feno, silagem, pré-secado)'],
          ['planejamento-forrageiro', 'Planejamento forrageiro anual'],
        ],
        materiais: [
          ['ferramenta', 'explorador-pastagens', 'Explorador de Tipos de Pastagem'],
        ],
      },
      {
        slug: 'pastoreio', nome: 'Manejo do Pastoreio',
        descricao: 'PRV, pastoreio adaptativo, lotação, descanso, piquetes, pastoreio diferido, ILP e suplementação.',
        planejados: [
          ['introducao', 'Introdução ao manejo agroecológico de pastagens'],
          ['pastoreio-continuo', 'Pastoreio contínuo: características e limitações'],
          ['prv', 'Pastoreio Racional Voisin (PRV)'],
          ['pastoreio-adaptativo', 'Pastoreio adaptativo multipiquetes'],
          ['taxa-lotacao', 'Cálculo de taxa de lotação'],
          ['descanso-ocupacao', 'Período de descanso e ocupação'],
          ['divisao-piquetes', 'Divisão de piquetes'],
          ['sinais-pastoreio', 'Sinais de subpastoreio e superpastoreio'],
          ['pastoreio-diferido', 'Pastoreio diferido'],
          ['mob-faixa', 'Pastoreio mob e em faixa diária'],
          ['ilp', 'Integração lavoura-pecuária'],
          ['calendario', 'Calendário de pastoreio anual'],
          ['suplementacao', 'Suplementação em pastoreio'],
        ],
        materiais: [
          ['ferramenta', 'planejador-prv', 'Planejador de Pastoreio Racional'],
          ['ferramenta', 'simulador-impacto', 'Simulador de Impacto do Pastoreio'],
          ['apresentacao', 'pastoreio-voisin', 'O Pastoreio Racional de Voisin'],
        ],
      },
      {
        slug: 'restauracao', nome: 'Restauração Ecológica',
        descricao: 'Áreas degradadas, caminhos de recuperação, ressemeadura, matéria orgânica, nativas, fogo e monitoramento.',
        planejados: [
          ['areas-degradadas', 'Identificação de áreas degradadas'],
          ['risco-degradacao', 'Avaliação de risco de degradação'],
          ['caminhos-recuperacao', 'Caminhos de recuperação (ativo e passivo)'],
          ['ressemeadura', 'Ressemeadura de pastagens degradadas'],
          ['reducao-compactacao', 'Redução da compactação'],
          ['materia-organica', 'Reconstrução da matéria orgânica do solo'],
          ['especies-nativas', 'Integração de espécies nativas'],
          ['manejo-fogo', 'Manejo do fogo'],
          ['areas-riparias', 'Restauração de áreas ripárias'],
          ['monitoramento', 'Monitoramento da recuperação'],
        ],
        materiais: [
          ['apresentacao', 'caminhos-restauracao', 'Caminhos para a restauração da terra'],
        ],
      },
    ],
  },
  {
    slug: 'producao',
    nome: 'Áreas de Produção',
    descricao: 'Sistemas produtivos específicos, por espécie e categoria animal.',
    filhos: [
      {
        slug: 'bovinocultura-leite',
        nome: 'Bovinocultura de Leite a Pasto',
        descricao: 'Do nascimento da bezerra à vaca adulta e à ordenha, em sistemas a pasto.',
        filhos: [
          {
            slug: 'fundamentos-da-area', nome: 'Fundamentos da Área',
            descricao: 'Panorama, sistemas de criação, raças, fisiologia, planejamento e comercialização.',
            planejados: [
              ['panorama', 'Panorama geral'], ['sistemas-criacao', 'Sistemas de criação'],
              ['ciclo-de-vida', 'Ciclo de vida e fases produtivas'], ['racas', 'Raças e recursos genéticos'],
              ['anatomia-fisiologia', 'Anatomia e fisiologia geral'], ['fisiologia-digestiva', 'Anatomia e fisiologia digestiva'],
              ['planejamento', 'Planejamento e decisão'], ['manejo-rotinas', 'Manejo geral e rotinas'],
              ['saude-disturbios', 'Saúde, sanidade e distúrbios nutricionais'], ['indicadores', 'Indicadores de eficiência e produtividade'],
              ['qualidade-produto', 'Qualidade do produto'], ['comercializacao', 'Comercialização e políticas públicas'],
              ['gestao-pessoas', 'Formação e gestão de pessoas'],
            ],
          },
          {
            slug: 'bezerras', nome: 'Bezerras',
            descricao: 'Colostro, alimentação, alojamento, desmame e bem-estar nos primeiros meses de vida.',
            planejados: [
              ['colostro', 'Colostro: importância, qualidade e manejo'],
              ['alimentacao', 'Alimentação: do leite à dieta sólida'],
              ['alojamento', 'Alojamento: sistemas e conforto'],
              ['acesso-pasto', 'Acesso a pasto'],
              ['vaca-bezerra', 'Separação vaca-bezerra'],
              ['doencas', 'Doenças comuns e prevenção'],
              ['dor', 'Controle da dor'],
              ['higiene', 'Higiene e biossegurança'],
              ['cama', 'Cama e conforto'],
              ['enriquecimento', 'Enriquecimento ambiental'],
              ['registros', 'Registro e monitoramento'],
              ['desmame', 'Estratégias de desmame'],
              ['cruzamento-leite-corte', 'Cruzamento leite-corte'],
              ['pos-desmame', 'Manejo pós-desmame'],
              ['grupo', 'Manejo em grupo'],
              ['cuidados-neonatais', 'Cuidados neonatais'],
              ['descorna', 'Descorna e mochação'],
              ['transporte', 'Transporte de bezerras'],
              ['estresse-termico', 'Estresse térmico'],
              ['interacao-humano-animal', 'Interação humano-animal'],
              ['indicadores-comportamentais', 'Indicadores comportamentais'],
              ['crescimento', 'Crescimento e desenvolvimento'],
            ],
            materiais: [
              ['ferramenta', 'bem-estar-bezerras', 'Escore de Bem-Estar de Bezerras'],
              ['apresentacao', 'separacao-vaca-bezerra', 'A ciência da separação vaca-bezerra'],
              ['open-machine', 'suporte-refratometro', 'Suporte de refratômetro para teste de colostro'],
            ],
          },
          {
            slug: 'novilhas', nome: 'Novilhas',
            descricao: 'Crescimento, sanidade, condição corporal e manejo reprodutivo até o primeiro parto.',
            planejados: [
              ['metas-crescimento', 'Metas de crescimento e idade ao primeiro parto'],
              ['alimentacao', 'Alimentação de novilhas'],
              ['sanidade', 'Manejo sanitário'],
              ['comportamento', 'Comportamento e bem-estar'],
              ['selecao', 'Seleção para reposição'],
              ['integracao-rebanho', 'Integração ao rebanho adulto'],
              ['condicao-corporal', 'Monitoramento de condição corporal'],
              ['idade-primeiro-parto', 'Redução da idade ao primeiro parto'],
              ['pastoreio', 'Pastoreio específico'],
              ['manejo-reprodutivo', 'Manejo reprodutivo'],
            ],
          },
          {
            slug: 'vacas-adultas', nome: 'Vacas Leiteiras',
            descricao: 'Bem-estar, saúde, nutrição na lactação, conforto térmico e longevidade.',
            planejados: [
              ['bem-estar', 'Bem-estar e comportamento'],
              ['saude', 'Saúde: doenças metabólicas e infecciosas'],
              ['nutricao-lactacao', 'Nutrição da vaca em lactação'],
              ['manejo-lactacao', 'Manejo de vacas em lactação'],
              ['conforto-termico', 'Conforto térmico e sombreamento'],
              ['longevidade-descarte', 'Longevidade e descarte voluntário'],
              ['condicao-corporal', 'Monitoramento de condição corporal'],
            ],
          },
          {
            slug: 'vaca-prenha-seca', nome: 'Vacas Prenhas e Secas',
            descricao: 'Período seco, programação fetal, transição, parto e os cuidados com a recém-parida.',
            planejados: [
              ['periodo-seco', 'Período seco: importância e duração'],
              ['nutricao', 'Nutrição da vaca seca'],
              ['transicao', 'Manejo de transição'],
              ['preparacao-parto', 'Preparação para o parto'],
              ['monitoramento-parto', 'Monitoramento do parto'],
              ['programacao-fetal', 'Programação fetal'],
              ['pos-parto', 'Cuidados pós-parto'],
              ['transtornos-metabolicos', 'Transtornos metabólicos'],
              ['retencao-placenta', 'Retenção de placenta'],
              ['reinicio-lactacao', 'Reinício da lactação'],
              ['recem-parida', 'Manejo da vaca recém-parida'],
            ],
          },
          {
            slug: 'touro', nome: 'Touro',
            descricao: 'Seleção, bem-estar, nutrição, avaliação andrológica e manejo reprodutivo.',
            planejados: [
              ['papel', 'Papel do touro no sistema'],
              ['selecao-genetica', 'Seleção e avaliação genética'],
              ['comportamento', 'Comportamento e bem-estar'],
              ['nutricao', 'Nutrição e condição corporal'],
              ['saude', 'Saúde e manejo sanitário'],
              ['instalacoes', 'Instalações e manejo'],
              ['manejo-reprodutivo', 'Manejo reprodutivo (libido, estação de monta)'],
              ['andrologica', 'Avaliação andrológica'],
              ['semen', 'Coleta e processamento de sêmen'],
              ['repasse', 'Touro de repasse'],
              ['integracao-rebanho', 'Integração ao rebanho'],
              ['silvipastoril', 'Touro em sistemas silvipastoris'],
              ['descarte', 'Descarte e longevidade'],
              ['registro', 'Registro genealógico'],
            ],
          },
          {
            slug: 'ordenha', nome: 'Manejo de Ordenha',
            descricao: 'Rotina, preparação do úbere, equipamentos, qualidade do leite e mastite.',
            planejados: [
              ['boas-praticas', 'Boas práticas de ordenha'],
              ['preparacao-ubere', 'Preparação do úbere e higiene'],
              ['rotina', 'Rotina de ordenha'],
              ['equipamentos', 'Equipamentos de ordenha'],
              ['qualidade-leite', 'Qualidade do leite (CCS, CBT)'],
              ['mastite', 'Mastite: prevenção e controle'],
              ['ordenha-a-pasto', 'Ordenha em sistemas a pasto'],
              ['bem-estar', 'Bem-estar na ordenha'],
              ['primiparas', 'Manejo de primíparas na ordenha'],
            ],
          },
        ],
      },
      // Futuras áreas — ficam fora do menu até terem conteúdo
      { slug: 'bovinocultura-corte', nome: 'Bovinocultura de Corte', ativo: false },
      { slug: 'ovinocultura', nome: 'Ovinocultura', ativo: false },
      { slug: 'caprinocultura', nome: 'Caprinocultura', ativo: false },
      { slug: 'avicultura', nome: 'Avicultura', ativo: false },
      { slug: 'suinocultura', nome: 'Suinocultura', ativo: false },
    ],
  },
  {
    slug: 'infraestrutura',
    nome: 'Infraestrutura e Equipamentos',
    descricao: 'Cercas, água, sombra, instalações, tecnologias de pastoreio e equipamentos de baixo custo.',
    planejados: [
      ['cercas', 'Cercas permanentes e temporárias'],
      ['cerca-eletrica', 'Cerca elétrica: instalação e solução de problemas'],
      ['agua-pastejo-rotativo', 'Sistemas de água para pastejo rotativo'],
      ['bebedouros-baixo-custo', 'Bebedouros de baixo custo'],
      ['estruturas-sombra', 'Estruturas de sombra'],
      ['corredores', 'Corredores de manejo'],
      ['sala-ordenha', 'Sala de ordenha e curral de espera'],
      ['monitoramento-remoto', 'Monitoramento remoto'],
      ['equipamentos-solo', 'Equipamentos de avaliação de solo'],
      ['carrinho-ordenha', 'Carrinho de ordenha móvel'],
    ],
    materiais: [
      ['open-machine', 'cerca-eletrica-portatil', 'Sistema portátil de cerca elétrica'],
      ['open-machine', 'revolvedor-composto', 'Revolvedor de leiras de composto'],
    ],
    filhos: [
      {
        slug: 'tecnologias-pastoreio', nome: 'Tecnologias para o Manejo do Pastoreio',
        descricao: 'Automação aberta para o pastoreio rotativo: localização do rebanho, porteiras, água e monitoramento por drone.',
        planejados: [
          ['coleiras-gps', 'Coleiras com GPS para cada vaca'],
          ['torre-transmissao', 'Torre de transmissão da localização'],
          ['porteiras-automaticas', 'Porteiras automáticas'],
          ['sinal-sonoro', 'Sinal sonoro para a troca de piquete'],
          ['bebedouro-central', 'Bebedouro central automático para quatro piquetes'],
          ['esvaziamento-bebedouros', 'Esvaziamento automático de bebedouros'],
          ['drone-monitoramento', 'Avaliação da pastagem por drone de voo baixo'],
        ],
      },
    ],
  },
  {
    slug: 'gestao',
    nome: 'Gestão, Economia e Sociedade',
    descricao: 'Planejamento, economia, mercados, políticas públicas, extensão e transição agroecológica.',
    planejados: [
      ['planejamento-propriedade', 'Planejamento da propriedade'],
      ['administracao', 'Administração e gestão de pessoas'],
      ['economia', 'Economia e comercialização'],
      ['cadeias-curtas', 'Cadeias curtas e mercados diferenciados'],
      ['politicas-publicas', 'Políticas públicas, crédito e PRONAF'],
      ['extensao', 'Educação, extensão rural e socialização do conhecimento'],
      ['transicao', 'Transição agroecológica e sucessão familiar'],
      ['ciencia-cidada', 'Ciência cidadã e coprodução de conhecimento'],
    ],
    materiais: [
      ['ferramenta', 'indice-transicao', 'Índice de Transição Agroecológica'],
      ['ferramenta', 'calculadora-emergia', 'Calculadora de Análise Emergética'],
      ['historia', 'agrotoxicos-captura-corporativa', 'Política de agrotóxicos e captura corporativa'],
      ['apresentacao', 'economia-politica-agroecologia', 'Economia política da agroecologia no Brasil'],
      ['apresentacao', 'policrise-pecuaria', 'Policrise e produção animal'],
    ],
  },
];
