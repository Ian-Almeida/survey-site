import { defineStore } from 'pinia';
import {ICategory, ICategoryCreate, ICategoryUpdate} from 'src/interfaces/ICategory';
import api from 'src/api';
import {useNotificationStore} from 'src/pinia/notification';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {AxiosError} from 'axios';

const notificationStore = useNotificationStore();

export const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      categories: <ICategory[]>[],
    };
  },
  actions: {
    async createCategory(payload: ICategoryCreate) {
      try {
        const response = await api.createCategory(payload);
        if (response) {
          notificationStore.showNotification('positive', 'Categoria criada com sucesso!');
          return response.data;
        }
      } catch (e: Error | AxiosError | any ) {
        notificationStore.checkApiError(e);
      }
    },
    async removeCategory(_id: string) {
      try {
        const response = await api.removeCategory(_id);
        if (response) {
          notificationStore.showNotification('positive', 'Categoria removida com sucesso!');
          return;
        }
      } catch (e: Error | AxiosError | any ) {
        notificationStore.checkApiError(e);
      }
    },
    async updateCategory(payload: {_id: string, categoryIn: ICategoryUpdate}) {
      try {
        const response = await api.updateCategory(payload);
        if (response) {
          notificationStore.showNotification('positive', 'Categoria atualizada com sucesso!');
          return response.data;
        }
      } catch (e: Error | AxiosError | any ) {
        notificationStore.checkApiError(e);
      }
    },
    async getAllCategories() {
      try {
        const response = await api.getAllCategories();
        if (response) {
          this.setCategories(response.data);
        }
      } catch (e: Error | AxiosError | any ) {
        notificationStore.checkApiError(e);
      }
    },
    setCategories(payload: ICategory[]) {
      this.categories = payload;
    }
  },
  getters: {
  },
});
