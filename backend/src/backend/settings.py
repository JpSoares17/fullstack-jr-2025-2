from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file='.env', 
        env_file_encoding='utf-8',
        env_ignore_empty=True
    )

    DATABASE_URL: str = "postgresql://jpsoares:bootwiN$0100$2024@localhost:5433/fullstack_db"
    DEBUG: bool = True
    SECRET_KEY: str = "your-secret-key-here"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5433
    POSTGRES_DB: str = "fullstack_db"
    POSTGRES_USER: str = "jpsoares"
    POSTGRES_PASSWORD: str = "bootwiN$0100$2024"

# Instância global das configurações
settings = Settings()