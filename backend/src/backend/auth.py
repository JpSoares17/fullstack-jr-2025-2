from datetime import datetime, timedelta
from typing import Optional
from uuid import UUID

from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session

from backend.settings import settings
from backend.models import User

# Configuração para hash de senhas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Configuração do Bearer token
security = HTTPBearer()

# Engine global para conexão com banco
engine = create_engine(settings.DATABASE_URL)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifica se a senha está correta"""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Gera hash da senha"""
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Cria um token JWT"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt


def verify_token(token: str) -> dict:
    """Verifica e decodifica um token JWT"""
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_user_by_id(user_id: UUID) -> Optional[User]:
    """Busca usuário por ID no banco de dados"""
    with Session(engine) as db_session:
        return db_session.scalar(select(User).where(User.id == user_id))


def authenticate_user(email: str, password: str) -> Optional[User]:
    """Autentica usuário com email e senha"""
    with Session(engine) as db_session:
        user = db_session.scalar(select(User).where(User.email == email))
        if not user:
            return None
        if not verify_password(password, user.password):
            return None
        return user


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> User:
    """Dependency para obter o usuário atual através do token JWT"""
    token = credentials.credentials
    
    # Verificar e decodificar o token
    payload = verify_token(token)
    user_id: str = payload.get("sub")
    
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Buscar usuário no banco
    user = get_user_by_id(UUID(user_id))
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não encontrado",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return user


def get_current_user_id(credentials: HTTPAuthorizationCredentials = Depends(security)) -> UUID:
    """Dependency para obter apenas o ID do usuário atual"""
    user = get_current_user(credentials)
    return user.id
