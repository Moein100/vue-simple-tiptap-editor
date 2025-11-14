import { computed } from 'vue'

export function useEditorButtons(editor, isReady, addImage, setLink) {
  return computed(() => [
    {
      label: 'Clear',
      action: () => {
        if (!isReady()) return
        editor.value.chain().focus().unsetAllMarks().run()
        editor.value.chain().focus().clearNodes().run()
      },
    },
    {
      label: 'Bold',
      action: () => isReady() && editor.value.chain().focus().toggleBold().run(),
      active: () => isReady() && editor.value.isActive('bold'),
    },
    {
      label: 'Italic',
      action: () => isReady() && editor.value.chain().focus().toggleItalic().run(),
      active: () => isReady() && editor.value.isActive('italic'),
    },
    {
      label: 'Strike',
      action: () => isReady() && editor.value.chain().focus().toggleStrike().run(),
      active: () => isReady() && editor.value.isActive('strike'),
    },
    {
      label: 'Code',
      action: () => isReady() && editor.value.chain().focus().toggleCode().run(),
      active: () => isReady() && editor.value.isActive('code'),
    },
    {
      label: 'Paragraph',
      action: () => isReady() && editor.value.chain().focus().setParagraph().run(),
      active: () => isReady() && editor.value.isActive('paragraph'),
    },
    {
      label: 'H1',
      action: () => isReady() && editor.value.chain().focus().toggleHeading({ level: 1 }).run(),
      active: () => isReady() && editor.value.isActive('heading', { level: 1 }),
    },
    {
      label: 'H2',
      action: () => isReady() && editor.value.chain().focus().toggleHeading({ level: 2 }).run(),
      active: () => isReady() && editor.value.isActive('heading', { level: 2 }),
    },
    {
      label: 'H3',
      action: () => isReady() && editor.value.chain().focus().toggleHeading({ level: 3 }).run(),
      active: () => isReady() && editor.value.isActive('heading', { level: 3 }),
    },
    {
      label: 'H4',
      action: () => isReady() && editor.value.chain().focus().toggleHeading({ level: 4 }).run(),
      active: () => isReady() && editor.value.isActive('heading', { level: 4 }),
    },
    {
      label: 'H5',
      action: () => isReady() && editor.value.chain().focus().toggleHeading({ level: 5 }).run(),
      active: () => isReady() && editor.value.isActive('heading', { level: 5 }),
    },
    {
      label: 'H6',
      action: () => isReady() && editor.value.chain().focus().toggleHeading({ level: 6 }).run(),
      active: () => isReady() && editor.value.isActive('heading', { level: 6 }),
    },
    {
      label: 'Ordered List',
      action: () => isReady() && editor.value.chain().focus().toggleOrderedList().run(),
      active: () => isReady() && editor.value.isActive('orderedList'),
    },
    {
      label: 'Bullet List',
      action: () => isReady() && editor.value.chain().focus().toggleBulletList().run(),
      active: () => isReady() && editor.value.isActive('bulletList'),
    },
    {
      label: 'Code Block',
      action: () => isReady() && editor.value.chain().focus().toggleCodeBlock().run(),
      active: () => isReady() && editor.value.isActive('codeBlock'),
    },
    {
      label: 'Blockquote',
      action: () => isReady() && editor.value.chain().focus().toggleBlockquote().run(),
      active: () => isReady() && editor.value.isActive('blockquote'),
    },
    {
      label: 'Undo',
      action: () => isReady() && editor.value.chain().focus().undo().run(),
      disabled: () => isReady() && !editor.value.can().chain().focus().undo().run(),
    },
    {
      label: 'Redo',
      action: () => isReady() && editor.value.chain().focus().redo().run(),
      disabled: () => isReady() && !editor.value.can().chain().focus().redo().run(),
    },
    { label: 'Image', action: () => isReady() && addImage() },
    {
      label: 'Link',
      action: () => isReady() && setLink(),
      active: () => isReady() && editor.value.isActive('link'),
    },
    {
      label: 'Unset Link',
      action: () => isReady() && editor.value.chain().focus().unsetLink().run(),
      disabled: () => isReady() && !editor.value.isActive('link'),
    },
    {
      label: 'Left Align',
      action: () => isReady() && editor.value.chain().focus().setTextAlign('left').run(),
      active: () => isReady() && editor.value.isActive({ textAlign: 'left' }),
    },
    {
      label: 'Center Align',
      action: () => isReady() && editor.value.chain().focus().setTextAlign('center').run(),
      active: () => isReady() && editor.value.isActive({ textAlign: 'center' }),
    },
    {
      label: 'Right Align',
      action: () => isReady() && editor.value.chain().focus().setTextAlign('right').run(),
      active: () => isReady() && editor.value.isActive({ textAlign: 'right' }),
    },
    {
      label: 'Justify Align',
      action: () => isReady() && editor.value.chain().focus().setTextAlign('justify').run(),
      active: () => isReady() && editor.value.isActive({ textAlign: 'justify' }),
    },
    {
      label: 'Unset Align',
      action: () => isReady() && editor.value.chain().focus().unsetTextAlign().run(),
    },
  ])
}
