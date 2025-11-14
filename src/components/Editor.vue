<template>
  <div
    v-show="editor"
    class="w-full sm:w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto rounded-2xl mt-4"
  >
    <div class="sticky top-0 overflow-hidden w-full rounded-t-md mx-auto z-10 bg-gray-100">
      <div
        class="flex md:flex-wrap flex-nowrap overflow-x-auto gap-2 p-2 scrollbar-hide masked-overflow"
      >
        <button
          v-for="button in buttons"
          :key="button.label"
          :title="button.label"
          :aria-label="button.label"
          class="px-1.5 sm:px-3 py-1 text-xs sm:text-sm border border-gray-800 dark:border-neutral-600 rounded-sm whitespace-nowrap"
          @click="button.action"
          :disabled="button.disabled ? button.disabled() : false"
          :class="{ 'is-active': button.active ? button.active() : false }"
        >
          {{ button.label }}
        </button>
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
  uploadOnInsert: { type: Boolean, default: false },
  uploadUrl: { type: String, default: null },
  deleteUrl: { type: String, default: null },
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
const { setLink } = useHelperFunction(editor)
const buttons = useEditorButtons(editor, isReady, addImage, setLink)

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>
