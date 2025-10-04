from fastapi import FastAPI

from app.api.v1 import company, expenses
from app.db.session import get_db

app = FastAPI()

app.include_router(company.router, prefix="/api/v1")
app.include_router(expenses.router, prefix="/api/v1")


@app.get("/")
def root():
    db = get_db()
    return {"message": "you've hit the root endpoint"}
