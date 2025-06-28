import googlemaps
import requests
from typing import List, Dict, Optional
from config import Config

class GoogleMapsService:
    def __init__(self):
        self.api_key = Config.GOOGLE_MAPS_API_KEY
        self.client = googlemaps.Client(key=self.api_key) if self.api_key else None
        
    def search_destinations(self, query: str, limit: int = 20) -> List[Dict]:
        """Search for destinations using Google Places API"""
        if not self.client:
            return self._get_mock_destinations(query)
            
        try:
            # Use text search to find destinations
            places_result = self.client.places(
                query=query,
                type='tourist_attraction|locality|country'
            )
            
            destinations = []
            for place in places_result.get('results', [])[:limit]:
                destination = self._format_place_to_destination(place)
                if destination:
                    destinations.append(destination)
                    
            return destinations
            
        except Exception as e:
            print(f"Error searching destinations: {e}")
            return self._get_mock_destinations(query)
    
    def get_place_details(self, place_id: str) -> Optional[Dict]:
        """Get detailed information about a specific place"""
        if not self.client:
            return self._get_mock_place_details(place_id)
            
        try:
            place_details = self.client.place(
                place_id=place_id,
                fields=['name', 'formatted_address', 'geometry', 'photos', 
                       'rating', 'reviews', 'types', 'website', 'formatted_phone_number']
            )
            
            return self._format_place_details(place_details.get('result', {}))
            
        except Exception as e:
            print(f"Error getting place details: {e}")
            return self._get_mock_place_details(place_id)
    
    def find_nearby_places(self, lat: float, lng: float, place_type: str = 'tourist_attraction', radius: int = 5000) -> List[Dict]:
        """Find nearby places of interest"""
        if not self.client:
            return self._get_mock_nearby_places()
            
        try:
            nearby_result = self.client.places_nearby(
                location=(lat, lng),
                radius=radius,
                type=place_type
            )
            
            places = []
            for place in nearby_result.get('results', []):
                formatted_place = self._format_nearby_place(place)
                if formatted_place:
                    places.append(formatted_place)
                    
            return places
            
        except Exception as e:
            print(f"Error finding nearby places: {e}")
            return self._get_mock_nearby_places()
    
    def geocode_address(self, address: str) -> Optional[Dict]:
        """Convert address to coordinates"""
        if not self.client:
            return self._get_mock_geocode()
            
        try:
            geocode_result = self.client.geocode(address)
            if geocode_result:
                location = geocode_result[0]['geometry']['location']
                return {
                    'lat': location['lat'],
                    'lng': location['lng'],
                    'formatted_address': geocode_result[0]['formatted_address']
                }
            return None
            
        except Exception as e:
            print(f"Error geocoding address: {e}")
            return self._get_mock_geocode()
    
    def _format_place_to_destination(self, place: Dict) -> Optional[Dict]:
        """Format Google Places result to destination format"""
        try:
            photos = place.get('photos', [])
            photo_url = None
            if photos and self.api_key:
                photo_reference = photos[0].get('photo_reference')
                if photo_reference:
                    photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_reference}&key={self.api_key}"
            
            # Fallback to Pexels images if no Google photo
            if not photo_url:
                photo_url = "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=400"
            
            return {
                'id': place.get('place_id'),
                'name': place.get('name'),
                'country': self._extract_country(place.get('formatted_address', '')),
                'imageUrl': photo_url,
                'rating': place.get('rating', 4.5),
                'priceLevel': self._map_price_level(place.get('price_level', 2)),
                'description': f"Discover the beauty and culture of {place.get('name')}",
                'categories': self._extract_categories(place.get('types', [])),
                'location': {
                    'lat': place['geometry']['location']['lat'],
                    'lng': place['geometry']['location']['lng']
                }
            }
        except Exception as e:
            print(f"Error formatting place: {e}")
            return None
    
    def _format_place_details(self, place: Dict) -> Dict:
        """Format detailed place information"""
        photos = place.get('photos', [])
        photo_urls = []
        if photos and self.api_key:
            for photo in photos[:5]:  # Get up to 5 photos
                photo_reference = photo.get('photo_reference')
                if photo_reference:
                    photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference={photo_reference}&key={self.api_key}"
                    photo_urls.append(photo_url)
        
        return {
            'id': place.get('place_id'),
            'name': place.get('name'),
            'address': place.get('formatted_address'),
            'rating': place.get('rating'),
            'photos': photo_urls,
            'website': place.get('website'),
            'phone': place.get('formatted_phone_number'),
            'reviews': place.get('reviews', [])[:3],  # Get top 3 reviews
            'types': place.get('types', []),
            'location': {
                'lat': place['geometry']['location']['lat'],
                'lng': place['geometry']['location']['lng']
            } if place.get('geometry') else None
        }
    
    def _format_nearby_place(self, place: Dict) -> Optional[Dict]:
        """Format nearby place information"""
        try:
            return {
                'id': place.get('place_id'),
                'name': place.get('name'),
                'rating': place.get('rating', 4.0),
                'types': place.get('types', []),
                'vicinity': place.get('vicinity'),
                'priceLevel': self._map_price_level(place.get('price_level', 2)),
                'location': {
                    'lat': place['geometry']['location']['lat'],
                    'lng': place['geometry']['location']['lng']
                }
            }
        except Exception as e:
            print(f"Error formatting nearby place: {e}")
            return None
    
    def _extract_country(self, address: str) -> str:
        """Extract country from formatted address"""
        if not address:
            return "Unknown"
        parts = address.split(', ')
        return parts[-1] if parts else "Unknown"
    
    def _map_price_level(self, price_level: Optional[int]) -> str:
        """Map Google's price level to our format"""
        mapping = {
            0: 'budget',
            1: 'budget',
            2: 'moderate',
            3: 'luxury',
            4: 'luxury'
        }
        return mapping.get(price_level, 'moderate')
    
    def _extract_categories(self, types: List[str]) -> List[str]:
        """Extract relevant categories from Google place types"""
        category_mapping = {
            'tourist_attraction': 'culture',
            'natural_feature': 'nature',
            'park': 'nature',
            'museum': 'culture',
            'amusement_park': 'adventure',
            'zoo': 'adventure',
            'beach': 'relaxation',
            'spa': 'relaxation',
            'shopping_mall': 'urban',
            'restaurant': 'urban',
            'locality': 'urban',
            'administrative_area_level_1': 'urban'
        }
        
        categories = []
        for place_type in types:
            if place_type in category_mapping:
                category = category_mapping[place_type]
                if category not in categories:
                    categories.append(category)
        
        return categories if categories else ['culture']
    
    # Mock data methods for when API key is not available
    def _get_mock_destinations(self, query: str) -> List[Dict]:
        """Return mock destinations when API is not available"""
        mock_destinations = [
            {
                'id': 'mock-bali',
                'name': 'Bali',
                'country': 'Indonesia',
                'imageUrl': 'https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg',
                'rating': 4.8,
                'priceLevel': 'moderate',
                'description': 'Experience the beautiful beaches and vibrant culture of Bali.',
                'categories': ['relaxation', 'culture'],
                'location': {'lat': -8.3405, 'lng': 115.0920}
            },
            {
                'id': 'mock-paris',
                'name': 'Paris',
                'country': 'France',
                'imageUrl': 'https://images.pexels.com/photos/736402/pexels-photo-736402.jpeg',
                'rating': 4.7,
                'priceLevel': 'luxury',
                'description': 'Discover the art, fashion, and gastronomy of Paris.',
                'categories': ['culture', 'urban'],
                'location': {'lat': 48.8566, 'lng': 2.3522}
            }
        ]
        
        # Filter based on query
        if query:
            query_lower = query.lower()
            return [dest for dest in mock_destinations if query_lower in dest['name'].lower() or query_lower in dest['country'].lower()]
        
        return mock_destinations
    
    def _get_mock_place_details(self, place_id: str) -> Dict:
        """Return mock place details"""
        return {
            'id': place_id,
            'name': 'Sample Destination',
            'address': '123 Sample Street, Sample City, Sample Country',
            'rating': 4.5,
            'photos': ['https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg'],
            'website': 'https://example.com',
            'phone': '+1-234-567-8900',
            'reviews': [],
            'types': ['tourist_attraction'],
            'location': {'lat': 0.0, 'lng': 0.0}
        }
    
    def _get_mock_nearby_places(self) -> List[Dict]:
        """Return mock nearby places"""
        return [
            {
                'id': 'mock-nearby-1',
                'name': 'Sample Restaurant',
                'rating': 4.3,
                'types': ['restaurant'],
                'vicinity': 'Sample Area',
                'priceLevel': 'moderate',
                'location': {'lat': 0.0, 'lng': 0.0}
            }
        ]
    
    def _get_mock_geocode(self) -> Dict:
        """Return mock geocoding result"""
        return {
            'lat': 0.0,
            'lng': 0.0,
            'formatted_address': 'Sample Address'
        }