from .base import CRUDBase
from app.models.category import Category, CategoryCreate, CategoryUpdate


class CRUDCategory(CRUDBase[Category, CategoryCreate, CategoryUpdate]):
    pass


crud_category = CRUDCategory(Category, CategoryCreate, CategoryUpdate)
