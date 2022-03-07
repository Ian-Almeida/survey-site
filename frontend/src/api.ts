import axios from 'axios';
import {IUser, IUserCreate} from 'src/interfaces/IUser';
import {IToken} from 'src/interfaces/token';
import {getAuthorization} from 'src/utils';
import {ICategoryCreate, ICategory} from 'src/interfaces/ICategory';

const baseURL = 'http://localhost:8000/api';

function authHeaders() {
  return {
    headers: {
      Authorization: `Bearer ${getAuthorization().access_token}`,
    },
  };
}


export default {
  // Category
  async createCategory(payload: ICategoryCreate) {
    return await axios.post<ICategory>(`${baseURL}/category/`, payload, authHeaders());
  },
  async getAllCategories() {
    return axios.get<ICategory[]>(`${baseURL}/category/`, authHeaders());
  },
  async removeCategory(_id: string) {
    return axios.delete<boolean>(`${baseURL}/category/${_id}`, authHeaders());
  },
  // User
  async getAccessToken(username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return await axios.post<IToken>(`${baseURL}/token/`, formData);
  },
  async getMe() {
    return axios.get<IUser>(`${baseURL}/user/me/`, authHeaders());
  },
  async createUser(payload: IUserCreate) {
    return await axios.post<IUser>(`${baseURL}/user/`, payload);
  }
}
