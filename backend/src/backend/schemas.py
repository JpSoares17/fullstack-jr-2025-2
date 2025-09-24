from uuid import UUID

from pydantic import BaseModel, EmailStr


class UserSchema(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserDB(UserSchema):
    id: UUID


class UserPublic(BaseModel):
    id: UUID
    name: str
    email: EmailStr


class UserList(BaseModel):
    users: list[UserPublic]
