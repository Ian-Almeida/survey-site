export enum EFormFieldType {
  Text = 1,
  MultipleSelect,
  SingleSelect,
  Video,
  Image,
  InputField
}

export interface IFormFieldCreate extends
  TextField,
  MultipleCheckboxField,
  SingleSelectionField,
  VideoField,
  ImageField,
  InputField {
  form_id: string
  type: number // 1 - Text, 2 - Múltipla Escolha(Checkbox), 3 - Escolha Unica, 4 - Vídeo, 5 - Imagem, 6 - Campo de Texto editável
  styles?: object
  section_id: number
}

export default interface IFormField extends IFormFieldCreate{
  _id?: string
}

export interface IFormFieldUpdate extends
  TextField,
  MultipleCheckboxField,
  SingleSelectionField,
  VideoField,
  ImageField,
  InputField  {
  title?: string
  subtitle?: string
  category_id?: string
  is_active?: boolean
  finished?: boolean
  start_date?: string
  end_date?: string
}

interface ImageField {
  image_src?: string
}

interface InputField {
  input_text?: string
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

export const newFormField = (fieldType: number, sectionId: number): IFormFieldCreate => {
  const newField: IFormFieldCreate = {
    form_id: '',
    section_id: sectionId,
    type: fieldType,
  }

  switch (fieldType) {
    case EFormFieldType.Text:
      newField.text_text = '';
      break;
    case EFormFieldType.MultipleSelect:
      newField.multiple_checkbox_options = [];
      break;
    case EFormFieldType.SingleSelect:
      newField.single_selection_options = [];
      break;
    case EFormFieldType.Video:
      newField.video_src = '';
      break;
    case EFormFieldType.Image:
      newField.image_src = '';
      break;
    case EFormFieldType.InputField:
      newField.input_text = '';
  }

  return newField;
}
