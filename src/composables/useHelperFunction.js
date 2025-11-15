export function useHelperFunction(editor) {
  function setLink() {
    const { empty } = editor.value.state.selection
    const previousUrl = editor.value.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)
    if (!empty) {
      if (url === null) {
        return
      }
      if (url === '') {
        editor.value.chain().focus().extendMarkRange('link').unsetLink().run()

        return
      }
      editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
      return
    } else {
      editor.value.chain().focus().insertContent(url).run()
      const from = editor.value.state.selection.from - url.length
      const to = editor.value.state.selection.from

      editor.value
        .chain()
        .setTextSelection({ from, to })
        .setLink({ href: url })
        .setTextSelection(to)
        .run()
    }
  }

  function test() {
    console.log('test')
  }
  return { setLink, test }
}
