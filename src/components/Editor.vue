<template>
  <div v-if="editor" class="w-3/4 mx-auto rounded-2xl mt-4">
    <div class="sticky top-0 w-full rounded-t-2xl mx-auto z-10 bg-gray-100">
      <div class="flex flex-wrap gap-2 p-2">
        <!-- loop for buttons -->
        <button
          v-for="button in buttons"
          :key="button.label"
          class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
          @click="button.action"
          :disabled="button.disabled ? button.disabled() : false"
          :class="{ 'is-active': button.active ? button.active() : false }"
        >
          {{ button.label }}
        </button>
        <!-- end of loop for buttons -->
      </div>
    </div>
    <editor-content class="w-full" :editor="editor" />
  </div>
</template>

<script setup>
import { all, createLowlight } from 'lowlight'
import { ListItem } from '@tiptap/extension-list'
import { Color, TextStyle } from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import FileHandler from '@tiptap/extension-file-handler'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import { useEditor, EditorContent } from '@tiptap/vue-3'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

// create a lowlight instance
const lowlight = createLowlight(all)

const buttons = [
  {
    label: 'Clear',
    action: () => {
      editor.value.chain().focus().unsetAllMarks().run()
      editor.value.chain().focus().clearNodes().run()
    },
  },
  {
    label: 'Bold',
    action: () => editor.value.chain().focus().toggleBold().run(),
    active: () => editor.value.isActive('bold'),
  },
  {
    label: 'Italic',
    action: () => editor.value.chain().focus().toggleItalic().run(),
    active: () => editor.value.isActive('italic'),
  },
  {
    label: 'Strike',
    action: () => editor.value.chain().focus().toggleItalic().run(),
    active: () => editor.value.isActive('strike'),
  },
  {
    label: 'Code',
    action: () => editor.value.chain().focus().toggleCode().run(),
    active: () => editor.value.isActive('code'),
  },
  {
    label: 'Paragraph',
    action: () => editor.value.chain().focus().setParagraph().run(),
    active: () => editor.value.isActive('paragraph'),
  },
  {
    label: 'H1',
    action: () => editor.value.chain().focus().toggleHeading({ level: 1 }).run(),
    active: () => editor.value.isActive('heading', { level: 1 }),
  },
  {
    label: 'H2',
    action: () => editor.value.chain().focus().toggleHeading({ level: 2 }).run(),
    active: () => editor.value.isActive('heading', { level: 2 }),
  },
  {
    label: 'H3',
    action: () => editor.value.chain().focus().toggleHeading({ level: 3 }).run(),
    active: () => editor.value.isActive('heading', { level: 3 }),
  },
  {
    label: 'H4',
    action: () => editor.value.chain().focus().toggleHeading({ level: 4 }).run(),
    active: () => editor.value.isActive('heading', { level: 4 }),
  },
  {
    label: 'H5',
    action: () => editor.value.chain().focus().toggleHeading({ level: 5 }).run(),
    active: () => editor.value.isActive('heading', { level: 5 }),
  },
  {
    label: 'H6',
    action: () => editor.value.chain().focus().toggleHeading({ level: 6 }).run(),
    active: () => editor.value.isActive('heading', { level: 6 }),
  },
  {
    label: 'Ordered List',
    action: () => editor.value.chain().focus().toggleOrderedList().run(),
    active: () => editor.value.isActive('orderedList'),
  },
  {
    label: 'Bullet List',
    action: () => editor.value.chain().focus().toggleBulletList().run(),
    active: () => editor.value.isActive('bulletList'),
  },
  {
    label: 'Code Block',
    action: () => editor.value.chain().focus().toggleCodeBlock().run(),
    active: () => editor.value.isActive('codeBlock'),
  },
  {
    label: 'Blockquote',
    action: () => editor.value.chain().focus().toggleBlockquote().run(),
    active: () => editor.value.isActive('blockquote'),
  },
  {
    label: 'Undo',
    action: () => editor.value.chain().focus().undo().run(),
    disabled: () => !editor.value.can().chain().focus().undo().run(),
  },
  {
    label: 'Redo',
    action: () => editor.value.chain().focus().redo().run(),
    disabled: () => !editor.value.can().chain().focus().redo().run(),
  },
  { label: 'Image', action: addImage },
  { label: 'Link', action: setLink, active: () => editor.value.isActive('link') },
  {
    label: 'Unset Link',
    action: () => editor.value.chain().focus().unsetLink().run(),
    disabled: () => !editor.value.isActive('link'),
  },
  {
    label: 'Left Align',
    action: () => editor.value.chain().focus().setTextAlign('left').run(),
    active: () => editor.value.isActive({ textAlign: 'left' }),
  },
  {
    label: 'Center Align',
    action: () => editor.value.chain().focus().setTextAlign('center').run(),
    active: () => editor.value.isActive({ textAlign: 'center' }),
  },
  {
    label: 'Right Align',
    action: () => editor.value.chain().focus().setTextAlign('right').run(),
    active: () => editor.value.isActive({ textAlign: 'right' }),
  },
  {
    label: 'Justify Align',
    action: () => editor.value.chain().focus().setTextAlign('justify').run(),
    active: () => editor.value.isActive({ textAlign: 'justify' }),
  },
  { label: 'Unset Align', action: () => editor.value.chain().focus().unsetTextAlign().run() },
]

const editor = useEditor({
  editorProps: {
    attributes: {
      class: 'tiptap prose max-w-none p-4 lg:prose-lg xl:prose-xl m-0 focus:outline-none',
    },
  },
  extensions: [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      codeBlock: false,
    }),
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    CodeBlockLowlight.configure({
      lowlight,
    }),
    Image,
    FileHandler.configure({
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
      onDrop: (currentEditor, files, pos) => {
        files.forEach((file) => {
          const fileReader = new FileReader()

          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            currentEditor
              .chain()
              .insertContentAt(pos, {
                type: 'image',
                attrs: {
                  src: fileReader.result,
                },
              })
              .focus()
              .run()
          }
        })
      },
      onPaste: (currentEditor, files) => {
        files.forEach((file) => {
          const fileReader = new FileReader()

          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            currentEditor
              .chain()
              .insertContentAt(currentEditor.state.selection.anchor, {
                type: 'image',
                attrs: {
                  src: fileReader.result,
                },
              })
              .focus()
              .run()
          }
        })
      },
    }),
  ],
  content: props.modelValue,
  onUpdate: ({ editor }) => {
    const newContent = editor.getHTML()
    if (newContent !== props.modelValue) emit('update:modelValue', newContent)
  },
})

function setLink() {
  const previousUrl = editor.value.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)

  // cancelled
  if (url === null) {
    return
  }

  // empty
  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run()

    return
  }

  // update link
  editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

function addImage() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.multiple = true

  input.onchange = () => {
    const files = Array.from(input.files)
    files.forEach((file) => {
      const fileReader = new FileReader()

      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        editor.value
          .chain()
          .insertContentAt(editor.value.state.selection.anchor, {
            type: 'image',
            attrs: {
              src: fileReader.result,
            },
          })
          .focus()
          .run()
      }
    })
  }

  input.click()
}
</script>

<style lang="scss">
.tiptap {
  :first-child {
    margin-top: 0;
  }

  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  blockquote {
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }

  img {
    display: block;
    height: auto;
    margin: 1.5rem 0;
    max-width: 100%;

    &.ProseMirror-selectednode {
      outline: 3px solid var(--purple);
      margin: auto;
    }
  }
}
</style>
