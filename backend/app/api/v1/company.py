from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.v1.auth import get_current_company
from app.crud import company as companyModule
from app.db.session import get_db
from app.models.company import Company
from app.schemas.company import CompanyCreate

router = APIRouter(prefix="/company", tags=["company"])


@router.post("/")
def create_company(company: CompanyCreate, db: Session = Depends(get_db)):
    return companyModule.create_company(company=company, db=db)


@router.get("/")
def get_company(current_company: Company = Depends(get_current_company)):
    return {
        "id": current_company.id,
        "email": current_company.email,
        "username": current_company.username,
        "tier": current_company.tier,
        "years": current_company.years,
    }


@router.put("/")
def update_company(
    c_id: UUID,
    company: CompanyCreate,
    current_company: Company = Depends(get_current_company),
    db: Session = Depends(get_db),
):
    return companyModule.update_company(id=c_id, company=company, db=db)


@router.delete("/")
def delete_company(
    c_id: UUID,
    current_company: Company = Depends(get_current_company),
    db: Session = Depends(get_db),
):
    return companyModule.delete_company(
        c_id=c_id, current_company=current_company, db=db
    )
