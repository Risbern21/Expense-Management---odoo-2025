from fastapi import FastAPI

from app.api.v1 import company, employees, expenses, managers

app = FastAPI()

app.include_router(company.router, prefix="/api/v1")
app.include_router(managers.router, prefix="/api/v1")
app.include_router(employees.router, prefix="/api/v1")
app.include_router(expenses.router, prefix="/api/v1")


@app.get("/")
def root():
    return {"message": "you've hit the root endpoint"}
