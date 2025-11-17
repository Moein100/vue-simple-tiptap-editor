# **vue-simple-tiptap-editor**

A lightweight, customizable Vue 3 wrapper around **Tiptap**, designed for simplicity and flexibility. 
---

## **Features**

- ⚡ **Lightweight** — Zero bundled Tailwind, Vue, or Tiptap.   
- 🧱 **Install as a Vue plugin** or use components directly.  
- 🖋 **Clean UI** built with Tailwind utility classes.  
- 📦 **Tree-shakable** and optimized for Vite.

---

## **Installation**

```bash
npm install vue-simple-tiptap-editor
```

This package expects **Vue 3**, **Tiptap**, and **Tailwind CSS** to already exist in your project.

---

## **Usage**

### **1. Import the plugin**

```diff
// main.js
import { createApp } from 'vue'
import App from './App.vue'

+ import Editor from 'vue-simple-tiptap-editor'
+ import 'vue-simple-tiptap-editor/dist/style.css'

const app = createApp(App)
+ app.use(Editor)
app.mount('#app')
```

### **2. Use the Editor component**

```diff
<template>
+  <Editor />
</template>
```

---

## **Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | `String` | `''` | you can access the content via this one |
| `uploadOnInsert` | `Boolean` | `false` | Means you can upload your images to the server when inserting the image into editor also you have to provide the server URL |
| `uploadUrl` | `String` | `null` | The server URL that you want your photos to get uploaded on |
| `headers` | `Object` | `{}` | The headers that you wanna send to server along side the files |

---

## **Why This Package?**

Because most Tiptap UI packages:

- no need for configuration boring stuff

This one avoids all that.

You get:

- time! (out most valuable thing)

---

## **License**

MIT — feel free to use it in commercial and personal projects.

---

If you want anything just tell me:
moeinkiani.80@gmail.com