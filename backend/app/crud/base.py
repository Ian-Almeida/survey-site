from typing import Generic, TypeVar, Type, Optional, List

from pydantic import BaseModel
from pymongo.database import Database
from bson import ObjectId

SchemaType = TypeVar("SchemaType", bound=BaseModel)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Generic[SchemaType, CreateSchemaType, UpdateSchemaType]):

    def __init__(
            self,
            schema: Type[SchemaType],
            create_schema: Type[CreateSchemaType],
            update_schema: Type[UpdateSchemaType]
    ):
        self.schema = schema
        self.create_schema = create_schema
        self.update_schema = update_schema
        self.collection_name = self.schema.schema()['title']

    def get(self, db: Database, **kwargs) -> Optional[SchemaType]:
        if "_id" in kwargs:
            kwargs["_id"] = ObjectId(kwargs["_id"])

        result = db[self.collection_name].find_one(kwargs)
        if result:
            return self.schema(**result)
        return None

    def get_all(self, db: Database, **kwargs) -> List[SchemaType]:
        if "_id" in kwargs:
            kwargs["_id"] = ObjectId(kwargs["_id"])

        result = []
        for data in db[self.collection_name].find(kwargs):
            result.append(self.schema(**data))
        return result

    def create(self, db: Database, data_in: CreateSchemaType) -> Optional[SchemaType]:
        inserted = db[self.collection_name].insert_one(data_in.__dict__)

        if not inserted:
            return None

        return db[self.collection_name].find_one({"_id": inserted.inserted_id})

    def delete(self, db: Database, _id: str) -> bool:
        deleted = db[self.collection_name].delete_one({"_id": ObjectId(_id)})

        return deleted.acknowledged