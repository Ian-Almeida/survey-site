from typing import Generic, TypeVar
from pydantic import BaseModel

SchemaType = TypeVar("SchemaType", bound=BaseModel)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)

class CRUDBase(Generic[SchemaType, CreateSchemaType, UpdateSchemaType]):
    pass