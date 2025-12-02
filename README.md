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

### How it should looks

![vue-simple-tiptap-editor demo](https://github.com/Moein100/blog-editor-docs/blob/main/raw/Screenshot%201404-08-27%20at%2012.59.57.png)


Note: If you use this editor inside a form, the rendered content may look different when you display it elsewhere. To ensure the formatting matches what you see inside the editor, install and enable [` @tailwindcss/typography`](https://github.com/tailwindlabs/tailwindcss-typography).

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
| `classes` | `String` | `"w-full sm:w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto"` | you can define your own class (meant for sizing stuff as you can see in its default value) |

---

## Upload on Insert:
```js
    <Editor
      v-model="content"
      :upload-on-insert="true"
      :upload-url="'http://example.test/api/editor/upload'"
      :headers="{
        Accept: 'application/json',
        // authentication stuff 
      }"
      />
```
So when you upload an Image in the editor (using Drag/Drop Copy/Paste or using Image Button in Editor) the editor automatically upload the images to that endpoint that you provided (`upload-url=...`)
keep in mind that End Point must have a `file` field. so you only have to send the Image with the `file` field in `POST` request. In response it has to return a json with a single key named `url` and the value filled with the Saved Image address. so the response will be somthing like this:
```json
{
    "url": "https://example.test/path/to/Image"
}
```

### 🔧 Code Highlighting (Optional)

If you want syntax highlighting inside code blocks with zero configuration, add this stylesheet to your page’s `<head>`:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.0/styles/github-dark.min.css">
```

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








