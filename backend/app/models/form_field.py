from pydantic import BaseModel, Field
from typing import Optional
from app.db.pyobjectid import PyObjectId
from bson import ObjectId


class ImageField:
    video_src: Optional[str]


class TextEditField:
    video_src: Optional[str]


class VideoField:
    video_src: Optional[str]


class SingleSelectionField:
    single_selection_options: Optional[list]


class TextField:
    text_text: Optional[str]


class MultipleCheckboxField:
    multiple_checkbox_options: Optional[list]


class FormFieldCreate(BaseModel, TextField, MultipleCheckboxField, SingleSelectionField, VideoField, ImageField, TextEditField):
    form_id: PyObjectId
    type: int # 1 - Text, 2 - Múltipla Escolha(Checkbox), 3 - Escolha Unica, 4 - Vídeo, 5 - Imagem, 6 - Campo de Texto editável
    styles: Optional[dict]
    section_id: int


class FormFieldUpdate(BaseModel, TextField, MultipleCheckboxField, SingleSelectionField, VideoField, ImageField, TextEditField):
    form_id: Optional[PyObjectId]
    type: Optional[int]  # 1 - Text, 2 - Múltipla Escolha(Checkbox), 3 - Escolha Unica, 4 - Vídeo, 5 - Imagem, 6 - Campo de Texto editável
    styles: Optional[dict]
    section_id: Optional[int]


class FormField(FormFieldCreate):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }

