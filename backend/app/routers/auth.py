from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas import Token, UserLogin, UserRegister
from app.database import get_db
from app.core.auth import create_access_token, verify_password, hash_password
from app.crud import create_user, get_user_by_username
from app.models import User
import re

auth_router = APIRouter()

@auth_router.post("/login", response_model=Token)
async def login_user(user_data: UserLogin, db: AsyncSession = Depends(get_db)):
    user:User = await get_user_by_username(db, user_data.username)
    if user == None:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not verify_password(user_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token(user.user_id)
    
    return token

@auth_router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
async def register_user(user_data: UserRegister, db: AsyncSession = Depends(get_db)):
    if not re.match(r"^[a-zA-Z0-9_]+$", user_data.username):
        raise HTTPException(status_code=400, detail="Username can only contain letters, numbers, and underscores")

    existing = await get_user_by_username(db, user_data.username)
    if existing:
        raise HTTPException(status_code=400, detail="Username already in use")
    
    hashed_pwd = hash_password(user_data.password)

    user = await create_user(db, user_data.username, hashed_pwd)
    
    return Token(access_token=create_access_token(user.id))

