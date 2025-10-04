import uuid
from sqlalchemy import UUID, Column, ForeignKey, String, Uuid
from app.db.session import Base
from app.models.company import Company

class Managers(Base):
    __tablename__ = "managers"

    id = Column(UUID(as_uuid=True),primary_key=True,default=uuid.uuid4)
    m_name = Column(String,nullable=False)
    hashed_password = Column(String,nullable=False)
    works_for = Column(UUID,ForeignKey(Company.id,ondelete='CASCADE'))
