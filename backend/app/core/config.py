from pydantic import BaseSettings

class Settings(BaseSettings):

    API_STR:str = '/api'

    DB_URL: str = 'mongodb://admin:admin@mongodb:27017/?authSource=admin&readPreference=primary&appname=Survey Site&directConnection=true&ssl=false'

    SECRET_KEY = "1195db24567b454f4bb14baff69677e6792f6079ae0828c892852b89afcb4578"
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30

settings = Settings()