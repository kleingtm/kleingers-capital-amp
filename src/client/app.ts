import Vue from 'vue';
import App from './App.vue';
import router from './router/index.router';

import './components/input.scss';
import './components/button.scss';
import './components/label.scss';

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});