from sqlalchemy import create_engine

from decouple import config
from sqlalchemy.orm import Session

engine = create_engine(config("DATABASE_URL"))

def get_session():
    with Session(engine) as session:
        yield session