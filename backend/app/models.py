from datetime import datetime
from decimal import Decimal
from typing import List
import uuid

from sqlalchemy import DateTime, Numeric, String, ForeignKey, Text, Uuid
from sqlalchemy.orm import mapped_column, Mapped, relationship
from sqlalchemy.sql import func

from app.database import Base


class User(Base):
     __tablename__ = "users"

     id: Mapped[int] = mapped_column(primary_key=True)
     username: Mapped[str] = mapped_column(String(32), nullable=False, unique=True)
     password: Mapped[str] = mapped_column(Text, nullable=False)
     
     expenses: Mapped[List["Expense"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan"
     )

class Expense(Base):
     __tablename__ = "expenses"

     id: Mapped[uuid.UUID] = mapped_column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
     user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), nullable=False)
     name: Mapped[str] = mapped_column(String(64), nullable=False)
     amount: Mapped[Decimal] = mapped_column(Numeric(10,2), nullable=False)
     category: Mapped[str] = mapped_column(String(32), default="Uncategorised")
     date: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
     
     user: Mapped["User"] = relationship(back_populates="expenses")
     
