const validateRequired = [
  (val: string) => val && val.length > 0 || 'Preencha o campo',
]

const validateEmail = [
  ...validateRequired,
  (val: string) => val.toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) || 'O e-mail deve ser valido!'
]

const validatePassword = [
  ...validateRequired,
  (val: string) => val.length >= 6 || 'A senha deve ter mais de 6 caracteres!',
]

export default {
  email: validateEmail,
  password: validatePassword,
  required: validateRequired,
}
