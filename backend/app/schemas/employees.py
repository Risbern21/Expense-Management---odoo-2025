from uuid import UUID

from pydantic import BaseModel, EmailStr


class EmployeesBase(BaseModel):
    e_name: str
    email: EmailStr
    works_for: UUID
    works_under: UUID


# for creating employee
class EmployeeCreate(EmployeesBase):
    hashed_password: str


# for reading employee details
class EmployeesRead(EmployeesBase):
    id: UUID

    class config:
        orm_mode = True
