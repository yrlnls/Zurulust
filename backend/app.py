from flask import Flask, jsonify, request
from flask_cors import CORS
from config import Config
from services.google_maps import GoogleMapsService

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Initialize services
google_maps_service = GoogleMapsService()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Wanderlust API is running',
        'google_maps_enabled': bool(Config.GOOGLE_MAPS_API_KEY)
    })

@app.route('/api/search/destinations', methods=['GET'])
def search_destinations():
    """Search for destinations"""
    query = request.args.get('q', '')
    limit = int(request.args.get('limit', 20))
    
    if not query:
        return jsonify({'error': 'Query parameter is required'}), 400
    
    try:
        destinations = google_maps_service.search_destinations(query, limit)
        return jsonify({
            'destinations': destinations,
            'total': len(destinations)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/places/<place_id>', methods=['GET'])
def get_place_details(place_id):
    """Get detailed information about a specific place"""
    try:
        place_details = google_maps_service.get_place_details(place_id)
        if place_details:
            return jsonify(place_details)
        else:
            return jsonify({'error': 'Place not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/places/nearby', methods=['GET'])
def get_nearby_places():
    """Find nearby places of interest"""
    try:
        lat = float(request.args.get('lat'))
        lng = float(request.args.get('lng'))
        place_type = request.args.get('type', 'tourist_attraction')
        radius = int(request.args.get('radius', 5000))
        
        nearby_places = google_maps_service.find_nearby_places(lat, lng, place_type, radius)
        return jsonify({
            'places': nearby_places,
            'total': len(nearby_places)
        })
    except (TypeError, ValueError):
        return jsonify({'error': 'Invalid latitude or longitude'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/geocode', methods=['GET'])
def geocode_address():
    """Convert address to coordinates"""
    address = request.args.get('address', '')
    
    if not address:
        return jsonify({'error': 'Address parameter is required'}), 400
    
    try:
        result = google_maps_service.geocode_address(address)
        if result:
            return jsonify(result)
        else:
            return jsonify({'error': 'Address not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/destinations', methods=['GET'])
def get_destinations():
    """Get popular destinations (fallback endpoint)"""
    try:
        # Return popular destinations
        destinations = google_maps_service.search_destinations('popular tourist destinations', 10)
        return jsonify({
            'destinations': destinations,
            'total': len(destinations)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=Config.DEBUG, host='0.0.0.0', port=5000)