from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.crud import company as companyModule
from app.db.session import get_db
from app.schemas.company import CompanyCreate

router = APIRouter(prefix="/company", tags=["company"])


@router.post("/")
def create_company(company: CompanyCreate, db: Session = Depends(get_db)):
    return companyModule.create_company(company=company, db=db)


@router.get("/{c_id}")
def get_company(c_id: UUID, db: Session = Depends(get_db)):
    return companyModule.get_company(c_id=c_id, db=db)


@router.put("/{c_id}")
def update_company(
    c_id: UUID,
    company: CompanyCreate,
    db: Session = Depends(get_db),
):
    return companyModule.update_company(c_id=c_id, company=company, db=db)


@router.delete("/{c_id}")
def delete_company(
    c_id: UUID,
    db: Session = Depends(get_db),
):
    return companyModule.delete_company(c_id=c_id, db=db)
