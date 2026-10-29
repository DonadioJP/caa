/**
 * Tira a bibliografia gerada pelo rehype-citation do corpo do texto e a
 * entrega à página separadamente (remarkPluginFrontmatter.referenciasHtml),
 * para o layout posicioná-la no fim do guia, depois da calculadora e do teste.
 */
import { visit, SKIP } from 'unist-util-visit';
import { toHtml } from 'hast-util-to-html';

export default function rehypeExtrairReferencias() {
  return (tree, file) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.properties?.id === 'refs' && parent && index !== undefined) {
        file.data.astro ??= {};
        file.data.astro.frontmatter ??= {};
        file.data.astro.frontmatter.referenciasHtml = toHtml(node);
        parent.children.splice(index, 1);
        return [SKIP, index];
      }
    });
  };
}
