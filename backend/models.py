"""
Database models for the travel planning application
"""
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import json

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    avatar = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    trips = db.relationship('Trip', backref='user', lazy=True, cascade='all, delete-orphan')
    preferences = db.relationship('UserPreference', backref='user', uselist=False, cascade='all, delete-orphan')
    
    def set_password(self, password):
        """Hash and set password"""
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        """Check if provided password matches hash"""
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        """Convert user to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'avatar': self.avatar,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'preferences': self.preferences.to_dict() if self.preferences else None
        }

class UserPreference(db.Model):
    __tablename__ = 'user_preferences'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    budget = db.Column(db.String(20), default='moderate')
    interests = db.Column(db.Text)  # JSON string
    travel_style = db.Column(db.Text)  # JSON string
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Convert preferences to dictionary"""
        return {
            'budget': self.budget,
            'interests': json.loads(self.interests) if self.interests else [],
            'travel_style': json.loads(self.travel_style) if self.travel_style else []
        }

class Destination(db.Model):
    __tablename__ = 'destinations'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100))
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(500))
    description = db.Column(db.Text)
    rating = db.Column(db.Float, default=0.0)
    price_level = db.Column(db.String(20))  # budget, moderate, luxury
    categories = db.Column(db.Text)  # JSON string
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    activities = db.relationship('Activity', backref='destination', lazy=True)
    trip_destinations = db.relationship('TripDestination', backref='destination', lazy=True)
    
    def to_dict(self):
        """Convert destination to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'country': self.country,
            'state': self.state,
            'coordinates': {
                'lat': self.latitude,
                'lng': self.longitude
            },
            'image_url': self.image_url,
            'description': self.description,
            'rating': self.rating,
            'price_level': self.price_level,
            'categories': json.loads(self.categories) if self.categories else [],
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

class Trip(db.Model):
    __tablename__ = 'trips'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(20), default='planning')  # planning, confirmed, completed
    is_public = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    destinations = db.relationship('TripDestination', backref='trip', lazy=True, cascade='all, delete-orphan')
    itinerary = db.relationship('ItineraryDay', backref='trip', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        """Convert trip to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'start_date': self.start_date.isoformat(),
            'end_date': self.end_date.isoformat(),
            'status': self.status,
            'is_public': self.is_public,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'destinations': [dest.to_dict() for dest in self.destinations],
            'itinerary': [day.to_dict() for day in self.itinerary]
        }

class TripDestination(db.Model):
    __tablename__ = 'trip_destinations'
    
    id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.Integer, db.ForeignKey('trips.id'), nullable=False)
    destination_id = db.Column(db.Integer, db.ForeignKey('destinations.id'), nullable=False)
    order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        """Convert trip destination to dictionary"""
        return {
            'id': self.id,
            'order': self.order,
            'destination': self.destination.to_dict(),
            'created_at': self.created_at.isoformat()
        }

class Activity(db.Model):
    __tablename__ = 'activities'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    destination_id = db.Column(db.Integer, db.ForeignKey('destinations.id'), nullable=False)
    duration = db.Column(db.Integer)  # in hours
    price = db.Column(db.Float, default=0.0)
    rating = db.Column(db.Float, default=0.0)
    categories = db.Column(db.Text)  # JSON string
    image_url = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    itinerary_activities = db.relationship('ItineraryActivity', backref='activity', lazy=True)
    
    def to_dict(self):
        """Convert activity to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'destination_id': self.destination_id,
            'duration': self.duration,
            'price': self.price,
            'rating': self.rating,
            'categories': json.loads(self.categories) if self.categories else [],
            'image_url': self.image_url,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

class ItineraryDay(db.Model):
    __tablename__ = 'itinerary_days'
    
    id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.Integer, db.ForeignKey('trips.id'), nullable=False)
    day_number = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    activities = db.relationship('ItineraryActivity', backref='day', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        """Convert itinerary day to dictionary"""
        return {
            'id': self.id,
            'day_number': self.day_number,
            'date': self.date.isoformat(),
            'activities': [activity.to_dict() for activity in self.activities],
            'created_at': self.created_at.isoformat()
        }

class ItineraryActivity(db.Model):
    __tablename__ = 'itinerary_activities'
    
    id = db.Column(db.Integer, primary_key=True)
    day_id = db.Column(db.Integer, db.ForeignKey('itinerary_days.id'), nullable=False)
    activity_id = db.Column(db.Integer, db.ForeignKey('activities.id'), nullable=False)
    start_time = db.Column(db.Time)
    order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        """Convert itinerary activity to dictionary"""
        return {
            'id': self.id,
            'start_time': self.start_time.isoformat() if self.start_time else None,
            'order': self.order,
            'activity': self.activity.to_dict(),
            'created_at': self.created_at.isoformat()
        }