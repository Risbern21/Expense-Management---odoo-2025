from sqlalchemy.orm import Session

from app.core.security import create_access_token, verify_password
from app.models.company import Company


def authenticate_user(db: Session, email: str, password: str) -> Company | None:
    user = db.query(Company).filter(Company.email == email).first()

    if not user:
        return None
    if not verify_password(password, str(user.hashed_password)):
        return None
    return user


def create_token_for_user(company: Company) -> str:
    data = {"sub": str(company.email)}
    return create_access_token(data=data)
