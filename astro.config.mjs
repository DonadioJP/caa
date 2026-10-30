// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import rehypeCitation from 'rehype-citation';
import { fileURLToPath } from 'node:url';
import rehypeExtrairReferencias from './src/lib/rehype-extrair-referencias.mjs';

const raiz = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  // Endereço e prefixo vêm do ambiente na publicação (.github/workflows/publicar.yml).
  // Localmente o site fica na raiz. TODO: trocar pelo domínio definitivo.
  site: process.env.CAA_SITE ?? 'https://criacaoanimalagroecologica.example',
  base: process.env.CAA_BASE ?? '/',
  trailingSlash: 'always',
  integrations: [mdx()],
  markdown: {
    processor: unified({
      rehypePlugins: [
        // Citações no estilo Pandoc/Quarto: [@godden2008] ou @godden2008
        [
          rehypeCitation,
          {
            path: raiz,
            bibliography: 'bibliografia/biblioteca.bib',
            csl: 'bibliografia/apa.csl',
            lang: 'bibliografia/locales-pt-BR.xml',
            linkCitations: true,
          },
        ],
        // Move a lista de referências para o fim da página do guia
        rehypeExtrairReferencias,
      ],
    }),
  },
});
