import axios from 'axios'
import { shallowRef } from 'vue'
export function useImageUpload(editor, props, emit) {
  const uploadedImages = shallowRef(new Set())

  const pendingUploads = shallowRef(new Map())

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

  function addImage() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.multiple = true

    input.onchange = async () => {
      const files = Array.from(input.files)

      for (const file of files) {
        if (props.uploadOnInsert) {
          if (!props.uploadUrl) {
            console.warn('uploadOnInsert is true but uploadUrl is not provided')
          } else {
            const placeholder = URL.createObjectURL(file)
            // insert a temporary image (optional)
            editor.value
              .chain()
              .focus()
              .insertContentAt(editor.value.state.selection.anchor, {
                type: 'image',
                attrs: { src: placeholder, 'data-uploading': 'true' },
              })
              .run()

            // start upload and track it
            const uploadPromise = uploadFile(file)
              .then((url) => {
                // replace placeholder with real url
                editor.value
                  .chain()
                  .focus()
                  .updateAttributes('image', { src: url, 'data-uploading': null })
                  .run()
                // mark as uploaded
                uploadedImages.value.add(url)
                pendingUploads.value.delete(placeholder)
              })
              .catch((err) => {
                console.error('upload failed', err)
                pendingUploads.value.delete(placeholder)
                // you can also show user a toast here
              })

            pendingUploads.value.set(placeholder, uploadPromise)
            // don't await here so multiple uploads can run concurrently
            continue
          }
        }
        const pos = editor.value.state.selection.anchor

        // Insert placeholder
        editor.value.chain().focus().insertContentAt(pos, 'Loading...').run()

        // Instead of base64, create an object URL (MUCH faster)
        const url = URL.createObjectURL(file)

        // Insert image instantly
        editor.value
          .chain()
          .focus()
          .insertContentAt(editor.value.state.selection.anchor, {
            type: 'image',
            attrs: { src: url },
          })
          .run()

        // Remove loading text
        editor.value
          .chain()
          .focus()
          .deleteRange({ from: pos, to: pos + 10 })
          .run()
      }
    }

    input.click()
  }

  return { uploadFile, addImage, uploadedImages, pendingUploads }
}
