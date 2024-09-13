import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import "@/plugins/Axios";
import "@/access/index";
import "bytemd/dist/index.css";

const app = createApp(App);
app.use(ArcoVue);
app.use(store);
app.use(router);
app.mount("#app");
