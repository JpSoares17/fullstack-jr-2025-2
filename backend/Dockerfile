# Use Python 3.13 slim image
FROM python:3.13-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Poetry
RUN pip install poetry

# Configure Poetry
RUN poetry config virtualenvs.create false

# Copy Poetry files
COPY pyproject.toml poetry.lock README.md ./

# Copy Alembic files
COPY alembic.ini ./
COPY migrations/ ./migrations/

# Copy source code
COPY src/ ./src/

# Copy start scripts
COPY start.sh ./

# Make start scripts executable
RUN chmod +x start.sh

# Install only production dependencies
RUN poetry install --only=main

# Expose port
EXPOSE ${PORT:-8000}

# Run the application in production mode
CMD ["uvicorn", "src.backend.app:app", "--host", "0.0.0.0", "--port", "${PORT:-8000}"]
