import { defineStore } from 'pinia';
import axios, {AxiosError} from 'axios';
import {removeAuthorization} from 'src/utils';

interface INotificationQueue {
  message: string,
  type: NotificationType,
  error?: AxiosError,
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
        this.notificationsQueue.push({message: e.response?.data.detail, type: 'negative', error: e});

        if (e.response?.status === 401) {
          removeAuthorization();
        }
      }
    },
    showNotification(type: NotificationType, message: string ) {
      this.notificationsQueue.push({message: message, type: type});
    }
  },
  getters: {
  },
});
