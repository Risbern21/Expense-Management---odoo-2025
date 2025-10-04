import uuid

from sqlalchemy import UUID, Column, ForeignKey, String

from app.db.session import Base
from app.models.company import Company
from app.models.managers import Managers


class Employee(Base):
    __tablename__ = "employees"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    e_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    works_for = Column(UUID, ForeignKey(Company.id, ondelete="CASCADE"))
    works_under = Column(UUID, ForeignKey(Managers.id, ondelete="CASCADE"))
