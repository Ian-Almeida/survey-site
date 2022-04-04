import { defineStore } from 'pinia';
import axios, {AxiosError} from 'axios';
import {removeAuthorization} from 'src/utils';

interface INotificationQueue {
  message: string,
  type: NotificationType,
  error?: AxiosError,
  position?: NotificationPositions,
}

type NotificationType = 'positive' | 'negative' | 'warning' | 'info' | 'ongoing';
type NotificationPositions = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right' | 'center';

export const useNotificationStore = defineStore('notifications', {
  state: () => {
    return {
      apiNotificationsQueue: <INotificationQueue[]>[],
      actionsNotificationsQueue: <INotificationQueue[]>[],
    };
  },
  actions: {
    checkApiError(e: Error | AxiosError) {
      if (axios.isAxiosError(e)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.apiNotificationsQueue.push({message: e.response?.data.detail, type: 'negative', error: e});

        if (e.response?.status === 401) {
          removeAuthorization();
        }
      }
    },
    showApiNotification(type: NotificationType, message: string ) {
      this.apiNotificationsQueue.push({message: message, type: type});
    },
    showActionNotification(type: NotificationType, message: string ) {
      this.actionsNotificationsQueue.push({message: message, type: type, position: 'top-right'});
    },

  },
  getters: {
  },
});
