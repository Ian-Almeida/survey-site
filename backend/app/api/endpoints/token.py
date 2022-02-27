from app.core.auth import authenticate_user, create_access_token
from app.models import Token
from fastapi.security import OAuth2PasswordRequestForm
from app.db.config_db import getDB
from pymongo.database import Database
from fastapi import Depends, HTTPException, status, APIRouter
from datetime import timedelta, datetime
from app.core.config import settings

router = APIRouter()


@router.post("/", response_model=Token)
async def login_for_access_token(
        form_data: OAuth2PasswordRequestForm = Depends(),
        db: Database = Depends(getDB)
):
    email = form_data.username
    password = form_data.password
    user = authenticate_user(db, email, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha estão incorretos!",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "expiration": datetime.utcnow() + access_token_expires}
