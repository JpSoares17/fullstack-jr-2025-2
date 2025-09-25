from uuid import UUID
from datetime import datetime

from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session

from backend.schemas import (
    UserDB, UserList, UserLogin, UserPublic, UserSchema, 
    LoginRequest, LoginResponse, TaskSchema, TaskPublic, 
    TaskList, TaskUpdate
)
from backend.settings import settings
from backend.models import User, Task
from backend.auth import (
    get_password_hash, authenticate_user, create_access_token,
    get_current_user, get_current_user_id
)

auth_router = APIRouter(prefix='/api/auth')
tasks_router = APIRouter(prefix='/api/tasks')



@auth_router.post(
    '/register', response_model=UserPublic, status_code=status.HTTP_201_CREATED
)
def create_user(user: UserSchema):
    engine = create_engine(settings.DATABASE_URL)
    
    with Session(engine) as db_session:
        # Verificar se usuário já existe
        existing_user = db_session.scalar(
            select(User).where(User.email == user.email)
        )

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail='Email já cadastrado'
            )
        
        # Criar novo usuário com senha hasheada
        hashed_password = get_password_hash(user.password)
        new_user = User(
            name=user.name,
            email=user.email,
            password=hashed_password
        )

        # Salvar no banco
        db_session.add(new_user)
        db_session.commit()
        db_session.refresh(new_user)

        return UserPublic(
            id=new_user.id,
            name=new_user.name,
            email=new_user.email
        )

@auth_router.post(
    '/login', response_model=LoginResponse, status_code=status.HTTP_200_OK
)
def login(login_data: LoginRequest):
    # Autenticar usuário
    user = authenticate_user(login_data.email, login_data.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Email ou senha inválidos',
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Criar token JWT
    access_token = create_access_token(data={"sub": str(user.id)})
    
    # Retornar resposta de login
    return LoginResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserPublic(
            id=user.id,
            name=user.name,
            email=user.email
        )
    )

@auth_router.get(
    '/me', response_model=UserPublic, status_code=status.HTTP_200_OK
)
def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Obter informações do usuário atual"""
    return UserPublic(
        id=current_user.id,
        name=current_user.name,
        email=current_user.email
    )


@auth_router.get(
    '/users', response_model=UserList, status_code=status.HTTP_200_OK
)
def list_users():
    # Criar engine e sessão
    engine = create_engine(settings.DATABASE_URL)
    
    with Session(engine) as db_session:
        users = db_session.scalars(
            select(User)
        ).all()
        
        return {'users': users}


# Endpoints de Tarefas
@tasks_router.get(
    '/', response_model=TaskList, status_code=status.HTTP_200_OK
)
def list_tasks(current_user: User = Depends(get_current_user)):
    engine = create_engine(settings.DATABASE_URL)
    
    with Session(engine) as db_session:
        tasks = db_session.scalars(
            select(Task).where(Task.user_id == current_user.id)
        ).all()
        
        return {'tasks': tasks}


@tasks_router.post(
    '/', response_model=TaskPublic, status_code=status.HTTP_201_CREATED
)
def create_task(task: TaskSchema, current_user: User = Depends(get_current_user)):
    engine = create_engine(settings.DATABASE_URL)
    
    with Session(engine) as db_session:
        new_task = Task(
            title=task.title,
            description=task.description,
            status=task.status,
            priority=task.priority,
            due_date=task.due_date,
            user_id=current_user.id
        )
        
        db_session.add(new_task)
        db_session.commit()
        db_session.refresh(new_task)
        
        return TaskPublic(
            id=new_task.id,
            title=new_task.title,
            description=new_task.description,
            status=new_task.status,
            priority=new_task.priority,
            due_date=new_task.due_date,
            created_at=new_task.created_at,
            updated_at=new_task.updated_at
        )


@tasks_router.put(
    '/{task_id}', response_model=TaskPublic, status_code=status.HTTP_200_OK
)
def update_task(task_id: UUID, task_update: TaskUpdate, current_user: User = Depends(get_current_user)):
    engine = create_engine(settings.DATABASE_URL)
    
    with Session(engine) as db_session:
        task = db_session.scalar(
            select(Task).where(Task.id == task_id, Task.user_id == current_user.id)
        )
        
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail='Tarefa não encontrada'
            )
        
        # Atualizar apenas os campos fornecidos
        update_data = task_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(task, field, value)
        
        db_session.commit()
        db_session.refresh(task)
        
        return TaskPublic(
            id=task.id,
            title=task.title,
            description=task.description,
            status=task.status,
            priority=task.priority,
            due_date=task.due_date,
            created_at=task.created_at,
            updated_at=task.updated_at
        )


@tasks_router.delete(
    '/{task_id}', status_code=status.HTTP_204_NO_CONTENT
)
def delete_task(task_id: UUID, current_user: User = Depends(get_current_user)):
    engine = create_engine(settings.DATABASE_URL)
    
    with Session(engine) as db_session:
        task = db_session.scalar(
            select(Task).where(Task.id == task_id, Task.user_id == current_user.id)
        )
        
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail='Tarefa não encontrada'
            )
        
        db_session.delete(task)
        db_session.commit()

