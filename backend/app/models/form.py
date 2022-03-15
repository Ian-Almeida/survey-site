from pydantic import BaseModel, Field
from typing import Optional
from app.db.pyobjectid import PyObjectId
from bson import ObjectId
from datetime import datetime


class FormCreate(BaseModel):
    title: str
    subtitle: str
    category_id: PyObjectId
    is_active: bool
    release_date: Optional[datetime]


class FormUpdate(BaseModel):
    title: Optional[str]
    subtitle: Optional[str]
    category_id: Optional[PyObjectId]
    is_active: Optional[bool]
    release_date: Optional[datetime]


class Form(FormCreate):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }

