from logging import Manager
from uuid import UUID

from fastapi import HTTPException, Response, status
from sqlalchemy.orm import Query, Session

from app.models.managers import Managers
from app.schemas.managers import ManagerCreate


def create_manager(manager: ManagerCreate, db: Session) -> ManagerCreate:
    try:
        db_manager = Managers(
            m_name=manager.m_name,
            email=manager.email,
            hashed_password=manager.hashed_password,
            works_for=manager.works_for,
        )

        db.add(db_manager)
        db.commit()
        db.refresh(db_manager)
        return db_manager

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"internal server error {str(e)}",
        )


def get_manager(m_id: UUID, db: Session) -> Managers:
    try:
        db_manager = db.query(Managers).filter(Managers.id == m_id).first()

        return db_manager

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"internal server error {str(e)}",
        )


def get_all_managers(m_id: UUID, db: Session) -> Query[Managers]:
    try:
        db_managers = db.query(Managers).filter(Managers.works_for == m_id)

        return db_managers
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"internal server error {str(e)}",
        )


def update_manager(m_id: UUID, manager: ManagerCreate, db: Session):
    try:
        db_manager = (
            db.query(Managers)
            .filter(Managers.id == m_id)
            .update(
                {
                    Managers.m_name: manager.m_name,
                    Managers.works_for: manager.works_for,
                }
            )
        )
        if db_manager == 0:
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


def delete_manager(m_id: UUID, db: Session):
    try:
        db_manager = db.query(Managers).filter(Managers.id == m_id).first()
        if not db_manager:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="no such manager in database",
            )
        db.delete(db_manager)
        db.commit()
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"internal server error {str(e)}",
        )
