import axios from 'axios';
import {IUser, IUserCreate} from 'src/interfaces/IUser';
import {IToken} from 'src/interfaces/token';
import {getAuthorization} from 'src/utils';

const baseURL = 'http://localhost:8000/api';

function authHeaders() {
  return {
    headers: {
      Authorization: `Bearer ${getAuthorization().access_token}`,
    },
  };
}


export default {
  async getAccessToken(username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return await axios.post<IToken>(`${baseURL}/token/`, formData);
  },

  async getMe() {
    return axios.get<IUser>(`${baseURL}/users/me/`, authHeaders());
  },
  async createUser(payload: IUserCreate) {
    return await axios.post<IUser>(`${baseURL}/users/`, payload);
  }
}
