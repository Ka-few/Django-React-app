# Use Python base image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Create work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Expose port (Choreo will map this)
EXPOSE 8000

# Run Django with Gunicorn
CMD if [ "$APP_ENV" = "development" ]; \
    then python manage.py runserver 0.0.0.0:${PORT:-8000}; \
    else gunicorn backend.wsgi:application --bind 0.0.0.0:${PORT:-8000}; \
    fi

