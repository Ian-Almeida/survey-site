from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from app.db.pyobjectid import PyObjectId
from bson import ObjectId


class UserCreate(BaseModel):
    email: EmailStr
    full_name: str
    is_active: bool
    password: str


class UserUpdate(BaseModel):
    email: Optional[EmailStr]
    full_name: Optional[str]
    is_active: Optional[bool]
    password: Optional[str]


class UserInDB(BaseModel):
    email: EmailStr
    full_name: str
    is_active: bool
    hashed_password: str


class User(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    email: EmailStr
    full_name: str
    is_active: bool
    hashed_password: str

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }

