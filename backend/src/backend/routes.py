from uuid import UUID

from fastapi import APIRouter, HTTPException, status
from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session

from backend.schemas import UserDB, UserList, UserPublic, UserSchema
from backend.settings import settings
from backend.models import User

auth_router = APIRouter(prefix='/api/auth')

@auth_router.post(
    '/register', response_model=UserPublic, status_code=status.HTTP_201_CREATED
)
def create_user(user: UserSchema):
    engine = create_engine(settings.DATABASE_URL)
    
    db_session = Session(engine)

    user_db = db_session.scalar(
        select(User).where(User.email == user.email)
    )

    if user_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='User already exists'
        )
    
    # Criar novo usuário
    new_user = User(
        name=user.name,
        email=user.email,
        password=user.password
    )

    # Salvar no banco
    db_session.add(new_user)
    
    db_session.commit()
    
    db_session.refresh(new_user)

    return new_user


@auth_router.get(
    '/users', response_model=UserList, status_code=status.HTTP_200_OK
)
def list_users():
    # Criar engine e sessão
    engine = create_engine(settings.DATABASE_URL)
    db_session = Session(engine)
    
    users = db_session.scalars(
        select(User)
    ).all()
    
    return {'users': users}


@auth_router.put(
    '/users/{user_id}', response_model=UserPublic, status_code=status.HTTP_200_OK
)
def update_user(user_id: UUID, user: UserSchema):
    user_with_id = UserDB(**user.model_dump(), id=user_id)


@auth_router.delete(
    '/users/{user_id}', status_code=status.HTTP_204_NO_CONTENT
)
def delete_user(user_id: UUID):
    pass
