from uuid import uuid4, UUID

from fastapi import APIRouter, status, HTTPException

from backend.schemas import UserDB, UserList, UserPublic, UserSchema

auth_router = APIRouter(prefix='/api/auth')

database = []


@auth_router.post(
    '/register', response_model=UserPublic, status_code=status.HTTP_201_CREATED
)
def register(user: UserSchema):
    user_with_id = UserDB(id=uuid4(), **user.model_dump())

    database.append(user_with_id)

    return user_with_id


@auth_router.get(
    '/users', response_model=UserList, status_code=status.HTTP_200_OK
)
def list_users():
    return {'users': database}

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