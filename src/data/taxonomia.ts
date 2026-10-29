/**
 * TAXONOMIA DO PORTAL
 *
 * Árvore de seções. Cada nó vira uma página-índice automaticamente
 * (ex.: /producao/bovinocultura-leite/bezerras/).
 *
 * `planejados` lista os guias previstos. O painel de produção (/painel/)
 * compara essa lista com os guias já escritos, para você ver a cobertura.
 * O slug planejado deve ser igual ao nome da pasta do guia quando ele for criado.
 */

export interface No {
  slug: string;
  nome: string;
  descricao?: string;
  /** false = seção ainda não aberta ao público (fica fora do menu) */
  ativo?: boolean;
  planejados?: [slug: string, titulo: string][];
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
      { slug: 'clima', nome: 'Clima e Ambiente', descricao: 'Padrões climáticos, seca, estresse térmico, monitoramento por satélite e pegada de carbono.', planejados: [
        ['padroes-climaticos', 'Padrões climáticos'], ['manejo-seca', 'Manejo de seca'],
        ['estresse-termico', 'Estresse térmico'], ['monitoramento-ndvi', 'Monitoramento com NDVI'],
        ['pegada-carbono', 'Pegada de carbono'],
      ] },
      { slug: 'solo', nome: 'Solo', descricao: 'Estrutura, biologia, matéria orgânica, compactação, amostragem, compostagem e recuperação.', planejados: [
        ['textura-estrutura', 'Textura e estrutura'], ['biologia-do-solo', 'Biologia do solo'],
        ['materia-organica', 'Matéria orgânica'], ['compactacao', 'Compactação'],
        ['infiltracao', 'Infiltração'], ['ph-e-correcao', 'pH e correção'],
        ['ciclagem-nutrientes', 'Ciclagem de nutrientes'], ['amostragem', 'Amostragem de solo'],
        ['compostagem', 'Compostagem'], ['sequestro-carbono', 'Sequestro de carbono'],
        ['degradacao-recuperacao', 'Degradação e recuperação'],
      ] },
      { slug: 'agua', nome: 'Água', descricao: 'Exigências hídricas, bebedouros, qualidade da água, matas ciliares e sistemas por gravidade.', planejados: [
        ['exigencias-hidricas', 'Exigências hídricas'], ['bebedouros', 'Bebedouros'],
        ['qualidade-da-agua', 'Qualidade da água'], ['bacias-matas-ciliares', 'Bacias e matas ciliares'],
        ['captacao', 'Captação de água'], ['sistemas-gravidade', 'Sistemas por gravidade'],
      ] },
      { slug: 'silvipastoris', nome: 'Árvores e Sistemas Silvipastoris', descricao: 'Escolha de espécies, sombra, árvores forrageiras, cercas vivas, carbono e biodiversidade.', planejados: [
        ['selecao-especies', 'Seleção de espécies'], ['estabelecimento', 'Estabelecimento'],
        ['manejo-sombra', 'Manejo da sombra'], ['arvores-forrageiras', 'Árvores forrageiras'],
        ['cercas-vivas', 'Cercas vivas'], ['carbono-biodiversidade', 'Carbono e biodiversidade'],
      ] },
      { slug: 'pastagens', nome: 'Pastagens e Forragem', descricao: 'Espécies forrageiras, pastagens polifíticas, leguminosas, qualidade, vazios forrageiros e conservação.', planejados: [
        ['selecao-especies', 'Identificação e seleção de espécies'], ['pastagens-polifiticas', 'Pastagens polifíticas'],
        ['leguminosas', 'Leguminosas'], ['qualidade-forragem', 'Qualidade da forragem'],
        ['vazios-forrageiros', 'Vazios forrageiros'], ['sobressemeadura', 'Sobressemeadura'],
        ['conservacao-forragem', 'Conservação de forragem'],
      ] },
      { slug: 'pastoreio', nome: 'Manejo do Pastoreio', descricao: 'Pastoreio Racional Voisin, taxa de lotação, período de descanso, piquetes e calendário de pastejo.', planejados: [
        ['prv', 'Pastoreio Racional Voisin (PRV)'], ['taxa-lotacao', 'Taxa de lotação'],
        ['periodo-descanso', 'Período de descanso'], ['divisao-piquetes', 'Divisão de piquetes'],
        ['sinais-pastejo', 'Sinais de sub e superpastejo'], ['ilp', 'Integração lavoura-pecuária'],
        ['calendario-pastejo', 'Calendário de pastejo'],
      ] },
      { slug: 'restauracao', nome: 'Restauração Ecológica', descricao: 'Áreas degradadas, caminhos de recuperação, espécies nativas, fogo, áreas ripárias e monitoramento.', planejados: [
        ['areas-degradadas', 'Identificação de áreas degradadas'], ['caminhos-recuperacao', 'Caminhos de recuperação'],
        ['especies-nativas', 'Espécies nativas'], ['manejo-fogo', 'Manejo do fogo'],
        ['areas-riparias', 'Áreas ripárias'], ['monitoramento', 'Monitoramento'],
      ] },
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
          { slug: 'fundamentos-da-area', nome: 'Fundamentos da Área', descricao: 'Panorama, sistemas de criação, raças, fisiologia, planejamento e comercialização.', planejados: [
            ['panorama', 'Panorama geral'], ['sistemas-criacao', 'Sistemas de criação'],
            ['ciclo-de-vida', 'Ciclo de vida e fases produtivas'], ['racas', 'Raças e recursos genéticos'],
            ['anatomia-fisiologia', 'Anatomia e fisiologia geral'], ['fisiologia-digestiva', 'Anatomia e fisiologia digestiva'],
            ['planejamento', 'Planejamento e decisão'], ['manejo-rotinas', 'Manejo geral e rotinas'],
            ['saude-disturbios', 'Saúde, sanidade e distúrbios nutricionais'], ['indicadores', 'Indicadores de eficiência'],
            ['qualidade-produto', 'Qualidade do produto'], ['comercializacao', 'Comercialização e políticas públicas'],
            ['gestao-pessoas', 'Formação e gestão de pessoas'],
          ] },
          { slug: 'bezerras', nome: 'Bezerras', descricao: 'Colostro, alimentação, alojamento, desmame e bem-estar nos primeiros meses de vida.', planejados: [
            ['colostro', 'Colostro'], ['alimentacao', 'Alimentação'], ['alojamento', 'Alojamento'],
            ['acesso-pasto', 'Acesso ao pasto'], ['vaca-bezerra', 'Separação vaca-bezerra'],
            ['doencas', 'Doenças'], ['dor', 'Dor e analgesia'], ['higiene', 'Higiene'], ['cama', 'Cama'],
            ['enriquecimento', 'Enriquecimento ambiental'], ['registros', 'Registros'], ['desmame', 'Desmame'],
            ['cruzamento-leite-corte', 'Cruzamento leite-corte'], ['pos-desmame', 'Pós-desmame'],
            ['grupo', 'Alojamento em grupo'], ['cuidados-neonatais', 'Cuidados neonatais'],
            ['descorna', 'Descorna'], ['transporte', 'Transporte'], ['estresse-termico', 'Estresse térmico'],
            ['interacao-humano-animal', 'Interação humano-animal'], ['indicadores-comportamentais', 'Indicadores comportamentais'],
            ['crescimento', 'Crescimento e desenvolvimento'],
          ] },
          { slug: 'novilhas', nome: 'Novilhas', descricao: 'Crescimento, sanidade, condição corporal e manejo reprodutivo até o primeiro parto.', planejados: [
            ['metas-crescimento', 'Metas de crescimento'], ['alimentacao', 'Alimentação'], ['sanidade', 'Sanidade'],
            ['comportamento', 'Comportamento'], ['selecao', 'Seleção'], ['integracao-rebanho', 'Integração ao rebanho'],
            ['condicao-corporal', 'Condição corporal'], ['idade-primeiro-parto', 'Idade ao primeiro parto'],
            ['pastoreio', 'Pastoreio'], ['manejo-reprodutivo', 'Manejo reprodutivo'],
          ] },
          { slug: 'vacas-adultas', nome: 'Vacas Adultas', descricao: 'Bem-estar, saúde, nutrição na lactação, conforto térmico e longevidade.', planejados: [
            ['bem-estar', 'Bem-estar'], ['saude', 'Saúde metabólica e infecciosa'], ['nutricao-lactacao', 'Nutrição na lactação'],
            ['manejo-lactacao', 'Manejo da lactação'], ['conforto-termico', 'Conforto térmico'],
            ['longevidade-descarte', 'Longevidade e descarte'], ['condicao-corporal', 'Monitoramento da condição corporal'],
          ] },
          { slug: 'vaca-prenha-seca', nome: 'Vaca Prenha / Seca', descricao: 'Período seco, transição, parto e os cuidados com a recém-parida.', planejados: [
            ['periodo-seco', 'Período seco'], ['nutricao', 'Nutrição'], ['transicao', 'Período de transição'],
            ['preparacao-parto', 'Preparação para o parto'], ['monitoramento-parto', 'Monitoramento do parto'],
            ['pos-parto', 'Cuidados pós-parto'], ['transtornos-metabolicos', 'Transtornos metabólicos'],
            ['retencao-placenta', 'Retenção de placenta'], ['reinicio-lactacao', 'Reinício da lactação'],
            ['recem-parida', 'Manejo da recém-parida'],
          ] },
          { slug: 'touro', nome: 'Touro', descricao: 'Seleção, bem-estar, nutrição, avaliação andrológica e manejo reprodutivo.', planejados: [
            ['papel', 'O papel do touro'], ['selecao-genetica', 'Seleção genética'], ['comportamento', 'Comportamento e bem-estar'],
            ['nutricao', 'Nutrição'], ['saude', 'Saúde'], ['instalacoes', 'Instalações'], ['manejo-reprodutivo', 'Manejo reprodutivo'],
            ['andrologica', 'Avaliação andrológica'], ['semen', 'Coleta e processamento de sêmen'],
            ['repasse', 'Touro de repasse'], ['integracao-rebanho', 'Integração ao rebanho'],
            ['silvipastoril', 'Touro no silvipastoril'], ['descarte', 'Descarte'], ['registro', 'Registro genealógico'],
          ] },
          { slug: 'ordenha', nome: 'Manejo de Ordenha', descricao: 'Rotina, preparação do úbere, equipamentos, qualidade do leite e mastite.', planejados: [
            ['boas-praticas', 'Boas práticas'], ['preparacao-ubere', 'Preparação do úbere'], ['rotina', 'Rotina de ordenha'],
            ['equipamentos', 'Equipamentos'], ['qualidade-leite', 'Qualidade do leite (CCS, CBT)'], ['mastite', 'Mastite'],
            ['ordenha-a-pasto', 'Ordenha a pasto'], ['bem-estar', 'Bem-estar na ordenha'], ['primiparas', 'Primíparas'],
          ] },
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
    descricao: 'Cercas, água, sombra, instalações e tecnologia de baixo custo.',
    planejados: [
      ['cercas', 'Cercas permanentes e temporárias'], ['cerca-eletrica', 'Cerca elétrica'],
      ['agua-pastejo-rotativo', 'Sistemas de água para pastejo rotativo'], ['estruturas-sombra', 'Estruturas de sombra'],
      ['corredores', 'Corredores de manejo'], ['sala-ordenha', 'Sala de ordenha e curral de espera'],
      ['monitoramento-remoto', 'Monitoramento remoto'],
    ],
  },
  {
    slug: 'gestao',
    nome: 'Gestão, Economia e Sociedade',
    descricao: 'Planejamento, economia, mercados, políticas públicas e transição agroecológica.',
    planejados: [
      ['planejamento-propriedade', 'Planejamento da propriedade'], ['administracao', 'Administração e gestão de pessoas'],
      ['economia', 'Economia e comercialização'], ['cadeias-curtas', 'Cadeias curtas e mercados diferenciados'],
      ['politicas-publicas', 'Políticas públicas, crédito e PRONAF'], ['extensao', 'Educação e extensão rural'],
      ['transicao', 'Transição agroecológica e sucessão familiar'], ['ciencia-cidada', 'Ciência cidadã'],
    ],
  },
];
