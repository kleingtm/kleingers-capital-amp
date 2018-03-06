import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@client/components/HelloWorld.vue';
import Login from '@client/components/Login.vue';
import Profile from '@client/components/Profile.vue';
import _404 from '@client/components/404.vue';

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
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
        path: '*',
        name: '404',
        component: _404
    }
  ]
});
