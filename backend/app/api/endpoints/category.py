from fastapi import APIRouter, Depends, HTTPException
from app.models.category import Category, CategoryCreate
from app.models.user import User
from typing import List
from app.db.config_db import getDB
from pymongo.database import Database
from app.core import dependencies
from bson.objectid import ObjectId

router = APIRouter()


@router.get("/", response_model=List[Category])
def get_all_categories(
        db: Database = Depends(getDB),
        current_user: User = Depends(dependencies.get_current_active_user)
):
    categories = []
    for category in db.Category.find():
        categories.append(Category(**category))

    return categories


@router.post("/", response_model=Category)
def create_category(
        category_in: CategoryCreate,
        db: Database = Depends(getDB),
        current_user: User = Depends(dependencies.get_current_active_user)
):

    new = db.Category.insert_one(category_in.dict(by_alias=True))

    if not new:
        raise HTTPException(status_code=500, detail='Não foi possível criar a categoria')

    return db.Category.find_one({"_id": new.inserted_id})


@router.delete("/{_id}/")
def remove_category(
        _id: str,
        db: Database = Depends(getDB),
        current_user: User = Depends(dependencies.get_current_active_user)
):
    deleted = db.Category.delete_one({"_id": ObjectId(_id)})

    if not deleted.acknowledged:
        raise HTTPException(status_code=500, detail='Não foi deletar a categoria')

    return deleted.acknowledged
