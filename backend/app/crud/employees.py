from typing import List
from uuid import UUID

from fastapi import HTTPException, Response, status
from sqlalchemy.orm import Query, Session

from app.models.employees import Employee
from app.schemas.employees import EmployeeCreate


def create_employee(employee: EmployeeCreate, db: Session) -> EmployeeCreate:
    try:
        db_employee = Employee(
            e_name=employee.e_name,
            email=employee.email,
            hashed_password=employee.hashed_password,
            works_for=employee.works_for,
            works_under=employee.works_under,
        )

        db.add(db_employee)
        db.commit()
        db.refresh(db_employee)
        return db_employee

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"internal server error {str(e)}",
        )


def get_employee(e_id: UUID, db: Session) -> Employee:
    try:
        db_employee = db.query(Employee).filter(Employee.id == e_id).first()

        return db_employee

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"internal server error {str(e)}",
        )


def get_all_employees(c_id: UUID, db: Session) -> Query[Employee]:
    try:
        db_employees = db.query(Employee).filter(Employee.works_for == c_id)

        return db_employees
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"internal server error {str(e)}",
        )


def update_employee(e_id: UUID, employee: EmployeeCreate, db: Session):
    try:
        db_employee = (
            db.query(Employee)
            .filter(Employee.id == e_id)
            .update(
                {
                    Employee.e_name: employee.e_name,
                    Employee.works_under: employee.works_under,
                }
            )
        )
        if db_employee == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
            )

        db.commit()

        return Response(status_code=status.HTTP_204_NO_CONTENT)

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"internal server error {str(e)}",
        )


def delete_employee(e_id: UUID, db: Session):
    try:
        db_company = db.query(Employee).filter(Employee.id == e_id).first()
        if not db_company:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="no such company in database",
            )
        db.delete(db_company)
        db.commit()
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"internal server error {str(e)}",
        )
