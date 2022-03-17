export interface IFormFieldCreate extends
  TextField,
  MultipleCheckboxField,
  SingleSelectionField,
  VideoField,
  ImageField,
  TextEditField {
  form_id: string
  type: number // 1 - Text, 2 - Múltipla Escolha(Checkbox), 3 - Escolha Unica, 4 - Vídeo, 5 - Imagem, 6 - Campo de Texto editável
  styles?: object
  section_id: number
}

export default interface IFormField extends IFormFieldCreate{
  _id: string
}

export interface IFormFieldUpdate extends
  TextField,
  MultipleCheckboxField,
  SingleSelectionField,
  VideoField,
  ImageField,
  TextEditField  {
  title?: string
  subtitle?: string
  category_id?: string
  is_active?: boolean
  finished?: boolean
  start_date?: string
  end_date?: string
}

interface ImageField {
  video_src?: string
}

interface TextEditField {
  video_src?: string
}

interface VideoField {
  video_src?: string
}

interface SingleSelectionField {
  single_selection_options?: Array<object>
}

interface TextField {
  text_text?: string
}

interface MultipleCheckboxField {
  multiple_checkbox_options?: Array<object>
}
