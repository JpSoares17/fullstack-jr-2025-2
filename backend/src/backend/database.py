from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base

from decouple import config
from sqlalchemy.orm import Session

Base = declarative_base()
engine = create_engine(config("DATABASE_URL"))

def get_session():
    with Session(engine) as session:
        yield session