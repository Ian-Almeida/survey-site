from fastapi import APIRouter, Depends, HTTPException
from app.models.user import User, UserCreate, UserInDB
from typing import List
from app.db.config_db import getDB
from pymongo.database import Database
from app.core import dependencies
from app.core.auth import get_password_hash

router = APIRouter()


@router.get("/me/", response_model=User)
async def read_users_me(current_user: User = Depends(dependencies.get_current_active_user)):
    return current_user


@router.get("/", response_model=List[User])
def get_all_users(
        db: Database = Depends(getDB),
        current_user: User = Depends(dependencies.get_current_active_user)
):
    users = []
    for user in db.User.find():
        users.append(User(**user))

    return users


@router.post("/", response_model=User)
async def create_user(
        user: UserCreate,
        db=Depends(getDB),
):

    to_create = UserInDB(**user.__dict__, hashed_password=get_password_hash(user.password))

    new = db.User.insert_one(to_create.dict(by_alias=True))

    if not new:
        raise HTTPException(status_code=500, detail='Cannot create user')

    return db.User.find_one({"_id": new.inserted_id})

