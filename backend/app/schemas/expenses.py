from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class Expenses(BaseModel):
    id: UUID
    amount: float
    category: str
    description: str
    date: datetime
