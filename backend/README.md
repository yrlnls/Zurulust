# Flask Backend for Travel Planning App

## Setup Instructions

### For WebContainer Environment

Since this is running in a WebContainer environment, Python is already available. Follow these steps:

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies directly (no virtual environment needed):**
   ```bash
   python -m pip install --user flask flask-sqlalchemy flask-cors flask-jwt-extended python-dotenv
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Initialize the database and start the server:**
   ```bash
   python run.py
   ```

### For Local Development Environment

If you're running this locally (outside WebContainer):

1. **Create and activate virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Run the application:**
   ```bash
   python run.py
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Destinations
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/search?q=query` - Search destinations
- `GET /api/destinations/<id>` - Get destination details

### Trips
- `GET /api/trips` - Get user trips (requires auth)
- `POST /api/trips` - Create new trip (requires auth)
- `GET /api/trips/<id>` - Get trip details (requires auth)
- `PUT /api/trips/<id>` - Update trip (requires auth)
- `DELETE /api/trips/<id>` - Delete trip (requires auth)

### Activities
- `GET /api/destinations/<id>/activities` - Get activities for destination

## Database

The application uses SQLite database (`travel_app.db`) which is automatically created when you first run the application.

## Environment Variables

Create a `.env` file based on `.env.example`:

```
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
DATABASE_URL=sqlite:///travel_app.db
```

## Testing the API

You can test the API endpoints using curl or any API testing tool:

```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "password": "password123"}'

# Get destinations
curl http://localhost:5000/api/destinations

# Search destinations
curl "http://localhost:5000/api/destinations/search?q=paris"
```