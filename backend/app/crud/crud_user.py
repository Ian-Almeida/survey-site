from .base import CRUDBase
from app.models.user import User, UserCreate, UserUpdate


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    pass


user = CRUDUser(User)
