from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
import requests

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-change-this')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///travel_app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-string')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    avatar = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    trips = db.relationship('Trip', backref='user', lazy=True, cascade='all, delete-orphan')
    preferences = db.relationship('UserPreference', backref='user', uselist=False, cascade='all, delete-orphan')
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'avatar': self.avatar,
            'created_at': self.created_at.isoformat(),
            'preferences': self.preferences.to_dict() if self.preferences else None
        }

class UserPreference(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    budget = db.Column(db.String(20), default='moderate')
    interests = db.Column(db.Text)  # JSON string
    travel_style = db.Column(db.Text)  # JSON string
    
    def to_dict(self):
        import json
        return {
            'budget': self.budget,
            'interests': json.loads(self.interests) if self.interests else [],
            'travel_style': json.loads(self.travel_style) if self.travel_style else []
        }

class Trip(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
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

class Destination(db.Model):
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
    
    def to_dict(self):
        import json
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
            'created_at': self.created_at.isoformat()
        }

class TripDestination(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.Integer, db.ForeignKey('trip.id'), nullable=False)
    destination_id = db.Column(db.Integer, db.ForeignKey('destination.id'), nullable=False)
    order = db.Column(db.Integer, default=0)
    
    # Relationship
    destination = db.relationship('Destination', backref='trip_destinations')
    
    def to_dict(self):
        return {
            'id': self.id,
            'order': self.order,
            'destination': self.destination.to_dict()
        }

class ItineraryDay(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.Integer, db.ForeignKey('trip.id'), nullable=False)
    day_number = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Date, nullable=False)
    
    # Relationships
    activities = db.relationship('ItineraryActivity', backref='day', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'day_number': self.day_number,
            'date': self.date.isoformat(),
            'activities': [activity.to_dict() for activity in self.activities]
        }

class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    destination_id = db.Column(db.Integer, db.ForeignKey('destination.id'), nullable=False)
    duration = db.Column(db.Integer)  # in hours
    price = db.Column(db.Float, default=0.0)
    rating = db.Column(db.Float, default=0.0)
    categories = db.Column(db.Text)  # JSON string
    image_url = db.Column(db.String(500))
    
    # Relationship
    destination = db.relationship('Destination', backref='activities')
    
    def to_dict(self):
        import json
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'destination_id': self.destination_id,
            'duration': self.duration,
            'price': self.price,
            'rating': self.rating,
            'categories': json.loads(self.categories) if self.categories else [],
            'image_url': self.image_url
        }

class ItineraryActivity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    day_id = db.Column(db.Integer, db.ForeignKey('itinerary_day.id'), nullable=False)
    activity_id = db.Column(db.Integer, db.ForeignKey('activity.id'), nullable=False)
    start_time = db.Column(db.Time)
    order = db.Column(db.Integer, default=0)
    
    # Relationship
    activity = db.relationship('Activity', backref='itinerary_activities')
    
    def to_dict(self):
        return {
            'id': self.id,
            'start_time': self.start_time.isoformat() if self.start_time else None,
            'order': self.order,
            'activity': self.activity.to_dict()
        }

# API Routes

@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Validate input
        if not data.get('name') or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Name, email, and password are required'}), 400
        
        # Check if user already exists
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already registered'}), 400
        
        # Create new user
        user = User(
            name=data['name'],
            email=data['email']
        )
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        # Create access token
        access_token = create_access_token(identity=user.id)
        
        return jsonify({
            'access_token': access_token,
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password are required'}), 400
        
        user = User.query.filter_by(email=data['email']).first()
        
        if user and user.check_password(data['password']):
            access_token = create_access_token(identity=user.id)
            return jsonify({
                'access_token': access_token,
                'user': user.to_dict()
            })
        else:
            return jsonify({'error': 'Invalid email or password'}), 401
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/me', methods=['GET'])
@jwt_required()
def get_current_user():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({'user': user.to_dict()})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/destinations/search', methods=['GET'])
def search_destinations():
    try:
        query = request.args.get('q', '')
        
        if len(query) < 2:
            return jsonify({'destinations': []})
        
        # Search in database first
        destinations = Destination.query.filter(
            db.or_(
                Destination.name.ilike(f'%{query}%'),
                Destination.country.ilike(f'%{query}%'),
                Destination.state.ilike(f'%{query}%')
            )
        ).limit(10).all()
        
        # If no results in database, you could integrate with external APIs here
        # For now, return database results
        
        return jsonify({
            'destinations': [dest.to_dict() for dest in destinations]
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/destinations', methods=['GET'])
def get_destinations():
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        category = request.args.get('category')
        price_level = request.args.get('price_level')
        
        query = Destination.query
        
        if category:
            query = query.filter(Destination.categories.like(f'%{category}%'))
        
        if price_level:
            query = query.filter(Destination.price_level == price_level)
        
        destinations = query.paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return jsonify({
            'destinations': [dest.to_dict() for dest in destinations.items],
            'total': destinations.total,
            'pages': destinations.pages,
            'current_page': page
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/destinations/<int:destination_id>', methods=['GET'])
def get_destination(destination_id):
    try:
        destination = Destination.query.get_or_404(destination_id)
        return jsonify({'destination': destination.to_dict()})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/destinations/<int:destination_id>/activities', methods=['GET'])
def get_destination_activities(destination_id):
    try:
        activities = Activity.query.filter_by(destination_id=destination_id).all()
        return jsonify({
            'activities': [activity.to_dict() for activity in activities]
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/trips', methods=['GET'])
@jwt_required()
def get_trips():
    try:
        user_id = get_jwt_identity()
        trips = Trip.query.filter_by(user_id=user_id).order_by(Trip.created_at.desc()).all()
        
        return jsonify({
            'trips': [trip.to_dict() for trip in trips]
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/trips', methods=['POST'])
@jwt_required()
def create_trip():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        if not data.get('name') or not data.get('start_date') or not data.get('end_date'):
            return jsonify({'error': 'Name, start_date, and end_date are required'}), 400
        
        trip = Trip(
            user_id=user_id,
            name=data['name'],
            start_date=datetime.fromisoformat(data['start_date']).date(),
            end_date=datetime.fromisoformat(data['end_date']).date(),
            status=data.get('status', 'planning'),
            is_public=data.get('is_public', False)
        )
        
        db.session.add(trip)
        db.session.commit()
        
        return jsonify({'trip': trip.to_dict()}), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/trips/<int:trip_id>', methods=['GET'])
@jwt_required()
def get_trip(trip_id):
    try:
        user_id = get_jwt_identity()
        trip = Trip.query.filter_by(id=trip_id, user_id=user_id).first_or_404()
        
        return jsonify({'trip': trip.to_dict()})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/trips/<int:trip_id>', methods=['PUT'])
@jwt_required()
def update_trip(trip_id):
    try:
        user_id = get_jwt_identity()
        trip = Trip.query.filter_by(id=trip_id, user_id=user_id).first_or_404()
        data = request.get_json()
        
        if 'name' in data:
            trip.name = data['name']
        if 'start_date' in data:
            trip.start_date = datetime.fromisoformat(data['start_date']).date()
        if 'end_date' in data:
            trip.end_date = datetime.fromisoformat(data['end_date']).date()
        if 'status' in data:
            trip.status = data['status']
        if 'is_public' in data:
            trip.is_public = data['is_public']
        
        trip.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({'trip': trip.to_dict()})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/trips/<int:trip_id>', methods=['DELETE'])
@jwt_required()
def delete_trip(trip_id):
    try:
        user_id = get_jwt_identity()
        trip = Trip.query.filter_by(id=trip_id, user_id=user_id).first_or_404()
        
        db.session.delete(trip)
        db.session.commit()
        
        return jsonify({'message': 'Trip deleted successfully'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/trips/<int:trip_id>/destinations', methods=['POST'])
@jwt_required()
def add_destination_to_trip(trip_id):
    try:
        user_id = get_jwt_identity()
        trip = Trip.query.filter_by(id=trip_id, user_id=user_id).first_or_404()
        data = request.get_json()
        
        destination_id = data.get('destination_id')
        if not destination_id:
            return jsonify({'error': 'destination_id is required'}), 400
        
        # Check if destination exists
        destination = Destination.query.get_or_404(destination_id)
        
        # Check if destination is already in trip
        existing = TripDestination.query.filter_by(
            trip_id=trip_id, destination_id=destination_id
        ).first()
        
        if existing:
            return jsonify({'error': 'Destination already in trip'}), 400
        
        # Add destination to trip
        trip_destination = TripDestination(
            trip_id=trip_id,
            destination_id=destination_id,
            order=len(trip.destinations)
        )
        
        db.session.add(trip_destination)
        db.session.commit()
        
        return jsonify({'trip_destination': trip_destination.to_dict()}), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/trips/<int:trip_id>/destinations/<int:destination_id>', methods=['DELETE'])
@jwt_required()
def remove_destination_from_trip(trip_id, destination_id):
    try:
        user_id = get_jwt_identity()
        trip = Trip.query.filter_by(id=trip_id, user_id=user_id).first_or_404()
        
        trip_destination = TripDestination.query.filter_by(
            trip_id=trip_id, destination_id=destination_id
        ).first_or_404()
        
        db.session.delete(trip_destination)
        db.session.commit()
        
        return jsonify({'message': 'Destination removed from trip'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Initialize database
@app.before_first_request
def create_tables():
    db.create_all()
    
    # Add sample data if database is empty
    if Destination.query.count() == 0:
        sample_destinations = [
            {
                'name': 'Paris',
                'country': 'France',
                'state': 'Île-de-France',
                'latitude': 48.8566,
                'longitude': 2.3522,
                'image_url': 'https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg',
                'description': 'The City of Light, famous for its art, fashion, and culture',
                'rating': 4.8,
                'price_level': 'luxury',
                'categories': '["culture", "urban", "history"]'
            },
            {
                'name': 'Tokyo',
                'country': 'Japan',
                'state': 'Tokyo',
                'latitude': 35.6762,
                'longitude': 139.6503,
                'image_url': 'https://images.pexels.com/photos/736402/pexels-photo-736402.jpeg',
                'description': 'A vibrant metropolis blending traditional and modern culture',
                'rating': 4.7,
                'price_level': 'moderate',
                'categories': '["urban", "culture", "adventure"]'
            },
            {
                'name': 'Bali',
                'country': 'Indonesia',
                'state': 'Bali',
                'latitude': -8.3405,
                'longitude': 115.0920,
                'image_url': 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
                'description': 'Tropical paradise with beautiful beaches and rich culture',
                'rating': 4.6,
                'price_level': 'budget',
                'categories': '["nature", "relaxation", "culture"]'
            },
            {
                'name': 'New York City',
                'country': 'United States',
                'state': 'New York',
                'latitude': 40.7128,
                'longitude': -74.0060,
                'image_url': 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg',
                'description': 'The Big Apple - iconic skyline, Broadway, and endless attractions',
                'rating': 4.5,
                'price_level': 'luxury',
                'categories': '["urban", "culture", "adventure"]'
            }
        ]
        
        for dest_data in sample_destinations:
            destination = Destination(**dest_data)
            db.session.add(destination)
        
        db.session.commit()

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)