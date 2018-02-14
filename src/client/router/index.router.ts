import * as Vue from 'vue';
import * as Router from 'vue-router';
import * as HelloWorld from '@client/components/HelloWorld';
import * as Login from '@client/components/Login';
import * as Profile from '@client/components/Profile';
import * as _404 from '@client/components/404';

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
