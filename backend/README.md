# Travel App Backend

This is the Flask backend for the Travel App.

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

3. Run the application:
   ```bash
   python run.py
   ```

The server will start on http://localhost:5000

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/users` - Get all users
- `GET /api/trips` - Get all trips
- `GET /api/destinations` - Get all destinations