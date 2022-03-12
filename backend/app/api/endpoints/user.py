from fastapi import APIRouter, Depends, HTTPException
from app.models.user import User, UserCreate
from typing import List
from app.db.config_db import getDB
from pymongo.database import Database
from app.core import dependencies
from app.crud import crud_user

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

    created = crud_user.create(db=db, data_in=user)

    if not created:
        raise HTTPException(status_code=500, detail='Não foi possível criar usuário')

    return created
