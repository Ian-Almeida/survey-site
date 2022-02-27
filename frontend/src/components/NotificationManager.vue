<template>
  <div style="visibility: hidden"></div>
</template>

<script lang="ts" setup>

import {computed, watch} from 'vue';
import {useNotificationStore} from 'src/pinia/notification';
import {useQuasar} from 'quasar';

const notifictionStore = useNotificationStore();
const $q = useQuasar();

const notifications = computed(() => {
  return notifictionStore.notificationsQueue;
})

watch(notifications, (val) => {
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
</script>

<style scoped>

</style>
