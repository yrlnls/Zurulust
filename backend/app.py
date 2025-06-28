from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, User, Trip, Destination
from config import Config
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