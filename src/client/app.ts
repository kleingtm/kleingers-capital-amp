import * as Vue from 'vue';
import * as App from './App.vue';
import * as Router from './router/index.router.ts';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    Router,
    template: '<App/>',
    components: { App }
});