import { createApp } from "vue";
import App from "./App.vue";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import "./assets/css/reset.css";
import "./assets/css/main.css";
import router from "@/router/index.js";
import store from "@/store/index.js";

createApp(App).use(ElementPlus).use(router).use(store).mount("#app");
