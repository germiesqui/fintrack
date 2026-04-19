from datetime import date 
from decimal import Decimal

from pydantic import BaseModel, Field, ConfigDict
from uuid import UUID
from typing import List

# User

class UserRegister(BaseModel):
    username: str = Field(..., min_length=3, max_length=32)
    password: str = Field(..., min_length=8, max_length=64)

class UserLogin(BaseModel):
    username: str
    password: str

class UserRead(BaseModel):
    id: UUID
    username: str = Field(min_length=3, max_length=32)
    expenses: List["ExpenseRead"] = []

    model_config = ConfigDict(from_attributes=True)

# Auth Token

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    user_id: UUID


# Expense

class ExpenseCreate(BaseModel):
    name: str = Field(..., min_length=3, max_length=64)
    amount: Decimal = Field(max_digits=20, decimal_places=2, ge=0)
    category: str = Field(..., min_length=2, max_length=32)
    date: date

class ExpenseRead(BaseModel):
    id: UUID
    name: str 
    amount: Decimal
    category: str
    date: date

    model_config = ConfigDict(from_attributes=True)