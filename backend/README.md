# Travel App Backend

This is the Flask backend for the Travel App with Google Maps API integration.

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

3. Get your Google Maps API key:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the following APIs:
     - Places API
     - Geocoding API
     - Maps JavaScript API
   - Create credentials (API Key)
   - Add your API key to the `.env` file

4. Update your `.env` file:
   ```
   GOOGLE_MAPS_API_KEY=your-actual-google-maps-api-key
   OPENWEATHER_API_KEY=your-openweather-api-key (optional)
   ```

5. Run the application:
   ```bash
   python run.py
   ```

The server will start on http://localhost:5000

## API Endpoints

### Core Endpoints
- `GET /api/health` - Health check
- `GET /api/users` - Get all users
- `GET /api/trips` - Get all trips
- `GET /api/destinations` - Get all destinations

### Google Maps Integration
- `GET /api/search/destinations?q=<query>` - Search for destinations
- `GET /api/places/<place_id>` - Get detailed place information
- `GET /api/places/nearby?lat=<lat>&lng=<lng>&type=<type>&radius=<radius>` - Get nearby places
- `GET /api/geocode?address=<address>` - Convert address to coordinates

## Google Maps API Features

The backend integrates with Google Maps APIs to provide:

1. **Place Search**: Search for destinations worldwide
2. **Place Details**: Get detailed information about specific places
3. **Nearby Search**: Find attractions, restaurants, hotels near a location
4. **Geocoding**: Convert addresses to coordinates
5. **Place Photos**: Access high-quality photos of places

## API Key Configuration

Make sure to:
1. Restrict your API key to your domain in production
2. Enable only the APIs you need
3. Set up billing alerts in Google Cloud Console
4. Monitor your API usage

## Fallback Behavior

If the Google Maps API key is not configured or API calls fail, the backend will return mock data to ensure the frontend continues to work during development.