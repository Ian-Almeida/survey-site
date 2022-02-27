import { defineStore } from 'pinia';
import api from 'src/api';
import {IUser, IUserCreate} from 'src/interfaces/IUser';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios';
import {useNotificationStore} from 'src/pinia/notification';

const notificationStore = useNotificationStore();

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userProfile: <IUser | null>null,
    };
  },
  actions: {
    async createUser(payload: IUserCreate) {
      try {
        const response = await api.createUser(payload);
        if (response) {
          notificationStore.showNotification('positive', 'Usuário criado com sucesso!');
          return response.data;
        }
      } catch (e: Error | AxiosError | any ) {
        notificationStore.checkApiError(e);
      }
    },
    async getMe() {
      try {
        const response = await api.getMe();
        if (response) {
          this.userProfile = response.data;
        }
      } catch (e: Error | AxiosError | any ) {
        notificationStore.checkApiError(e);
      }
    }
  },
  getters: {
  },
});
