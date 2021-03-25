import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import KeycloakService from '@/lib/keyCloak';
import store from '@/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/profile',
      name: 'profile',
      component: () =>
        import(/* webpackChunkName: "ListLoanBook" */ './views/ProfilePage.vue'),
    },
    {
      path: '/requests',
      name: 'requests',
      component: () =>
        import(/* webpackChunkName: "Request" */ './views/RequestsComponent.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/', '/search'];
  const authRequired = !publicPages.includes(to.path);
  // check login status
  const isLoggedin = store.state.KeyCloakModule.authenticated;

  if (authRequired && !isLoggedin) {
    KeycloakService.init(next, to.path);
  } else {
    store.dispatch('KeyCloakModule/checkAndSetAuth', { next, path: to.path });
    next();
  }
});

export default router;
