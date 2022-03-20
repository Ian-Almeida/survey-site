import {LocalStorage} from 'quasar';
import {IToken} from 'src/interfaces/token';


export const getAuthorization = () => {
  return LocalStorage.getItem('authorization') as IToken;
};

export const  setAuthorization = (value: IToken) => LocalStorage.set('authorization', value);

export const removeAuthorization = () => LocalStorage.remove('authorization');

export const BRDatetimeToDatetime = (BRDate: string) => {
  if (BRDate) {
    const dateNTime = BRDate.split(' ');
    const date = dateNTime[0].split('/');
    return `${date[0]}-${date[1]}-${date[2]}T${dateNTime[1]}:00`;
  } else {
    return '';
  }
}

export const datetimeToBRDatetime = (datetime: string) => {
  if (datetime) {
    const dateNTime = datetime.split('T');
    console.log(dateNTime, 'datentime')
    const date = dateNTime[0].split('-');
    console.log()
    return `${date[2]}/${date[1]}/${date[0]} ${dateNTime[1]}`;
  } else {
    return '';
  }
}

export const BRLocale = {
  /* starting with Sunday */
  days: 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
  daysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
  months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
  monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
  firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
  format24h: true,
  pluralDay: 'dias'
}
