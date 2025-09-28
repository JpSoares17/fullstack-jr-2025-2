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

# Copy source code
COPY src/ ./src/

# Copy start scripts and test apps
COPY start.sh start-simple.sh start-debug.sh start-test.sh start-no-db.sh start-no-migrations.sh test-app.py app-no-db.py ./

# Make start scripts executable
RUN chmod +x start.sh start-simple.sh start-debug.sh start-test.sh start-no-db.sh start-no-migrations.sh

# Install only production dependencies
RUN poetry install --only=main

# Expose port
EXPOSE ${PORT:-8000}

# Run the application in production mode
CMD ["fastapi", "run", "src/backend/app.py", "--host", "0.0.0.0", "--port", "${PORT:-8000}"]
