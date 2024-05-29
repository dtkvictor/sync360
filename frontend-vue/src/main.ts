import './style.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/routes/router';
import utilMask from './directives/utilMask';

createApp(App)
    .use(router)
    .directive('utilMask', utilMask)
    .mount('#app')
