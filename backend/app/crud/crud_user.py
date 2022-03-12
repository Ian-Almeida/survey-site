from .base import CRUDBase
# from app.models.user import User, UserCreate, UserUpdate
from app.models.user import User, UserCreate, UserUpdate


# class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
class CRUDUser(CRUDBase[User]):
    pass


user = CRUDUser(User)
