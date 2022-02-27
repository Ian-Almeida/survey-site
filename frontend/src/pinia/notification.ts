import { defineStore } from 'pinia';
import axios, {AxiosError} from 'axios';

interface INotificationQueue {
  message: string,
  type: NotificationType,
}

type NotificationType = 'positive' | 'negative' | 'warning' | 'info' | 'ongoing';

export const useNotificationStore = defineStore('notifications', {
  state: () => {
    return {
      notificationsQueue: <INotificationQueue[]>[],
    };
  },
  actions: {
    checkApiError(e: Error | AxiosError) {
      if (axios.isAxiosError(e)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.notificationsQueue.push({message: e.response?.data.detail, type: 'negative'});
      }
    },
    showNotification(type: NotificationType, message: string ) {
      this.notificationsQueue.push({message: message, type: type});
    }
  },
  getters: {
  },
});
