import { all, createLowlight } from 'lowlight'
import { ListItem } from '@tiptap/extension-list'
import { Color, TextStyle } from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import FileHandler from '@tiptap/extension-file-handler'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import Iframe from '../extensions/iframe.js'
import { useEditor } from '@tiptap/vue-3'

export function useTiptap(props, emit) {
  const lowlight = createLowlight(all)
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          'tiptap prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none p-4 m-0 focus:outline-none',
      },
      uploadOnInsert: { type: Boolean, default: false },
      uploadUrl: { type: String, default: null },
      deleteUrl: { type: String, default: null },
      headers: { type: Object, default: () => ({}) },
      extractImages: { type: Function, default: null },
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
      Iframe,
    ],
    content: props.modelValue,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML()
      if (newContent !== props.modelValue) emit('update:modelValue', newContent)
    },
  })
  return editor
}
