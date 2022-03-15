from pydantic import BaseModel, Field
from typing import Optional
from app.db.pyobjectid import PyObjectId
from bson import ObjectId


class TextField:
    text_text: Optional[str]
    text_styles: Optional[dict]


class MultipleCheckboxField:
    multiple_checkbox_options: Optional[list]
    multiple_checkbox_styles: Optional[dict]


class FormFieldCreate(BaseModel, TextField):
    form_id: PyObjectId
    type: int # 1 - Text, 2 - Múltipla Escolha(Checkbox), 3 - Escolha Unica, 4 - Vídeo, 5 - Imagem, 6 - Campo de Texto editável
    section_id: int


class FormFieldUpdate(BaseModel):
    title: Optional[str]
    color: Optional[str]


class FormField(FormFieldCreate):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }

