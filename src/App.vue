<script setup>
import Editor from './components/Editor.vue'
import { ref } from 'vue'

const content = ref(
  '<img src="http://image-server.test/storage/uploads/tOVZUXtppzSKBqPJ1Uy0wif8ArruHfytf397TqJ7.png"><p></p>',
)
</script>

<template>
  <div class="wrapper">
    <Editor
      v-model="content"
      :upload-url="'http://image-server.test/api/editor/upload'"
      :upload-on-insert="true"
      :headers="{
        Accept: 'application/json',
      }"
    />

    <div>
      <h2>Editor Content:</h2>
      <pre class="w-full text-pretty">{{ content }}</pre>
    </div>
  </div>

  <RouterView />
</template>
