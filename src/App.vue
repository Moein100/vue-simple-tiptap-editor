<script setup>
import Editor from './components/Editor.vue'
import { ref } from 'vue'

const content = ref('')
</script>

<template>
  <div class="wrapper">
    <Editor v-model="content" />

    <div>
      <h2>Editor Content:</h2>
      <pre class="w-full text-pretty">{{ content }}</pre>
    </div>
  </div>

  <RouterView />
</template>
