from datetime import datetime

from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class UserSchema(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=100)


class UserDB(UserSchema):
    id: UUID


class UserPublic(BaseModel):
    id: UUID
    name: str
    email: EmailStr


class UserList(BaseModel):
    users: list[UserPublic]

class UserLogin(BaseModel):
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserPublic


class LogoutResponse(BaseModel):
    message: str = "Logout realizado com sucesso"


class TokenData(BaseModel):
    user_id: UUID | None = None


class TaskSchema(BaseModel):
    title: str
    description: str
    status: str = "pending"
    priority: str = "medium"
    due_date: datetime


class TaskDB(TaskSchema):
    id: UUID
    user_id: UUID
    created_at: datetime
    updated_at: datetime


class TaskPublic(BaseModel):
    id: UUID
    title: str
    description: str
    status: str
    priority: str
    due_date: datetime
    created_at: datetime
    updated_at: datetime


class TaskList(BaseModel):
    tasks: list[TaskPublic]


class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    status: str | None = None
    priority: str | None = None
    due_date: datetime | None = None