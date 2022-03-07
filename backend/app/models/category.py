from pydantic import BaseModel, Field
from typing import Optional
from app.db.pyobjectid import PyObjectId
from bson import ObjectId


class CategoryCreate(BaseModel):
    title: str
    color: str


class Category(CategoryCreate):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }

