from typing import Generic, TypeVar, Type, Optional
from pydantic import BaseModel
from pymongo.database import Database
from bson import ObjectId

SchemaType = TypeVar("SchemaType", bound=BaseModel)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
# UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


# class CRUDBase(Generic[SchemaType, CreateSchemaType, UpdateSchemaType]):
class CRUDBase(Generic[SchemaType]):

    def __init__(self, schema: Type[SchemaType]):
        self.schema = schema
        self.collection_name = self.schema.schema()['title']

    def get(self, db: Database, **kwargs) -> Optional[SchemaType]:

        if "_id" in kwargs:
            kwargs["_id"] = ObjectId(kwargs["_id"])

        result = db[self.collection_name].find_one(kwargs)
        if result:
            return self.schema(**result)
        return None

    def create(self, db: Database, to_create: CreateSchemaType):
        pass