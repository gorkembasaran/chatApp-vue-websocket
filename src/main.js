import { createApp } from 'vue';
import App from './App.vue';
import store from './store/store';
import router from './router/router';
import axios from 'axios';

const app = createApp(App);
app.use(store);
app.use(router);
app.provide('axios', axios);
app.mount('#app');
