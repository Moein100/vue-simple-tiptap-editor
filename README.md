# **vue-simple-tiptap-editor**

A lightweight Vue 3 wrapper around **Tiptap**, designed for simplicity and flexibility. 
---

## **Features**

- ⚡ **Lightweight** — Zero bundled Tailwind, Vue, or Tiptap.   
- 🧱 **Install as a Vue plugin** or use components directly.  
- 🖋 **Clean UI** built with Tailwind utility classes.  
- 📦 **Tree-shakable** and optimized for Vite.

By the way I create this package to solve my own problem cause in my projects I keep facing the scenario that i needed and editor that contains `Image` handling, `Iframe` handling (mostly from youtube), `Link` handling, `Alignment` stuff Handling, `Code Block` handling, and some other commen things but configure it every time was frustrating. so I start building this package.

It has really simple UI (ofcourse It's responsive)
i used tailwind css to style this editor but in this current version you cant customize the UI so maybe you can use it in your admin panel or even provide this editor for your user (promise the UI is not that bad) but if you liked this already i can add the feature (Custome UI) to that. just let me know.

### Looks broken or weird?

Oh by the way it should look like this if you cant see it this way then may be your global css overrides the editor:

![vue-simple-tiptap-editor demo](https://github.com/Moein100/blog-editor-docs/blob/main/raw/Screenshot%201404-08-27%20at%2012.59.57.png)

Quik fix:

```vue
<div class="isolated-editor">
  <Editor />
</div>

<style scoped>
.isolated-editor :deep(*) {
  all: revert;
}
</style>
```

or consider to change your global css 😕😂.

But One line of `all: revert` fixes everything.


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

- time! (our most valuable thing)

---

## **License**

MIT — feel free to use it in commercial and personal projects.

---

### Customization

Want custom toolbar buttons, dark mode, or different styling?
Open an issue or email me — I’ll add it if you want it.

<moeinkiani.80@gmail.com>

