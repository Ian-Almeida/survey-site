from pydantic import BaseSettings

class Settings(BaseSettings):

    API_STR:str = '/api'

    DB_URL: str = 'mongodb://admin:admin@mongodb:27017/?authSource=admin&readPreference=primary&appname=Survey Site&directConnection=true&ssl=false'

settings = Settings()