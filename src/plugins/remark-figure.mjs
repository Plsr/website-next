import { visit } from 'unist-util-visit';

/**
 * Remark plugin that wraps images in <figure> with <figcaption> from alt text.
 * Only wraps images that are the sole child of a paragraph (standalone images).
 */
export function remarkFigure() {
  return (tree) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      if (node.children.length === 1 && node.children[0].type === 'image') {
        const image = node.children[0];
        if (!image.alt) return;

        parent.children[index] = {
          type: 'html',
          value: `<figure><img src="${image.url}" alt="${image.alt}" /><figcaption>${image.alt}</figcaption></figure>`,
        };
      }
    });
  };
}
