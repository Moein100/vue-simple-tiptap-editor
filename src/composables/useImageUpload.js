import { shallowRef } from 'vue'
export function useImageUpload(editor, props, emit) {
  const uploadedImages = shallowRef(new Set())

  const pendingUploads = shallowRef(new Map())

  async function uploadFile(file) {
    if (!props.uploadUrl) throw new Error('uploadUrl prop is not set')

    const formData = new FormData()
    formData.append('file', file)

    // emit start
    emit('upload-start', file)

    try {
      const res = await fetch(props.uploadUrl, {
        method: 'POST',
        headers: props.headers,
        body: formData,
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'Upload failed')
      }

      const data = await res.json()
      // expecting the response to have a 'url' field
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

        // Default: insert as base64 (existing behavior)
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
          editor.value
            .chain()
            .focus()
            .insertContentAt(editor.value.state.selection.anchor, {
              type: 'image',
              attrs: {
                src: fileReader.result,
              },
            })
            .focus()
            .run()
        }
      }
    }

    input.click()
  }

  return { uploadFile, addImage, uploadedImages, pendingUploads }
}
