export interface IUserCreate {
  email: string
  full_name: string
  is_active: boolean
  password: string
}

export interface IUser {
  _id: string
  email: string
  full_name: string
  is_active: boolean
  hashed_password: string
}
