import requests
from flask import current_app
import logging

logger = logging.getLogger(__name__)

class GoogleMapsService:
    def __init__(self):
        self.api_key = current_app.config.get('GOOGLE_MAPS_API_KEY')
        self.base_url = 'https://maps.googleapis.com/maps/api'
    
    def search_places(self, query, location=None, radius=50000):
        """Search for places using Google Places API Text Search"""
        if not self.api_key or self.api_key == 'your-google-maps-api-key':
            logger.warning('Google Maps API key not configured')
            return self._get_mock_places(query)
        
        url = f"{self.base_url}/place/textsearch/json"
        params = {
            'query': query,
            'key': self.api_key,
            'type': 'tourist_attraction|locality|country'
        }
        
        if location:
            params['location'] = f"{location['lat']},{location['lng']}"
            params['radius'] = radius
        
        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            if data['status'] == 'OK':
                return self._format_places_response(data['results'])
            else:
                logger.error(f"Google Places API error: {data.get('status')}")
                return self._get_mock_places(query)
                
        except requests.RequestException as e:
            logger.error(f"Error calling Google Places API: {e}")
            return self._get_mock_places(query)
    
    def get_place_details(self, place_id):
        """Get detailed information about a specific place"""
        if not self.api_key or self.api_key == 'your-google-maps-api-key':
            return self._get_mock_place_details(place_id)
        
        url = f"{self.base_url}/place/details/json"
        params = {
            'place_id': place_id,
            'key': self.api_key,
            'fields': 'name,formatted_address,geometry,photos,rating,reviews,types,website,international_phone_number'
        }
        
        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            if data['status'] == 'OK':
                return self._format_place_details(data['result'])
            else:
                logger.error(f"Google Place Details API error: {data.get('status')}")
                return None
                
        except requests.RequestException as e:
            logger.error(f"Error calling Google Place Details API: {e}")
            return None
    
    def get_nearby_places(self, lat, lng, place_type='tourist_attraction', radius=5000):
        """Find nearby places of interest"""
        if not self.api_key or self.api_key == 'your-google-maps-api-key':
            return self._get_mock_nearby_places()
        
        url = f"{self.base_url}/place/nearbysearch/json"
        params = {
            'location': f"{lat},{lng}",
            'radius': radius,
            'type': place_type,
            'key': self.api_key
        }
        
        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            if data['status'] == 'OK':
                return self._format_places_response(data['results'])
            else:
                logger.error(f"Google Nearby Search API error: {data.get('status')}")
                return self._get_mock_nearby_places()
                
        except requests.RequestException as e:
            logger.error(f"Error calling Google Nearby Search API: {e}")
            return self._get_mock_nearby_places()
    
    def geocode_address(self, address):
        """Convert address to coordinates"""
        if not self.api_key or self.api_key == 'your-google-maps-api-key':
            return self._get_mock_geocode(address)
        
        url = f"{self.base_url}/geocode/json"
        params = {
            'address': address,
            'key': self.api_key
        }
        
        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            if data['status'] == 'OK' and data['results']:
                result = data['results'][0]
                return {
                    'lat': result['geometry']['location']['lat'],
                    'lng': result['geometry']['location']['lng'],
                    'formatted_address': result['formatted_address'],
                    'place_id': result['place_id']
                }
            else:
                logger.error(f"Geocoding API error: {data.get('status')}")
                return None
                
        except requests.RequestException as e:
            logger.error(f"Error calling Geocoding API: {e}")
            return None
    
    def get_photo_url(self, photo_reference, max_width=400):
        """Get URL for a place photo"""
        if not self.api_key or self.api_key == 'your-google-maps-api-key':
            return None
        
        return f"{self.base_url}/place/photo?maxwidth={max_width}&photoreference={photo_reference}&key={self.api_key}"
    
    def _format_places_response(self, places):
        """Format Google Places API response"""
        formatted_places = []
        
        for place in places:
            photo_url = None
            if place.get('photos'):
                photo_url = self.get_photo_url(place['photos'][0]['photo_reference'])
            
            formatted_place = {
                'id': place['place_id'],
                'name': place['name'],
                'formatted_address': place.get('formatted_address', ''),
                'coordinates': {
                    'lat': place['geometry']['location']['lat'],
                    'lng': place['geometry']['location']['lng']
                },
                'rating': place.get('rating'),
                'types': place.get('types', []),
                'photo_url': photo_url,
                'price_level': place.get('price_level')
            }
            formatted_places.append(formatted_place)
        
        return formatted_places
    
    def _format_place_details(self, place):
        """Format Google Place Details API response"""
        photo_urls = []
        if place.get('photos'):
            photo_urls = [
                self.get_photo_url(photo['photo_reference']) 
                for photo in place['photos'][:5]  # Limit to 5 photos
            ]
        
        return {
            'id': place.get('place_id'),
            'name': place.get('name'),
            'formatted_address': place.get('formatted_address'),
            'coordinates': {
                'lat': place['geometry']['location']['lat'],
                'lng': place['geometry']['location']['lng']
            } if place.get('geometry') else None,
            'rating': place.get('rating'),
            'types': place.get('types', []),
            'website': place.get('website'),
            'phone': place.get('international_phone_number'),
            'photo_urls': photo_urls,
            'reviews': place.get('reviews', [])[:3]  # Limit to 3 reviews
        }
    
    def _get_mock_places(self, query):
        """Mock data when API key is not configured"""
        mock_places = [
            {
                'id': f'mock-{query.lower().replace(" ", "-")}-1',
                'name': f'{query} City Center',
                'formatted_address': f'{query}, Country',
                'coordinates': {'lat': 40.7128, 'lng': -74.0060},
                'rating': 4.5,
                'types': ['locality', 'political'],
                'photo_url': 'https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg',
                'price_level': 2
            },
            {
                'id': f'mock-{query.lower().replace(" ", "-")}-2',
                'name': f'{query} Historic District',
                'formatted_address': f'Historic {query}, Country',
                'coordinates': {'lat': 40.7589, 'lng': -73.9851},
                'rating': 4.3,
                'types': ['tourist_attraction', 'establishment'],
                'photo_url': 'https://images.pexels.com/photos/736402/pexels-photo-736402.jpeg',
                'price_level': 3
            }
        ]
        return mock_places
    
    def _get_mock_place_details(self, place_id):
        """Mock place details when API key is not configured"""
        return {
            'id': place_id,
            'name': 'Sample Destination',
            'formatted_address': 'Sample Address, Country',
            'coordinates': {'lat': 40.7128, 'lng': -74.0060},
            'rating': 4.5,
            'types': ['tourist_attraction'],
            'website': 'https://example.com',
            'phone': '+1-555-0123',
            'photo_urls': [
                'https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg',
                'https://images.pexels.com/photos/736402/pexels-photo-736402.jpeg'
            ],
            'reviews': [
                {'author_name': 'John Doe', 'rating': 5, 'text': 'Amazing place!'},
                {'author_name': 'Jane Smith', 'rating': 4, 'text': 'Great experience.'}
            ]
        }
    
    def _get_mock_nearby_places(self):
        """Mock nearby places when API key is not configured"""
        return [
            {
                'id': 'mock-nearby-1',
                'name': 'Local Museum',
                'formatted_address': 'Museum District',
                'coordinates': {'lat': 40.7614, 'lng': -73.9776},
                'rating': 4.4,
                'types': ['museum', 'tourist_attraction'],
                'photo_url': 'https://images.pexels.com/photos/2675266/pexels-photo-2675266.jpeg',
                'price_level': 2
            },
            {
                'id': 'mock-nearby-2',
                'name': 'Central Park',
                'formatted_address': 'Park Area',
                'coordinates': {'lat': 40.7829, 'lng': -73.9654},
                'rating': 4.6,
                'types': ['park', 'tourist_attraction'],
                'photo_url': 'https://images.pexels.com/photos/390051/surfer-wave-sunset-the-indian-ocean-390051.jpeg',
                'price_level': 0
            }
        ]
    
    def _get_mock_geocode(self, address):
        """Mock geocoding when API key is not configured"""
        return {
            'lat': 40.7128,
            'lng': -74.0060,
            'formatted_address': f'{address}, Mock Location',
            'place_id': f'mock-place-{address.lower().replace(" ", "-")}'
        }