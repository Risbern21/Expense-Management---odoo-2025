from uuid import UUID

from fastapi import HTTPException, Response, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.models.company import Company
from app.schemas.company import CompanyCreate


def create_company(company: CompanyCreate, db: Session) -> Company:
    try:
        db_company = Company(
            name=company.name,
            email=company.email,
            hashed_password=company.hashed_password,
            currency=company.currency,
        )

        db.add(db_company)
        db.commit()
        db.refresh(db_company)
        return db_company

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"unable to register as a company : {str(e)}",
        )


def get_company(c_id: UUID, db: Session) -> Company:
    try:
        db_company = db.query(Company).filter(Company.id == c_id).first()

        return db_company

    except HTTPException:
        raise

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"unable to fetch company {str(e)}",
        )


def update_company(c_id: UUID, company: CompanyCreate, db: Session):
    try:
        db_company = (
            db.query(Company)
            .filter(Company.id == c_id)
            .update(
                {
                    Company.name: company.name,
                    Company.hashed_password: company.hashed_password,
                    Company.currency: company.currency,
                }
            )
        )
        if db_company == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
            )

        db.commit()

        return Response(status_code=status.HTTP_204_NO_CONTENT)

    except Exception as e:
        db.rollback()

        if e == SQLAlchemyError:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="company not found",
            )

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"unable to update company {str(e)}",
        )


def delete_company(c_id: UUID, db: Session):
    try:
        # if current_company.id != c_id:
        #    raise HTTPException(
        #       status_code=status.HTTP_401_UNAUTHORIZED,
        #      detail="you do not have necessary permissions",
        # )

        db_company = db.query(Company).filter(Company.id == c_id).first()
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
            detail=f"unable to delete company {str(e)}",
        )
