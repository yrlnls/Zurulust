// Travel API service integrations
import { destinations, searchDestinations as searchDestinationsLocal } from '../data/destinations';

const RAPIDAPI_KEY = 'your-rapidapi-key'; // Users will need to get their own key
const OPENCAGE_API_KEY = 'your-opencage-key'; // Free geocoding API key

// Enhanced search that combines local data with API results
export const searchDestinations = async (query) => {
  // First search local destinations
  const localResults = searchDestinationsLocal(query);
  
  // If we have good local results, return them
  if (localResults.length > 0) {
    return localResults;
  }
  
  // Check if API key is configured for external search
  if (!OPENCAGE_API_KEY || OPENCAGE_API_KEY === 'your-opencage-key') {
    console.warn('OpenCage API key not configured, using mock data');
    return getMockSearchResults(query);
  }

  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${OPENCAGE_API_KEY}&limit=10&no_annotations=1`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch destinations');
    }
    
    const data = await response.json();
    
    return data.results.map(result => ({
      id: `dest-${result.geometry.lat}-${result.geometry.lng}`,
      name: result.components.city || result.components.town || result.components.village || result.formatted,
      country: result.components.country,
      state: result.components.state,
      formatted: result.formatted,
      coordinates: {
        lat: result.geometry.lat,
        lng: result.geometry.lng
      },
      imageUrl: getDestinationImage(result.components.city || result.components.town || result.formatted),
      rating: (Math.random() * 2 + 3).toFixed(1), // Mock rating between 3-5
      priceLevel: ['budget', 'moderate', 'luxury'][Math.floor(Math.random() * 3)],
      description: `Discover the beauty and culture of ${result.components.city || result.formatted}`,
      categories: getRandomCategories()
    }));
  } catch (error) {
    console.error('Error searching destinations:', error);
    // Fallback to mock data if API fails
    return getMockSearchResults(query);
  }
};

// REST Countries API (Free, no key required)
export const getCountryInfo = async (countryName) => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fields=name,capital,population,region,currencies,languages,flags`
    );
    
    if (!response.ok) {
      throw new Error('Country not found');
    }
    
    const data = await response.json();
    const country = data[0];
    
    return {
      name: country.name.common,
      capital: country.capital?.[0],
      population: country.population,
      region: country.region,
      currencies: Object.values(country.currencies || {}),
      languages: Object.values(country.languages || {}),
      flag: country.flags.svg
    };
  } catch (error) {
    console.error('Error fetching country info:', error);
    return null;
  }
};

// OpenWeatherMap API (Free tier: 1,000 calls/day)
export const getWeatherInfo = async (lat, lng) => {
  const API_KEY = 'your-openweather-key'; // Users need to get their own key
  
  // Check if API key is configured
  if (!API_KEY || API_KEY === 'your-openweather-key') {
    console.warn('OpenWeatherMap API key not configured, using mock data');
    return getMockWeather();
  }
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather data not available');
    }
    
    const data = await response.json();
    
    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main.toLowerCase(),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      forecast: await getWeatherForecast(lat, lng, API_KEY)
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return getMockWeather();
  }
};

// Get 5-day weather forecast
const getWeatherForecast = async (lat, lng, apiKey) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`
    );
    
    if (!response.ok) return [];
    
    const data = await response.json();
    
    // Get daily forecasts (every 24 hours)
    const dailyForecasts = data.list.filter((_, index) => index % 8 === 0).slice(0, 3);
    
    return dailyForecasts.map(forecast => ({
      date: forecast.dt_txt.split(' ')[0],
      temperature: {
        max: Math.round(forecast.main.temp_max),
        min: Math.round(forecast.main.temp_min)
      },
      condition: forecast.weather[0].main.toLowerCase()
    }));
  } catch (error) {
    return [];
  }
};

// Foursquare Places API (Free tier: 1,000 calls/day)
export const getNearbyAttractions = async (lat, lng) => {
  const API_KEY = 'your-foursquare-key'; // Users need to get their own key
  
  // Check if API key is configured
  if (!API_KEY || API_KEY === 'your-foursquare-key') {
    console.warn('Foursquare API key not configured, using mock data');
    return getMockAttractions();
  }
  
  try {
    const response = await fetch(
      `https://api.foursquare.com/v3/places/search?ll=${lat},${lng}&categories=16000&limit=20`,
      {
        headers: {
          'Authorization': API_KEY,
          'Accept': 'application/json'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch attractions');
    }
    
    const data = await response.json();
    
    return data.results.map(place => ({
      id: place.fsq_id,
      name: place.name,
      category: place.categories[0]?.name || 'Attraction',
      address: place.location.formatted_address,
      distance: place.distance,
      rating: place.rating || (Math.random() * 2 + 3).toFixed(1),
      coordinates: {
        lat: place.geocodes.main.latitude,
        lng: place.geocodes.main.longitude
      },
      imageUrl: getAttractionImage(place.name),
      description: `Popular ${place.categories[0]?.name.toLowerCase() || 'attraction'} in the area`
    }));
  } catch (error) {
    console.error('Error fetching attractions:', error);
    return getMockAttractions();
  }
};

// Booking.com API alternative - using a free hotel search API
export const getNearbyHotels = async (lat, lng, checkIn, checkOut) => {
  try {
    // Using a mock implementation since most hotel APIs require payment
    // In production, you'd integrate with Booking.com, Hotels.com, or similar
    return getMockHotels(lat, lng);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return [];
  }
};

// Helper functions
const getDestinationImage = (cityName) => {
  const images = [
    'https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg',
    'https://images.pexels.com/photos/736402/pexels-photo-736402.jpeg',
    'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
    'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg',
    'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg',
    'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg'
  ];
  return images[Math.floor(Math.random() * images.length)];
};

const getAttractionImage = (name) => {
  const images = [
    'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg',
    'https://images.pexels.com/photos/2675266/pexels-photo-2675266.jpeg',
    'https://images.pexels.com/photos/390051/surfer-wave-sunset-the-indian-ocean-390051.jpeg',
    'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg'
  ];
  return images[Math.floor(Math.random() * images.length)];
};

const getRandomCategories = () => {
  const categories = ['culture', 'nature', 'adventure', 'relaxation', 'urban', 'history'];
  const numCategories = Math.floor(Math.random() * 3) + 1;
  return categories.sort(() => 0.5 - Math.random()).slice(0, numCategories);
};

const getMockWeather = () => ({
  temperature: Math.floor(Math.random() * 20) + 15,
  condition: ['sunny', 'cloudy', 'partly cloudy'][Math.floor(Math.random() * 3)],
  description: 'Pleasant weather',
  humidity: Math.floor(Math.random() * 40) + 40,
  windSpeed: Math.floor(Math.random() * 10) + 5,
  forecast: [
    { date: '2024-07-15', temperature: { max: 25, min: 18 }, condition: 'sunny' },
    { date: '2024-07-16', temperature: { max: 27, min: 20 }, condition: 'cloudy' },
    { date: '2024-07-17', temperature: { max: 24, min: 17 }, condition: 'partly cloudy' }
  ]
});

const getMockSearchResults = (query) => {
  const mockDestinations = [
    {
      id: `mock-paris-${Date.now()}`,
      name: 'Paris',
      country: 'France',
      state: 'Île-de-France',
      formatted: 'Paris, France',
      coordinates: { lat: 48.8566, lng: 2.3522 },
      imageUrl: 'https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg',
      rating: '4.8',
      priceLevel: 'luxury',
      description: 'The City of Light, famous for its art, fashion, and culture',
      categories: ['culture', 'urban', 'history']
    },
    {
      id: `mock-tokyo-${Date.now()}`,
      name: 'Tokyo',
      country: 'Japan',
      state: 'Tokyo',
      formatted: 'Tokyo, Japan',
      coordinates: { lat: 35.6762, lng: 139.6503 },
      imageUrl: 'https://images.pexels.com/photos/736402/pexels-photo-736402.jpeg',
      rating: '4.7',
      priceLevel: 'moderate',
      description: 'A vibrant metropolis blending traditional and modern culture',
      categories: ['urban', 'culture', 'adventure']
    },
    {
      id: `mock-bali-${Date.now()}`,
      name: 'Bali',
      country: 'Indonesia',
      state: 'Bali',
      formatted: 'Bali, Indonesia',
      coordinates: { lat: -8.3405, lng: 115.0920 },
      imageUrl: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
      rating: '4.6',
      priceLevel: 'budget',
      description: 'Tropical paradise with beautiful beaches and rich culture',
      categories: ['nature', 'relaxation', 'culture']
    },
    {
      id: `mock-nyc-${Date.now()}`,
      name: 'New York City',
      country: 'United States',
      state: 'New York',
      formatted: 'New York City, NY, USA',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      imageUrl: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg',
      rating: '4.5',
      priceLevel: 'luxury',
      description: 'The Big Apple - iconic skyline, Broadway, and endless attractions',
      categories: ['urban', 'culture', 'adventure']
    },
    {
      id: `mock-rome-${Date.now()}`,
      name: 'Rome',
      country: 'Italy',
      state: 'Lazio',
      formatted: 'Rome, Italy',
      coordinates: { lat: 41.9028, lng: 12.4964 },
      imageUrl: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg',
      rating: '4.7',
      priceLevel: 'moderate',
      description: 'The Eternal City with ancient history and incredible architecture',
      categories: ['history', 'culture', 'urban']
    }
  ];

  // Filter destinations based on query if provided
  if (query && query.trim()) {
    const filtered = mockDestinations.filter(dest => 
      dest.name.toLowerCase().includes(query.toLowerCase()) ||
      dest.country.toLowerCase().includes(query.toLowerCase()) ||
      dest.formatted.toLowerCase().includes(query.toLowerCase())
    );
    
    if (filtered.length > 0) {
      return filtered;
    }
    
    // If no matches, return a generic result based on the query
    return [{
      id: `mock-${Date.now()}`,
      name: query,
      country: 'Unknown',
      formatted: query,
      coordinates: { lat: 0, lng: 0 },
      imageUrl: getDestinationImage(query),
      rating: '4.2',
      priceLevel: 'moderate',
      description: `Explore the wonderful destination of ${query}`,
      categories: getRandomCategories()
    }];
  }
  
  return mockDestinations;
};

const getMockAttractions = () => [
  {
    id: 'attr-1',
    name: 'Historic City Center',
    category: 'Historical Site',
    address: 'City Center',
    distance: 500,
    rating: '4.5',
    coordinates: { lat: 0, lng: 0 },
    imageUrl: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg',
    description: 'Beautiful historic area with traditional architecture'
  },
  {
    id: 'attr-2',
    name: 'Local Museum',
    category: 'Museum',
    address: 'Museum District',
    distance: 1200,
    rating: '4.3',
    coordinates: { lat: 0, lng: 0 },
    imageUrl: 'https://images.pexels.com/photos/2675266/pexels-photo-2675266.jpeg',
    description: 'Learn about local history and culture'
  },
  {
    id: 'attr-3',
    name: 'Central Park',
    category: 'Park',
    address: 'Downtown',
    distance: 800,
    rating: '4.6',
    coordinates: { lat: 0, lng: 0 },
    imageUrl: 'https://images.pexels.com/photos/390051/surfer-wave-sunset-the-indian-ocean-390051.jpeg',
    description: 'Beautiful green space perfect for relaxation'
  },
  {
    id: 'attr-4',
    name: 'Art Gallery',
    category: 'Gallery',
    address: 'Arts District',
    distance: 1500,
    rating: '4.4',
    coordinates: { lat: 0, lng: 0 },
    imageUrl: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg',
    description: 'Contemporary art exhibitions and local artists'
  },
  {
    id: 'attr-5',
    name: 'Observation Deck',
    category: 'Viewpoint',
    address: 'City Heights',
    distance: 2000,
    rating: '4.7',
    coordinates: { lat: 0, lng: 0 },
    imageUrl: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg',
    description: 'Panoramic views of the city skyline'
  }
];

const getMockHotels = (lat, lng) => [
  {
    id: 'hotel-1',
    name: 'Grand Plaza Hotel',
    rating: 4.5,
    pricePerNight: 120,
    currency: 'USD',
    address: 'Downtown Area',
    amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant'],
    imageUrl: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
    coordinates: { lat, lng }
  },
  {
    id: 'hotel-2',
    name: 'Boutique Inn',
    rating: 4.2,
    pricePerNight: 85,
    currency: 'USD',
    address: 'Historic District',
    amenities: ['WiFi', 'Breakfast', 'Parking'],
    imageUrl: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    coordinates: { lat, lng }
  },
  {
    id: 'hotel-3',
    name: 'Budget Stay',
    rating: 3.8,
    pricePerNight: 45,
    currency: 'USD',
    address: 'Near Station',
    amenities: ['WiFi', 'Reception'],
    imageUrl: 'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg',
    coordinates: { lat, lng }
  }
];

// API Configuration helper
export const getApiSetupInstructions = () => {
  return {
    openCage: {
      name: 'OpenCage Geocoding API',
      url: 'https://opencagedata.com/api',
      description: 'Free tier: 2,500 requests/day for location search',
      setup: 'Sign up and get your free API key'
    },
    openWeather: {
      name: 'OpenWeatherMap API',
      url: 'https://openweathermap.org/api',
      description: 'Free tier: 1,000 calls/day for weather data',
      setup: 'Create account and get API key'
    },
    foursquare: {
      name: 'Foursquare Places API',
      url: 'https://developer.foursquare.com/',
      description: 'Free tier: 1,000 calls/day for places/attractions',
      setup: 'Register as developer and get API key'
    },
    restCountries: {
      name: 'REST Countries API',
      url: 'https://restcountries.com/',
      description: 'Completely free, no API key required',
      setup: 'No setup required'
    }
  };
};