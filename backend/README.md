# Travel Planning App - Flask Backend

A RESTful API backend for the travel planning application built with Flask.

## Features

- User authentication with JWT tokens
- Destination search and management
- Trip planning and itinerary management
- Activity recommendations
- SQLite database with SQLAlchemy ORM
- CORS support for frontend integration

## Setup

### Prerequisites

- Python 3.8+
- pip

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Initialize the database:
```bash
python run.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Destinations

- `GET /api/destinations` - Get all destinations (with pagination)
- `GET /api/destinations/search?q=query` - Search destinations
- `GET /api/destinations/<id>` - Get destination details
- `GET /api/destinations/<id>/activities` - Get destination activities

### Trips

- `GET /api/trips` - Get user's trips (requires auth)
- `POST /api/trips` - Create new trip (requires auth)
- `GET /api/trips/<id>` - Get trip details (requires auth)
- `PUT /api/trips/<id>` - Update trip (requires auth)
- `DELETE /api/trips/<id>` - Delete trip (requires auth)
- `POST /api/trips/<id>/destinations` - Add destination to trip (requires auth)
- `DELETE /api/trips/<id>/destinations/<dest_id>` - Remove destination from trip (requires auth)

## Database Schema

The application uses SQLite with the following main tables:

- `users` - User accounts
- `user_preferences` - User travel preferences
- `destinations` - Travel destinations
- `trips` - User trip plans
- `trip_destinations` - Many-to-many relationship between trips and destinations
- `activities` - Activities available at destinations
- `itinerary_days` - Daily itinerary for trips
- `itinerary_activities` - Activities scheduled for specific days

## Configuration

Environment variables (create `.env` file):

```
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret
DATABASE_URL=sqlite:///travel_app.db

# Optional external API keys
OPENCAGE_API_KEY=your-opencage-key
OPENWEATHER_API_KEY=your-openweather-key
FOURSQUARE_API_KEY=your-foursquare-key
```

## Development

To run in development mode:

```bash
python run.py
```

The API will be available at `http://localhost:5000` with debug mode enabled.

## Frontend Integration

The backend is configured with CORS to allow requests from the frontend running on `http://localhost:5173`.

Update your frontend API calls to use `http://localhost:5000/api` as the base URL.

## Sample Data

The application automatically creates sample destinations when the database is first initialized:

- Paris, France
- Tokyo, Japan
- Bali, Indonesia
- New York City, USA

## Error Handling

The API returns JSON error responses with appropriate HTTP status codes:

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `404` - Not Found
- `500` - Internal Server Error

## Security

- Passwords are hashed using Werkzeug's security utilities
- JWT tokens are used for authentication
- CORS is configured for frontend integration
- SQL injection protection through SQLAlchemy ORM