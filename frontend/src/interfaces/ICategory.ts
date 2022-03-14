export interface ICategoryCreate {
  color: string
  title: string
}

export interface ICategoryUpdate {
  color?: string
  title?: string
}

export interface ICategory extends ICategoryCreate{
  _id: string
}
