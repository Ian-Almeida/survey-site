from fastapi import APIRouter, Depends
from app.models.user import User
from typing import List
from app.db.config_db import getDB
from pymongo.database import Database

router = APIRouter()

@router.get("/")
def get_all_users(db: Database = Depends(getDB)) -> List[User]:
    users = []
    for user in db.User.find():
        users.append(User(**user))

    return users


@router.post("/")
async def create_user(user: User, db=Depends(getDB)) -> User:
    if hasattr(user, 'id'):
        delattr(user, 'id')
    ret = db.User.insert_one(user.dict(by_alias=True))
    user.id = ret.inserted_id
    return user
