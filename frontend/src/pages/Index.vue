<template>
  <router-view/>
</template>

<script lang="ts">

import {NavigationGuardNext, RouteLocationNormalized} from 'vue-router';
import {useAuthStore} from 'src/pinia/auth';
import {getAuthorization, removeAuthorization} from 'src/utils';

const authStore = useAuthStore();

const startRouteGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const authorization = getAuthorization();
  if (authorization) {

    const expiration = new Date(authorization.expiration);
    const now = new Date();
    now.setHours(now.getHours() + 3);

    if (expiration.getTime() < now.getTime()) {
      removeAuthorization();
      authStore.setIsLoggedIn(false);

      if (to.path === '/' || to.path.startsWith('/home')) {
        next({name: 'index-login'});
      } else {
        next()
      }
      return
    }
  }

  if (authStore.isLoggedIn) {
    if (to.path === '/login' || to.path === '/') {
      next({name: 'index-home-admin'});
    } else {
      next();
    }
  } else if (!authStore.isLoggedIn) {
    removeAuthorization();
    if (to.path === '/' || to.path.startsWith('/home')) {
      next({name: 'index-login'});
    } else {
      next()
    }
  }

};

export default {
  name: 'Index',
  beforeRouteEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    startRouteGuard(to, from, next);
  },
  beforeRouteUpdate(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    startRouteGuard(to, from, next);
  }
}
</script>
