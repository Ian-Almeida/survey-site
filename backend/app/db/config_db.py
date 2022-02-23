from pymongo import MongoClient
from pymongo.database import Database
from app.core.config import settings



def getDB() -> Database:
    client = MongoClient(settings.DB_URL)

    db = client['survey_site']
    return db