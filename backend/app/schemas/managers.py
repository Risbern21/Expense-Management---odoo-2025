from uuid import UUID

from pydantic import BaseModel, EmailStr


class ManagersBase(BaseModel):
    m_name: str
    email: EmailStr
    phone: str


# for creating a Manager
class ManagerCreate(ManagersBase):
    hashed_password: str


# for reading manager details
class ManagerRead(ManagersBase):
    id: UUID

    class config:
        orm_mode = True
