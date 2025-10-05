from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.crud import employees
from app.db.session import get_db
from app.schemas.employees import EmployeeCreate

router = APIRouter(prefix="/employees", tags=["employees"])


@router.post("/")
def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    return employees.create_employee(employee=employee, db=db)


@router.get("/{e_id}")
def get_employee(e_id: UUID, db: Session = Depends(get_db)):
    return employees.get_employee(e_id=e_id, db=db)


@router.put("/{e_id}")
def update_employee(
    e_id: UUID, employee: EmployeeCreate, db: Session = Depends(get_db)
):
    return employees.update_employee(e_id=e_id, employee=employee, db=db)


@router.delete("/{e_id}")
def delete_employee(e_id: UUID, db: Session = Depends(get_db)):
    return employees.delete_employee(e_id=e_id, db=db)
