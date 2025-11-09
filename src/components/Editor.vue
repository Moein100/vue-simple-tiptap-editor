<template>

    <div v-if="editor" class="w-3/4 mx-auto rounded-2xl mt-4">
        <div class="sticky top-0 w-full rounded-t-2xl mx-auto z-10 bg-gray-100">
            <div class="flex flex-wrap gap-2 p-2">
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().toggleBold().run()"
                    :disabled="!editor.can().chain().focus().toggleBold().run()"
                    :class="{ 'is-active': editor.isActive('bold') }">
                    Bold
                </button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().toggleItalic().run()"
                    :disabled="!editor.can().chain().focus().toggleItalic().run()"
                    :class="{ 'is-active': editor.isActive('italic') }">
                    Italic
                </button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().toggleStrike().run()"
                    :disabled="!editor.can().chain().focus().toggleStrike().run()"
                    :class="{ 'is-active': editor.isActive('strike') }">
                    Strike
                </button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().toggleCode().run()"
                    :disabled="!editor.can().chain().focus().toggleCode().run()"
                    :class="{ 'is-active': editor.isActive('code') }">
                    Code
                </button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().unsetAllMarks().run()">Clear marks</button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().clearNodes().run()">Clear nodes</button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().setParagraph().run()"
                    :class="{ 'is-active': editor.isActive('paragraph') }">
                    Paragraph
                </button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                    H1
                </button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                    H2
                </button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                    H3
                </button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
                    H4
                </button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
                    H5
                </button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
                    H6
                </button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().toggleBulletList().run()"
                    :class="{ 'is-active': editor.isActive('bulletList') }">
                    Bullet list
                </button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().toggleOrderedList().run()"
                    :class="{ 'is-active': editor.isActive('orderedList') }">
                    Ordered list
                </button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().toggleCodeBlock().run()"
                    :class="{ 'is-active': editor.isActive('codeBlock') }">
                    Code block
                </button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().toggleBlockquote().run()"
                    :class="{ 'is-active': editor.isActive('blockquote') }">
                    Blockquote
                </button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().setHorizontalRule().run()">Horizontal rule</button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().setHardBreak().run()">Hard break</button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
                    Undo
                </button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
                    Redo
                </button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().setColor('#958DF1').run()"
                    :class="{ 'is-active': editor.isActive('textStyle', { color: '#958DF1' }) }">
                    Purple
                </button>


                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().setTextAlign('left').run()"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
                    Left
                </button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().setTextAlign('center').run()"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
                    Center
                </button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().setTextAlign('right').run()"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
                    Right
                </button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().setTextAlign('justify').run()"
                    :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
                    Justify
                </button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().unsetTextAlign().run()">Unset text align</button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm" @click="setLink"
                    :class="{ 'is-active': editor.isActive('link') }">Set link</button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="editor.chain().focus().unsetLink().run()" :disabled="!editor.isActive('link')">
                    Unset link
                </button>
                <button class="px-2 py-1 border border-gray-800 dark:border-neutral-600 rounded-sm"
                    @click="addImage">Set image</button>
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
                files.forEach(file => {
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
                files.forEach(file => {
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
        files.forEach(file => {
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
/* Basic editor styles */
.tiptap {
    :first-child {
        margin-top: 0;
    }

    /* List styles */
    ul,
    ol {
        padding: 0 1rem;
        margin: 1.25rem 1rem 1.25rem 0.4rem;

        li p {
            margin-top: 0.25em;
            margin-bottom: 0.25em;
        }
    }

    /* Heading styles */
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
