from uuid import UUID

from pydantic import BaseModel, EmailStr


class CompanyBase(BaseModel):
    name: str
    email: EmailStr
    currency: str


# for creating comapny
class CompanyCreate(CompanyBase):
    hashed_password: str


# for reading company details
class CompanyRead(CompanyBase):
    id: UUID

    class config:
        orm_mode = True
