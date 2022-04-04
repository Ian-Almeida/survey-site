import { defineStore } from 'pinia';
import {getAuthorization, removeAuthorization, setAuthorization} from 'src/utils';
import api from 'src/api';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {AxiosError} from 'axios';
import {useNotificationStore} from 'src/pinia/notification';

const notificationStore = useNotificationStore();

function getToday() {
  const date = new Date();
  date.setHours(date.getHours() + 3);
  return date;
}
export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      isLoggedIn: getAuthorization() ? new Date(getAuthorization().expiration).getTime() > getToday().getTime() : false,
    };
  },
  actions: {
    async getAccessToken(email: string, password: string) {
      try {
        const response = await api.getAccessToken(email, password);
        if (response) {
          setAuthorization(response.data);
          this.isLoggedIn = true;
          notificationStore.showApiNotification('positive', 'Login efetuado com sucesso!');
          return response.data;
        }
      } catch (e: Error | AxiosError | any) {
        notificationStore.checkApiError(e);
      }
    },
    setIsLoggedIn(val: boolean) {
      this.isLoggedIn = val;
    },
    logout() {
      this.isLoggedIn = false;
      removeAuthorization();
      notificationStore.showApiNotification('info', 'Sua sessão foi encerrada.')
    }
  },
  getters: {
  },
});
