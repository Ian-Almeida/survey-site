<template>
  <div>
    <router-view v-if="true" />
    <span v-else>LOADING WHEN LOADING STORES</span>
    <NotificationManager />
  </div>
</template>
<script lang="ts" setup>
import NotificationManager from 'components/NotificationManager.vue';
</script>
