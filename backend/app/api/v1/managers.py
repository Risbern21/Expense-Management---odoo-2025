from logging import Manager
from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.crud import managers
from app.db.session import get_db
from app.schemas.managers import ManagerCreate

router = APIRouter(prefix="/managers", tags=["managers"])


@router.post("/")
def create_manager(manager: ManagerCreate, db: Session = Depends(get_db)):
    return managers.create_manager(manager=manager, db=db)


@router.get("/{m_id}")
def get_manager(m_id: UUID, db: Session = Depends(get_db)):
    return managers.get_manager(m_id=m_id, db=db)


@router.put("/{m_id}")
def update_manager(
    m_id: UUID,
    manager: ManagerCreate,
    db: Session = Depends(get_db),
):
    return managers.update_manager(m_id=m_id, manager=manager, db=db)


@router.delete("/{m_id}")
def delete_manager(
    m_id: UUID,
    db: Session = Depends(get_db),
):
    return managers.delete_manager(m_id=m_id, db=db)
