/**
 * Tira a bibliografia gerada pelo rehype-citation do corpo do texto e a
 * entrega à página como dados (remarkPluginFrontmatter.referencias), para o
 * layout montar a tabela de referências no fim do guia.
 *
 * Cada item: { chave, html, link }
 *   chave → a chave do .bib (godden2008); a linha da tabela ganha id="bib-<chave>",
 *           que é para onde as citações no texto apontam
 *   html  → a referência em APA, sem o DOI/URL do fim (ele vai para a coluna Link)
 *   link  → o DOI ou a URL da referência, se houver
 */
import { visit, SKIP } from 'unist-util-visit';
import { toHtml } from 'hast-util-to-html';

const URL_NO_FIM = /\s*(https?:\/\/\S+?)\.?\s*$/;

/** Último nó de texto da entrada (onde o CSL põe o DOI ou a URL). */
function ultimoTexto(no) {
  for (let i = (no.children ?? []).length - 1; i >= 0; i--) {
    const filho = no.children[i];
    if (filho.type === 'text' && filho.value.trim()) return filho;
    if (filho.type === 'element') {
      const t = ultimoTexto(filho);
      if (t) return t;
    }
  }
}

export default function rehypeExtrairReferencias() {
  return (tree, file) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.properties?.id !== 'refs' || !parent || index === undefined) return;
      const referencias = [];
      for (const entrada of node.children) {
        if (entrada.type !== 'element') continue;
        const chave = String(entrada.properties?.id ?? '').replace(/^bib-/, '');
        let link;
        const texto = ultimoTexto(entrada);
        const achou = texto?.value.match(URL_NO_FIM);
        if (texto && achou) {
          link = achou[1];
          texto.value = texto.value.replace(URL_NO_FIM, '');
        }
        const html = toHtml(entrada.children).trim();
        referencias.push({ chave, html, link });
      }
      file.data.astro ??= {};
      file.data.astro.frontmatter ??= {};
      file.data.astro.frontmatter.referencias = referencias;
      parent.children.splice(index, 1);
      return [SKIP, index];
    });
  };
}
