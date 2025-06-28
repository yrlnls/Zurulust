import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///travel_app.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # API Keys
    GOOGLE_MAPS_API_KEY = os.environ.get('GOOGLE_MAPS_API_KEY') or 'your-google-maps-api-key'
    OPENWEATHER_API_KEY = os.environ.get('OPENWEATHER_API_KEY') or 'your-openweather-api-key'
    
    # CORS settings
    CORS_ORIGINS = ['http://localhost:5173', 'http://127.0.0.1:5173']