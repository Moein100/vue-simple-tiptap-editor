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
import axios from 'axios'

export function useTiptap(props, emit) {
  const lowlight = createLowlight(all)

  async function uploadFile(file) {
    if (!props.uploadUrl) throw new Error('uploadUrl prop is not set')

    const formData = new FormData()
    formData.append('file', file)

    emit('upload-start', file)

    try {
      const res = await axios.post(props.uploadUrl, formData, {
        headers: {
          ...props.headers,
          'Content-Type': 'multipart/form-data',
        },
      })

      // Axios automatically converts JSON, so we use res.data
      const data = res.data

      const url = data.url || data.path || data.data?.url
      if (!url) throw new Error('Upload response did not include url')

      emit('upload-success', url, file)
      return url
    } catch (err) {
      emit('upload-error', err, file)
      throw err
    }
  }

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
            const placeholder = URL.createObjectURL(file)
            if (props.uploadOnInsert && props.uploadUrl) {
              // insert a temporary image (optional)
              currentEditor
                .chain()
                .focus()
                .insertContentAt(pos, {
                  type: 'image',
                  attrs: { src: placeholder, 'data-uploading': 'true' },
                })
                .run()

              // start upload and track it
              uploadFile(file)
                .then((url) => {
                  // replace placeholder with real url
                  currentEditor
                    .chain()
                    .focus()
                    .updateAttributes('image', { src: url, 'data-uploading': null })
                    .run()
                })
                .catch((err) => {
                  console.error('upload failed', err)
                  pendingUploads.value.delete(placeholder)
                  // you can also show user a toast here
                })
            } else {
              currentEditor
                .chain()
                .focus()
                .insertContentAt(pos, {
                  type: 'image',
                  attrs: { src: placeholder },
                })
                .run()
            }
          })
        },

        onPaste: (currentEditor, files) => {
          files.forEach((file) => {
            const placeholder = URL.createObjectURL(file)
            if (props.uploadOnInsert && props.uploadUrl) {
              // insert a temporary image (optional)
              currentEditor
                .chain()
                .focus()
                .insertContentAt(pos, {
                  type: 'image',
                  attrs: { src: placeholder, 'data-uploading': 'true' },
                })
                .run()

              // start upload and track it
              uploadFile(file)
                .then((url) => {
                  // replace placeholder with real url
                  currentEditor
                    .chain()
                    .focus()
                    .updateAttributes('image', { src: url, 'data-uploading': null })
                    .run()
                })
                .catch((err) => {
                  console.error('upload failed', err)
                  pendingUploads.value.delete(placeholder)
                  // you can also show user a toast here
                })
            } else {
              currentEditor
                .chain()
                .focus()
                .insertContentAt(pos, {
                  type: 'image',
                  attrs: { src: placeholder },
                })
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
