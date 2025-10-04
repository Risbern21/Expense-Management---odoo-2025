from fastapi import FastAPI

from app.api.v1 import company
from app.db.session import get_db

app = FastAPI()

app.include_router(company.router, prefix="/api/v1")


@app.get("/")
def root():
    db = get_db()
    return {"message": "you've hit the root endpoint"}
