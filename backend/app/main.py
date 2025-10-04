from fastapi import FastAPI

from app.db.session import get_db

app = FastAPI()


@app.get("/")
def root():
    db = get_db()
    return {"message": "you've hit the root endpoint"}
