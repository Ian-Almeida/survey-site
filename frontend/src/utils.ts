import {LocalStorage} from 'quasar';
import {IToken} from 'src/interfaces/token';


export const getAuthorization = () => {
  return LocalStorage.getItem('authorization') as IToken;
};

export const  setAuthorization = (value: IToken) => LocalStorage.set('authorization', value);

export const removeAuthorization = () => LocalStorage.remove('authorization');
