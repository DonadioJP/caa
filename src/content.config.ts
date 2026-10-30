/**
 * ESQUEMA DE CONTEÚDO — Criação Animal Agroecológica
 *
 * Princípio: "a pasta é o endereço".
 * Cada guia é uma pasta. O caminho da pasta define a área, o sistema e a
 * categoria — não é preciso repetir isso no frontmatter.
 *
 *   src/content/guias/producao/bovinocultura-leite/bezerras/colostro/
 *     ├── guia.mdx      → página do guia          (obrigatório)
 *     ├── aula.md       → slides da aula          (opcional)
 *     ├── roteiro.md    → roteiro do vídeo        (opcional, não publicado)
 *     ├── caderno.md    → Caderno de Campo, no fim da página (opcional)
 *     └── imagens/      → figuras do guia e da aula
 *
 * As coleções guias, aulas, roteiros e cadernosDosGuias compartilham o mesmo id
 * (o caminho da pasta), então a página do guia encontra a aula, o roteiro
 * e o caderno automaticamente.
 */
import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

// id = caminho da pasta, sem o nome do arquivo
const idDaPasta = ({ entry }: { entry: string }) =>
  entry.replace(/\/(guia|aula|roteiro|caderno|build)\.mdx?$/, '');

const BASE_GUIAS = './src/content/guias';

/* ------------------------------------------------------------------ */
/* GUIAS                                                               */
/* ------------------------------------------------------------------ */
const guias = defineCollection({
  loader: glob({ pattern: '**/guia.mdx', base: BASE_GUIAS, generateId: idDaPasta }),
  schema: z.object({
    titulo: z.string(),
    /** 1–2 frases. Aparece no cabeçalho, nos cards e no Google. */
    descricao: z.string().max(240),
    /** Caixa "Em 1 minuto": o essencial para o produtor, 2 a 5 itens. */
    emUmMinuto: z.array(z.string()).min(2).max(5),
    /** Ordem dentro da categoria (menor aparece primeiro). */
    ordem: z.number().default(99),
    tags: z.array(z.string()).default([]),
    nivel: z.enum(['introdutorio', 'intermediario', 'avancado']).default('introdutorio'),
    /**
     * Selo de evidência:
     *  forte          → meta-análises / vários estudos consistentes
     *  moderada       → alguns estudos, ou resultados variáveis
     *  limitada       → poucos estudos, extrapolação, opinião de especialistas
     *  posicionamento → texto ético/filosófico (seção Fundamentos)
     */
    evidencia: z.enum(['forte', 'moderada', 'limitada', 'posicionamento']),

    /**
     * Vídeo — independente dos slides.
     * Pode ser uma explicação falada, gravação no campo, demonstração ou entrevista.
     * O roteiro fica em roteiro.md, na mesma pasta.
     */
    video: z
      .object({
        status: z.enum(['planejado', 'roteiro', 'gravado', 'publicado']),
        formato: z.enum(['explicativo', 'campo', 'demonstracao', 'entrevista']),
        /** URL de incorporação do PeerTube (…/videos/embed/<id>) */
        url: z.url().optional(),
        duracao: z.string().optional(), // "6:30"
        legendas: z.boolean().default(false),
      })
      .optional(),

    /** Calculadora associada (id em src/data/ferramentas.yaml) */
    calculadora: reference('ferramentas').optional(),
    /** Open Machines relacionadas */
    builds: z.array(reference('builds')).default([]),
    /** Outros guias relacionados (id = caminho da pasta) */
    relacionados: z.array(reference('guias')).default([]),

    publicado: z.coerce.date(),
    revisado: z.coerce.date().optional(),
    /** Rascunhos aparecem no `npm run dev`, mas não no site publicado. */
    rascunho: z.boolean().default(false),
  }),
});

/* ------------------------------------------------------------------ */
/* AULAS (slides Reveal.js)                                            */
/* ------------------------------------------------------------------ */
/*
 * Você escreve só o miolo da aula em Markdown (slides separados por ---).
 * Estes slides são gerados automaticamente a partir dos dados:
 *   1. Título + descrição          ← do guia
 *   3. O que você vai aprender     ← `destaques`
 *   6. Pontos-chave                ← `pontosChave` ou, se vazio, `emUmMinuto` do guia
 *   7. Teste seu conhecimento      ← `quiz` (aparece também na página do guia)
 *   8. Agradecimentos + o portal   ← fixo
 */
const aulas = defineCollection({
  loader: glob({ pattern: '**/aula.md', base: BASE_GUIAS, generateId: idDaPasta }),
  schema: z.object({
    destaques: z.array(z.string()).min(2).max(6),
    pontosChave: z.array(z.string()).optional(),
    duracaoMin: z.number().optional(),
    quiz: z.object({
      multipla: z.object({
        pergunta: z.string(),
        opcoes: z.array(z.string()).min(2).max(5),
        /** índice da opção correta, começando em 0 */
        correta: z.number().int().min(0),
        explicacao: z.string().optional(),
      }),
      praticas: z.array(z.string()).length(2),
    }),
  }),
});

/* ------------------------------------------------------------------ */
/* ROTEIROS DE VÍDEO (não publicados — servem ao painel de produção)   */
/* ------------------------------------------------------------------ */
const roteiros = defineCollection({
  loader: glob({ pattern: '**/roteiro.md', base: BASE_GUIAS, generateId: idDaPasta }),
  schema: z.object({
    formato: z.enum(['explicativo', 'campo', 'demonstracao', 'entrevista']),
    duracaoAlvo: z.string(), // "6–8 min"
    status: z.enum(['ideia', 'rascunho', 'pronto']),
    /** Imagens de apoio a captar (campo, animação, quadro, etc.) */
    imagensNecessarias: z.array(z.string()).default([]),
  }),
});

/* ------------------------------------------------------------------ */
/* CADERNO DE CAMPO DO GUIA (caderno.md na pasta do guia)              */
/* ------------------------------------------------------------------ */
/*
 * Texto em primeira pessoa, em tom narrativo. O layout o mostra sempre como
 * o último bloco da página, depois das Referências. Não precisa de frontmatter.
 */
const cadernosDosGuias = defineCollection({
  loader: glob({ pattern: '**/caderno.md', base: BASE_GUIAS, generateId: idDaPasta }),
  schema: z.object({}),
});

/* ------------------------------------------------------------------ */
/* CADERNO DE CAMPO (entradas avulsas)                                 */
/* ------------------------------------------------------------------ */
const caderno = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/caderno' }),
  schema: z.object({
    titulo: z.string(),
    data: z.coerce.date(),
    resumo: z.string().max(240),
    tags: z.array(z.string()).default([]),
    guias: z.array(reference('guias')).default([]),
    rascunho: z.boolean().default(false),
  }),
});

/* ------------------------------------------------------------------ */
/* OPEN MACHINES (builds documentados)                                 */
/* ------------------------------------------------------------------ */
const builds = defineCollection({
  loader: glob({ pattern: '*/build.mdx', base: './src/content/builds', generateId: idDaPasta }),
  schema: z.object({
    titulo: z.string(),
    descricao: z.string().max(240),
    dificuldade: z.enum(['facil', 'media', 'dificil']),
    tempoMontagem: z.string(), // "3 h"
    custoEstimado: z.string(), // "R$ 150–250"
    materiais: z.array(z.object({ item: z.string(), qtd: z.string() })),
    ferramentas: z.array(z.string()).default([]),
    video: z.object({ url: z.url(), duracao: z.string().optional() }).optional(),
    rascunho: z.boolean().default(false),
  }),
});

/* ------------------------------------------------------------------ */
/* FERRAMENTAS INTERATIVAS (calculadoras)                              */
/* ------------------------------------------------------------------ */
const ferramentas = defineCollection({
  loader: file('src/data/ferramentas.yaml'),
  schema: z.object({
    nome: z.string(),
    descricao: z.string(),
    /** shinylive = app R rodando no navegador; js = componente próprio; externo = link */
    tipo: z.enum(['shinylive', 'js', 'externo']),
    /** caminho em /public (shinylive) ou URL (externo) */
    src: z.string().optional(),
    status: z.enum(['planejada', 'em-desenvolvimento', 'pronta']),
  }),
});

export const collections = { guias, aulas, roteiros, cadernosDosGuias, caderno, builds, ferramentas };
