<template>
  <div
    v-show="editor"
    :class="`bg-white! rounded-2xl mt-4 border border-gray-300 ${props.classes}`"
  >
    <div class="sticky top-0 overflow-hidden w-full rounded-t-2xl mx-auto z-10 bg-gray-100!">
      <div
        class="flex md:flex-wrap flex-nowrap overflow-x-auto gap-2 p-2 scrollbar-hide masked-overflow"
      >
        <button
          v-for="button in buttons"
          type="button"
          :key="button.label"
          :title="button.label"
          :aria-label="button.label"
          class="px-1.5 sm:px-3 py-1 text-xs text-gray-900 sm:text-sm border border-gray-800 dark:border-neutral-600 rounded-sm whitespace-nowrap transition delay-100 duration-100 ease-in-out hover:-translate-y-1 hover:scale-102"
          @click="button.action"
          :disabled="button.disabled ? button.disabled() : false"
          :class="{ 'is-active': button.active ? button.active() : false }"
          v-html="button.label"
        ></button>
      </div>
      <div class="pointer-events-none absolute left-0 top-0 h-full w-8 fade-left"></div>
      <div class="pointer-events-none absolute right-0 top-0 h-full w-8 fade-right"></div>
    </div>
    <editor-content class="w-full" :editor="editor" />
  </div>
</template>

<script setup>
import './Editor.scss'
import { EditorContent } from '@tiptap/vue-3'
import { onBeforeUnmount } from 'vue'
import { useEditorButtons } from '../composables/useEditorButtons.js'
import { useImageUpload } from '../composables/useImageUpload.js'
import { useTiptap } from '@/composables/useTiptap.js'
import { useHelperFunction } from '@/composables/useHelperFunction.js'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  classes: { type: String, default: 'w-full sm:w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto' },
  uploadOnInsert: { type: Boolean, default: false },
  uploadUrl: { type: String, default: null },
  headers: { type: Object, default: () => ({}) },
  extractImages: { type: Function, default: null },
})

const emit = defineEmits([
  'update:modelValue',
  'upload-start',
  'upload-success',
  'upload-error',
  'image-deleted',
])

const editor = useTiptap(props, emit)
const isReady = () => !!(editor && editor.value)
const { uploadFile, addImage, uploadedImages, pendingUploads } = useImageUpload(editor, props, emit)
const { setLink, test } = useHelperFunction(editor)
const buttons = useEditorButtons(editor, isReady, addImage, setLink)

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>
