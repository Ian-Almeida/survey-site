from pydantic import BaseModel, Field
from typing import Optional
from app.db.pyobjectid import PyObjectId
from bson import ObjectId

class User(BaseModel):
    id: Optional[PyObjectId] = Field(alias='_id')
    email: str
    password: str
    username: str

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }