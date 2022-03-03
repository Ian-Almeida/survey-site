import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: () => import('pages/Index.vue'),
    children: [
      {
        path: 'login',
        name: 'index-login',
        component: () => import('pages/authentication/Login.vue')
      },
      {
        path: 'logout',
        name: 'index-logout',
        redirect: {name: 'index-login'},
      },
      {
        path: 'password-recovery',
        name: 'index-password-recovery',
        component: () => import('pages/authentication/PasswordRecovery.vue')
      },
      {
        path: 'password-reset',
        component: () => import('pages/authentication/PasswordReset.vue')
      },
      {
        path: 'home',
        name: 'index-home',
        redirect: {name: 'index-home-admin'},
        component: () => import('pages/Home.vue'),
        children: [
          {
            path: 'admin',
            name: 'index-home-admin',
            component: () => import('pages/Admin.vue')
          },
          {
            path: 'about',
            name: 'index-home-about',
            component: () => import('pages/About.vue')
          },
          {
            path: 'category',
            name: 'index-home-category',
            component: () => import('pages/category/Categories.vue')
          },
          {
            path: 'setting',
            name: 'index-home-setting',
            component: () => import('pages/setting/Settings.vue')
          },
          {
            path: 'form',
            name: 'index-home-form',
            component: () => import('pages/form/Forms.vue')
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
