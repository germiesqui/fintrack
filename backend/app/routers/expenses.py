from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import uuid

from app.database import get_db
from app.core.auth import get_current_user
from app.models import User, Expense
from app.schemas import ExpenseCreate, ExpenseRead

expenses_router = APIRouter()


@expenses_router.get("/", response_model=list[ExpenseRead])
async def get_expenses(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Expense).where(Expense.user_id == current_user.id).order_by(Expense.date.desc()))
    return result.scalars().all()


@expenses_router.post("/", response_model=ExpenseRead, status_code=status.HTTP_201_CREATED)
async def create_expense(
    expense_data: ExpenseCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    expense = Expense(**expense_data.model_dump(), id=uuid.uuid4(), user_id=current_user.id)
    db.add(expense)
    await db.commit()
    await db.refresh(expense)
    return expense


@expenses_router.delete("/{expense_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_expense(
    expense_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result = await db.execute(
        select(Expense).where(Expense.id == expense_id, Expense.user_id == current_user.id)
    )
    expense = result.scalar_one_or_none()
    if expense is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expense not found")
    await db.delete(expense)
    await db.commit()


@expenses_router.get("/categories", response_model=list[str])
async def get_categories(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(
        select(Expense.category).where(Expense.user_id == current_user.id).distinct().order_by(Expense.category)
    )
    return result.scalars().all()