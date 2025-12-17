import { Node, mergeAttributes } from '@tiptap/core'

export default Node.create({
  name: 'iframe',

  group: 'block',
  atom: true,

  addOptions() {
    return {
      allowFullscreen: true,
      HTMLAttributes: {
        class: 'iframe-wrapper',
      },
    }
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
      frameborder: {
        default: 0,
      },
      allow: {
        default:
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
      },
      allowfullscreen: {
        default: this.options.allowFullscreen,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'iframe',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['iframe', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addCommands() {
    return {
      setIframe:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
    }
  },

  addPasteRules() {
    return [
      {
        find: /<iframe.*?src="(.*?)".*?>.*?<\/iframe>/gi,
        handler: ({ match, chain, range }) => {
          const src = match[1]
          if (!src) return
          chain().focus().deleteRange(range).setIframe({ src }).run()
        },
      },
    ]
  },
})
