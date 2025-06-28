from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, User, Trip, Destination
from config import Config
from services.google_maps import GoogleMapsService
import os

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
CORS(app)

# Create tables
with app.app_context():
    db.create_all()

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Backend server is running'})

@app.route('/api/search/destinations', methods=['GET'])
def search_destinations():
    """Search for destinations using Google Maps API"""
    query = request.args.get('q', '')
    if not query:
        return jsonify({'error': 'Query parameter is required'}), 400
    
    try:
        maps_service = GoogleMapsService()
        results = maps_service.search_places(query)
        
        return jsonify({
            'results': results,
            'total': len(results)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/places/<place_id>', methods=['GET'])
def get_place_details(place_id):
    """Get detailed information about a specific place"""
    try:
        maps_service = GoogleMapsService()
        place_details = maps_service.get_place_details(place_id)
        
        if place_details:
            return jsonify(place_details)
        else:
            return jsonify({'error': 'Place not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/places/nearby', methods=['GET'])
def get_nearby_places():
    """Get nearby places of interest"""
    lat = request.args.get('lat', type=float)
    lng = request.args.get('lng', type=float)
    place_type = request.args.get('type', 'tourist_attraction')
    radius = request.args.get('radius', 5000, type=int)
    
    if lat is None or lng is None:
        return jsonify({'error': 'Latitude and longitude are required'}), 400
    
    try:
        maps_service = GoogleMapsService()
        results = maps_service.get_nearby_places(lat, lng, place_type, radius)
        
        return jsonify({
            'results': results,
            'total': len(results)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/geocode', methods=['GET'])
def geocode_address():
    """Convert address to coordinates"""
    address = request.args.get('address', '')
    if not address:
        return jsonify({'error': 'Address parameter is required'}), 400
    
    try:
        maps_service = GoogleMapsService()
        result = maps_service.geocode_address(address)
        
        if result:
            return jsonify(result)
        else:
            return jsonify({'error': 'Address not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'created_at': user.created_at.isoformat() if user.created_at else None
    } for user in users])

@app.route('/api/trips', methods=['GET'])
def get_trips():
    trips = Trip.query.all()
    return jsonify([{
        'id': trip.id,
        'title': trip.title,
        'description': trip.description,
        'destination': trip.destination,
        'start_date': trip.start_date.isoformat() if trip.start_date else None,
        'end_date': trip.end_date.isoformat() if trip.end_date else None,
        'price': float(trip.price) if trip.price else None,
        'user_id': trip.user_id
    } for trip in trips])

@app.route('/api/destinations', methods=['GET'])
def get_destinations():
    destinations = Destination.query.all()
    return jsonify([{
        'id': dest.id,
        'name': dest.name,
        'country': dest.country,
        'description': dest.description,
        'image_url': dest.image_url,
        'rating': float(dest.rating) if dest.rating else None
    } for dest in destinations])

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)