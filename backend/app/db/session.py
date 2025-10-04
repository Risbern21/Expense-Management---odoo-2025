import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s  - %(message)s"
)

logger = logging.getLogger(__name__)

DATABASE_URL="postgresql+psycopg2://postgres:postgres@localhost:5432/expense"
engine = create_engine(DATABASE_URL)
sessionLocal = sessionmaker(autocommit=False,autoflush=False,bind=engine)

print(engine)

Base = declarative_base()

def get_db():
    db = sessionLocal()
    try:
        yield db
    except Exception as e:
        logger.info(f"{str(e)}")
    finally:
        db.close()
