export interface IFormCreate {
  title: string
  subtitle: string
  category_id: string
  is_active: boolean
  // finished: boolean
  start_date?: string
  end_date?: string
}

export default interface IForm extends IFormCreate{
  _id: string
}

export interface IFormUpdate {
  title?: string
  subtitle?: string
  category_id?: string
  is_active?: boolean
  // finished?: boolean
  start_date?: string
  end_date?: string
}
