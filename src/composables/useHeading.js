import Heading from '@tiptap/extension-heading'

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

export function useHeading() {
  return Heading.extend({
    renderHTML({ node, HTMLAttributes }) {
      const text = node.textContent
      const id = slugify(text)

      return [
        `h${node.attrs.level}`,
        {
          ...HTMLAttributes,
          id,
        },
        0,
      ]
    },
  })
}