from .base import CRUDBase
from app.models.user import User, UserCreate, UserUpdate, UserInDB
from pymongo.database import Database
from ..core.auth import get_password_hash


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):

    def create(self, db: Database, data_in: UserCreate):
        to_create = UserInDB(**data_in.__dict__, hashed_password=get_password_hash(data_in.password))

        new = db.User.insert_one(to_create.dict(by_alias=True))

        if not new:
            return None

        return db.User.find_one({"_id": new.inserted_id})


crud_user = CRUDUser(User, UserCreate, UserUpdate)
