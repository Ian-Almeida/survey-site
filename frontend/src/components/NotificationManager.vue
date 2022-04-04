<template>
  <div style="visibility: hidden"></div>
</template>

<script lang="ts" setup>

import {computed, watch} from 'vue';
import {useNotificationStore} from 'src/pinia/notification';
import {useQuasar} from 'quasar';

const notifictionStore = useNotificationStore();
const $q = useQuasar();

const apiNotifications = computed(() => {
  return notifictionStore.apiNotificationsQueue;
})

const actionsNotifications = computed(() => {
  return notifictionStore.actionsNotificationsQueue;
})

watch(apiNotifications, (val) => {
  const notification = val.shift();

  if (notification) {
    $q.notify({
      type: notification.type,
      message: notification.message,
      progress: true,
      actions: [
        {label: 'Dispensar', color: 'white', handler: () => { /* ... */ }}
      ]
    })
  }
}, {deep: true})

watch(actionsNotifications, (val) => {
  const notification = val.shift();

  if (notification) {
    $q.notify({
      type: notification.type,
      message: notification.message,
      position: notification.position,
      progress: true,
      actions: [
        {label: 'Dispensar', color: 'white', handler: () => { /* ... */ }}
      ]
    })
  }
}, {deep: true})
</script>

<style scoped>

</style>
