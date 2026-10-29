import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { taxonomia, type No } from '../data/taxonomia';

export type Guia = CollectionEntry<'guias'>;

/** Rascunhos aparecem só em desenvolvimento. */
const visivel = (e: { data: { rascunho?: boolean } }) => import.meta.env.DEV || !e.data.rascunho;

export async function guiasPublicos() {
  const todos = await getCollection('guias', visivel);
  return todos.sort((a, b) => a.data.ordem - b.data.ordem || a.data.titulo.localeCompare(b.data.titulo, 'pt-BR'));
}

/* ---------- Taxonomia ---------- */

export interface NoComCaminho extends No {
  caminho: string; // "producao/bovinocultura-leite/bezerras"
  ancestrais: { nome: string; caminho: string }[];
}

/** Lista plana de todos os nós da taxonomia, com caminho completo. */
export function nosDaTaxonomia(): NoComCaminho[] {
  const saida: NoComCaminho[] = [];
  const percorrer = (nos: No[], pai: NoComCaminho | null) => {
    for (const no of nos) {
      const caminho = pai ? `${pai.caminho}/${no.slug}` : no.slug;
      const ancestrais = pai ? [...pai.ancestrais, { nome: pai.nome, caminho: pai.caminho }] : [];
      const item = { ...no, caminho, ancestrais };
      saida.push(item);
      if (no.filhos) percorrer(no.filhos, item);
    }
  };
  percorrer(taxonomia, null);
  return saida;
}

/** Nó da taxonomia que contém o guia (a pasta-mãe do guia). */
export function secaoDoGuia(id: string) {
  const pasta = id.split('/').slice(0, -1).join('/');
  return nosDaTaxonomia().find((n) => n.caminho === pasta);
}

/* ---------- Completude ---------- */

export interface Completude {
  texto: boolean;
  aula: boolean;
  video: boolean;
  calculadora: boolean;
  /** 1 = texto + referências · 2 = + aula ou calculadora · 3 = + vídeo publicado */
  nivel: 1 | 2 | 3;
}

export async function completudeDoGuia(guia: Guia): Promise<Completude> {
  const aula = Boolean(await getEntry('aulas', guia.id));
  const video = guia.data.video?.status === 'publicado';
  let calculadora = false;
  if (guia.data.calculadora) {
    const f = await getEntry(guia.data.calculadora);
    calculadora = f?.data.status === 'pronta';
  }
  const nivel = video ? 3 : aula || calculadora ? 2 : 1;
  return { texto: true, aula, video, calculadora, nivel };
}

export const rotulos = {
  evidencia: {
    forte: 'Evidência forte',
    moderada: 'Evidência moderada',
    limitada: 'Evidência limitada',
    posicionamento: 'Texto de posicionamento',
  },
  nivel: {
    introdutorio: 'Introdutório',
    intermediario: 'Intermediário',
    avancado: 'Avançado',
  },
} as const;

export const urlDoGuia = (id: string) => `/${id}/`;
export const urlDaAula = (id: string) => `/aulas/${id}/`;
export const slugTag = (t: string) =>
  t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, '-');
