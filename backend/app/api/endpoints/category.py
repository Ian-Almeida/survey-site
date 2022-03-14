from fastapi import APIRouter, Depends, HTTPException
from app.models.category import Category, CategoryCreate, CategoryUpdate
from app.models.user import User
from typing import List
from app.db.config_db import getDB
from pymongo.database import Database
from app.core import dependencies
from app.crud import crud_category

router = APIRouter()


@router.get("/", response_model=List[Category])
def get_all_categories(
        db: Database = Depends(getDB),
        current_user: User = Depends(dependencies.get_current_active_user)
):
    return crud_category.get_all(db=db)


@router.post("/", response_model=Category)
def create_category(
        category_in: CategoryCreate,
        db: Database = Depends(getDB),
        current_user: User = Depends(dependencies.get_current_active_user)
):

    created = crud_category.create(db=db, data_in=category_in)

    if not created:
        raise HTTPException(status_code=500, detail='Não foi possível criar a categoria')

    return created


@router.put("/{_id}/", response_model=Category)
def update_category(
        _id: str,
        category_in: CategoryUpdate,
        db: Database = Depends(getDB),
        current_user: User = Depends(dependencies.get_current_active_user),
):
    updated = crud_category.update(db=db, data_in=category_in, _id=_id)

    if not updated:
        raise HTTPException(status_code=500, detail='Não foi possível atualizar a categoria')

    return updated


@router.delete("/{_id}/")
def remove_category(
        _id: str,
        db: Database = Depends(getDB),
        current_user: User = Depends(dependencies.get_current_active_user)
):

    deleted = crud_category.delete(db=db, _id=_id)

    if not deleted:
        raise HTTPException(status_code=500, detail='Não foi possível deletar a categoria')

    return deleted
