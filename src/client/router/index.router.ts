import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@client/pages/HelloWorld.vue';
import Login from '@client/pages/Login.vue';
import UiElements from '@client/pages/UiElements.vue';
import _404 from '@client/pages/404.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/ui-elements',
      name: 'UiElements',
      component: UiElements
    },
    {
        path: '*',
        name: '404',
        component: _404
    }
  ]
});
