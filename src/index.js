import Editor from "./components/Editor.vue";
import './assets/main.css'
export default {
    install: (app, options) => {
        app.component("Editor", Editor);
    }
}
