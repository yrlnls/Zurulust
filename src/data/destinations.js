// Extended destinations database with 50 destinations worldwide
export const destinations = [
  {
    id: '1',
    name: 'Bali',
    country: 'Indonesia',
    imageUrl: 'https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg',
    rating: 4.8,
    priceLevel: 'moderate',
    description: 'Experience the beautiful beaches, ancient temples, and vibrant culture of Bali.',
    categories: ['relaxation', 'culture', 'nature'],
    coordinates: { lat: -8.3405, lng: 115.0920 },
    weatherInfo: {
      temperature: 28,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 30, min: 24 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 29, min: 23 }, condition: 'partly cloudy' },
        { date: '2024-07-17', temperature: { max: 31, min: 25 }, condition: 'sunny' }
      ]
    }
  },
  {
    id: '2',
    name: 'Paris',
    country: 'France',
    imageUrl: 'https://images.pexels.com/photos/736402/pexels-photo-736402.jpeg',
    rating: 4.7,
    priceLevel: 'luxury',
    description: 'Discover the art, fashion, and gastronomy of the City of Light.',
    categories: ['culture', 'urban', 'art'],
    coordinates: { lat: 48.8566, lng: 2.3522 },
    weatherInfo: {
      temperature: 22,
      condition: 'partly cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 24, min: 18 }, condition: 'cloudy' },
        { date: '2024-07-16', temperature: { max: 26, min: 19 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 23, min: 17 }, condition: 'rainy' }
      ]
    }
  },
  {
    id: '3',
    name: 'Tokyo',
    country: 'Japan',
    imageUrl: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
    rating: 4.9,
    priceLevel: 'moderate',
    description: 'Experience the perfect blend of traditional and modern culture in Tokyo.',
    categories: ['culture', 'urban', 'adventure'],
    coordinates: { lat: 35.6762, lng: 139.6503 },
    weatherInfo: {
      temperature: 25,
      condition: 'cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 27, min: 21 }, condition: 'cloudy' },
        { date: '2024-07-16', temperature: { max: 29, min: 23 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 26, min: 20 }, condition: 'rainy' }
      ]
    }
  },
  {
    id: '4',
    name: 'Santorini',
    country: 'Greece',
    imageUrl: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg',
    rating: 4.6,
    priceLevel: 'luxury',
    description: 'Stunning sunsets and white-washed buildings overlooking the Aegean Sea.',
    categories: ['relaxation', 'culture', 'nature'],
    coordinates: { lat: 36.3932, lng: 25.4615 },
    weatherInfo: {
      temperature: 26,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 28, min: 22 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 30, min: 24 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 27, min: 21 }, condition: 'partly cloudy' }
      ]
    }
  },
  {
    id: '5',
    name: 'New York City',
    country: 'United States',
    imageUrl: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg',
    rating: 4.5,
    priceLevel: 'luxury',
    description: 'The Big Apple - iconic skyline, Broadway shows, and world-class museums.',
    categories: ['urban', 'culture', 'adventure'],
    coordinates: { lat: 40.7128, lng: -74.0060 },
    weatherInfo: {
      temperature: 24,
      condition: 'partly cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 26, min: 20 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 28, min: 22 }, condition: 'partly cloudy' },
        { date: '2024-07-17', temperature: { max: 25, min: 19 }, condition: 'cloudy' }
      ]
    }
  },
  {
    id: '6',
    name: 'Rome',
    country: 'Italy',
    imageUrl: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg',
    rating: 4.7,
    priceLevel: 'moderate',
    description: 'The Eternal City with ancient history, incredible architecture, and amazing cuisine.',
    categories: ['history', 'culture', 'urban'],
    coordinates: { lat: 41.9028, lng: 12.4964 },
    weatherInfo: {
      temperature: 27,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 29, min: 23 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 31, min: 25 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 28, min: 22 }, condition: 'partly cloudy' }
      ]
    }
  },
  {
    id: '7',
    name: 'Barcelona',
    country: 'Spain',
    imageUrl: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg',
    rating: 4.6,
    priceLevel: 'moderate',
    description: 'Vibrant city with stunning architecture, beautiful beaches, and rich Catalan culture.',
    categories: ['culture', 'urban', 'art'],
    coordinates: { lat: 41.3851, lng: 2.1734 },
    weatherInfo: {
      temperature: 25,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 27, min: 21 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 29, min: 23 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 26, min: 20 }, condition: 'partly cloudy' }
      ]
    }
  },
  {
    id: '8',
    name: 'Dubai',
    country: 'United Arab Emirates',
    imageUrl: 'https://images.pexels.com/photos/1470405/pexels-photo-1470405.jpeg',
    rating: 4.4,
    priceLevel: 'luxury',
    description: 'Modern metropolis with luxury shopping, ultramodern architecture, and desert adventures.',
    categories: ['luxury', 'urban', 'adventure'],
    coordinates: { lat: 25.2048, lng: 55.2708 },
    weatherInfo: {
      temperature: 35,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 37, min: 29 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 38, min: 30 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 36, min: 28 }, condition: 'sunny' }
      ]
    }
  },
  {
    id: '9',
    name: 'London',
    country: 'United Kingdom',
    imageUrl: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
    rating: 4.5,
    priceLevel: 'luxury',
    description: 'Historic capital with royal palaces, world-class museums, and vibrant neighborhoods.',
    categories: ['history', 'culture', 'urban'],
    coordinates: { lat: 51.5074, lng: -0.1278 },
    weatherInfo: {
      temperature: 18,
      condition: 'cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 20, min: 14 }, condition: 'cloudy' },
        { date: '2024-07-16', temperature: { max: 22, min: 16 }, condition: 'partly cloudy' },
        { date: '2024-07-17', temperature: { max: 19, min: 13 }, condition: 'rainy' }
      ]
    }
  },
  {
    id: '10',
    name: 'Sydney',
    country: 'Australia',
    imageUrl: 'https://images.pexels.com/photos/783682/pexels-photo-783682.jpeg',
    rating: 4.6,
    priceLevel: 'moderate',
    description: 'Harbor city with iconic Opera House, beautiful beaches, and laid-back lifestyle.',
    categories: ['urban', 'nature', 'relaxation'],
    coordinates: { lat: -33.8688, lng: 151.2093 },
    weatherInfo: {
      temperature: 20,
      condition: 'partly cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 22, min: 16 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 24, min: 18 }, condition: 'partly cloudy' },
        { date: '2024-07-17', temperature: { max: 21, min: 15 }, condition: 'cloudy' }
      ]
    }
  },
  {
    id: '11',
    name: 'Machu Picchu',
    country: 'Peru',
    imageUrl: 'https://images.pexels.com/photos/259967/pexels-photo-259967.jpeg',
    rating: 4.9,
    priceLevel: 'moderate',
    description: 'Ancient Incan citadel set high in the Andes Mountains.',
    categories: ['history', 'adventure', 'nature'],
    coordinates: { lat: -13.1631, lng: -72.5450 },
    weatherInfo: {
      temperature: 15,
      condition: 'cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 18, min: 8 }, condition: 'cloudy' },
        { date: '2024-07-16', temperature: { max: 20, min: 10 }, condition: 'partly cloudy' },
        { date: '2024-07-17', temperature: { max: 17, min: 7 }, condition: 'rainy' }
      ]
    }
  },
  {
    id: '12',
    name: 'Maldives',
    country: 'Maldives',
    imageUrl: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
    rating: 4.8,
    priceLevel: 'luxury',
    description: 'Tropical paradise with crystal-clear waters and overwater bungalows.',
    categories: ['relaxation', 'luxury', 'nature'],
    coordinates: { lat: 3.2028, lng: 73.2207 },
    weatherInfo: {
      temperature: 30,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 32, min: 26 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 31, min: 27 }, condition: 'partly cloudy' },
        { date: '2024-07-17', temperature: { max: 33, min: 28 }, condition: 'sunny' }
      ]
    }
  },
  {
    id: '13',
    name: 'Iceland',
    country: 'Iceland',
    imageUrl: 'https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg',
    rating: 4.7,
    priceLevel: 'moderate',
    description: 'Land of fire and ice with glaciers, geysers, and Northern Lights.',
    categories: ['nature', 'adventure', 'unique'],
    coordinates: { lat: 64.9631, lng: -19.0208 },
    weatherInfo: {
      temperature: 12,
      condition: 'cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 14, min: 8 }, condition: 'cloudy' },
        { date: '2024-07-16', temperature: { max: 16, min: 10 }, condition: 'partly cloudy' },
        { date: '2024-07-17', temperature: { max: 13, min: 7 }, condition: 'rainy' }
      ]
    }
  },
  {
    id: '14',
    name: 'Cape Town',
    country: 'South Africa',
    imageUrl: 'https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg',
    rating: 4.5,
    priceLevel: 'budget',
    description: 'Stunning coastal city with Table Mountain, wine regions, and rich history.',
    categories: ['nature', 'culture', 'adventure'],
    coordinates: { lat: -33.9249, lng: 18.4241 },
    weatherInfo: {
      temperature: 18,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 20, min: 14 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 22, min: 16 }, condition: 'partly cloudy' },
        { date: '2024-07-17', temperature: { max: 19, min: 13 }, condition: 'cloudy' }
      ]
    }
  },
  {
    id: '15',
    name: 'Bangkok',
    country: 'Thailand',
    imageUrl: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg',
    rating: 4.4,
    priceLevel: 'budget',
    description: 'Vibrant capital with ornate temples, bustling markets, and incredible street food.',
    categories: ['culture', 'urban', 'food'],
    coordinates: { lat: 13.7563, lng: 100.5018 },
    weatherInfo: {
      temperature: 32,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 34, min: 26 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 35, min: 27 }, condition: 'partly cloudy' },
        { date: '2024-07-17', temperature: { max: 33, min: 25 }, condition: 'rainy' }
      ]
    }
  },
  {
    id: '16',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    imageUrl: 'https://images.pexels.com/photos/351283/pexels-photo-351283.jpeg',
    rating: 4.3,
    priceLevel: 'moderate',
    description: 'Marvelous city with Christ the Redeemer, Copacabana Beach, and carnival spirit.',
    categories: ['culture', 'relaxation', 'urban'],
    coordinates: { lat: -22.9068, lng: -43.1729 },
    weatherInfo: {
      temperature: 26,
      condition: 'partly cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 28, min: 22 }, condition: 'partly cloudy' },
        { date: '2024-07-16', temperature: { max: 30, min: 24 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 27, min: 21 }, condition: 'rainy' }
      ]
    }
  },
  {
    id: '17',
    name: 'Amsterdam',
    country: 'Netherlands',
    imageUrl: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg',
    rating: 4.5,
    priceLevel: 'moderate',
    description: 'Charming city of canals, museums, and cycling culture.',
    categories: ['culture', 'urban', 'history'],
    coordinates: { lat: 52.3676, lng: 4.9041 },
    weatherInfo: {
      temperature: 19,
      condition: 'cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 21, min: 15 }, condition: 'cloudy' },
        { date: '2024-07-16', temperature: { max: 23, min: 17 }, condition: 'partly cloudy' },
        { date: '2024-07-17', temperature: { max: 20, min: 14 }, condition: 'rainy' }
      ]
    }
  },
  {
    id: '18',
    name: 'Singapore',
    country: 'Singapore',
    imageUrl: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg',
    rating: 4.6,
    priceLevel: 'luxury',
    description: 'Modern city-state with futuristic architecture, gardens, and diverse cuisine.',
    categories: ['urban', 'culture', 'food'],
    coordinates: { lat: 1.3521, lng: 103.8198 },
    weatherInfo: {
      temperature: 31,
      condition: 'partly cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 33, min: 27 }, condition: 'partly cloudy' },
        { date: '2024-07-16', temperature: { max: 32, min: 28 }, condition: 'rainy' },
        { date: '2024-07-17', temperature: { max: 34, min: 29 }, condition: 'sunny' }
      ]
    }
  },
  {
    id: '19',
    name: 'Istanbul',
    country: 'Turkey',
    imageUrl: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg',
    rating: 4.4,
    priceLevel: 'budget',
    description: 'Historic city bridging Europe and Asia with stunning mosques and bazaars.',
    categories: ['history', 'culture', 'urban'],
    coordinates: { lat: 41.0082, lng: 28.9784 },
    weatherInfo: {
      temperature: 23,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 25, min: 19 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 27, min: 21 }, condition: 'partly cloudy' },
        { date: '2024-07-17', temperature: { max: 24, min: 18 }, condition: 'cloudy' }
      ]
    }
  },
  {
    id: '20',
    name: 'Kyoto',
    country: 'Japan',
    imageUrl: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg',
    rating: 4.8,
    priceLevel: 'moderate',
    description: 'Ancient capital with thousands of temples, traditional gardens, and geisha districts.',
    categories: ['culture', 'history', 'nature'],
    coordinates: { lat: 35.0116, lng: 135.7681 },
    weatherInfo: {
      temperature: 24,
      condition: 'partly cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 26, min: 20 }, condition: 'partly cloudy' },
        { date: '2024-07-16', temperature: { max: 28, min: 22 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 25, min: 19 }, condition: 'rainy' }
      ]
    }
  },
  {
    id: '21',
    name: 'Marrakech',
    country: 'Morocco',
    imageUrl: 'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg',
    rating: 4.3,
    priceLevel: 'budget',
    description: 'Imperial city with vibrant souks, palaces, and desert gateway.',
    categories: ['culture', 'history', 'adventure'],
    coordinates: { lat: 31.6295, lng: -7.9811 },
    weatherInfo: {
      temperature: 29,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 32, min: 22 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 34, min: 24 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 31, min: 21 }, condition: 'partly cloudy' }
      ]
    }
  },
  {
    id: '22',
    name: 'Prague',
    country: 'Czech Republic',
    imageUrl: 'https://images.pexels.com/photos/1845331/pexels-photo-1845331.jpeg',
    rating: 4.6,
    priceLevel: 'budget',
    description: 'Fairy-tale city with medieval architecture, castles, and famous beer culture.',
    categories: ['history', 'culture', 'urban'],
    coordinates: { lat: 50.0755, lng: 14.4378 },
    weatherInfo: {
      temperature: 21,
      condition: 'partly cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 23, min: 17 }, condition: 'partly cloudy' },
        { date: '2024-07-16', temperature: { max: 25, min: 19 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 22, min: 16 }, condition: 'cloudy' }
      ]
    }
  },
  {
    id: '23',
    name: 'Lisbon',
    country: 'Portugal',
    imageUrl: 'https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg',
    rating: 4.5,
    priceLevel: 'budget',
    description: 'Coastal capital with colorful neighborhoods, historic trams, and fado music.',
    categories: ['culture', 'history', 'urban'],
    coordinates: { lat: 38.7223, lng: -9.1393 },
    weatherInfo: {
      temperature: 24,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 26, min: 20 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 28, min: 22 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 25, min: 19 }, condition: 'partly cloudy' }
      ]
    }
  },
  {
    id: '24',
    name: 'Vienna',
    country: 'Austria',
    imageUrl: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg',
    rating: 4.6,
    priceLevel: 'moderate',
    description: 'Imperial city with grand palaces, classical music heritage, and coffeehouse culture.',
    categories: ['culture', 'history', 'art'],
    coordinates: { lat: 48.2082, lng: 16.3738 },
    weatherInfo: {
      temperature: 22,
      condition: 'partly cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 24, min: 18 }, condition: 'partly cloudy' },
        { date: '2024-07-16', temperature: { max: 26, min: 20 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 23, min: 17 }, condition: 'cloudy' }
      ]
    }
  },
  {
    id: '25',
    name: 'Petra',
    country: 'Jordan',
    imageUrl: 'https://images.pexels.com/photos/1583582/pexels-photo-1583582.jpeg',
    rating: 4.7,
    priceLevel: 'moderate',
    description: 'Ancient archaeological site carved into rose-red cliffs.',
    categories: ['history', 'adventure', 'culture'],
    coordinates: { lat: 30.3285, lng: 35.4444 },
    weatherInfo: {
      temperature: 28,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 30, min: 20 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 32, min: 22 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 29, min: 19 }, condition: 'partly cloudy' }
      ]
    }
  },
  {
    id: '26',
    name: 'Banff',
    country: 'Canada',
    imageUrl: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
    rating: 4.8,
    priceLevel: 'moderate',
    description: 'Mountain paradise with pristine lakes, glaciers, and wildlife.',
    categories: ['nature', 'adventure', 'relaxation'],
    coordinates: { lat: 51.4968, lng: -115.9281 },
    weatherInfo: {
      temperature: 16,
      condition: 'partly cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 18, min: 10 }, condition: 'partly cloudy' },
        { date: '2024-07-16', temperature: { max: 20, min: 12 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 17, min: 9 }, condition: 'cloudy' }
      ]
    }
  },
  {
    id: '27',
    name: 'Bora Bora',
    country: 'French Polynesia',
    imageUrl: 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg',
    rating: 4.9,
    priceLevel: 'luxury',
    description: 'Tropical paradise with turquoise lagoons and luxury overwater resorts.',
    categories: ['relaxation', 'luxury', 'nature'],
    coordinates: { lat: -16.5004, lng: -151.7415 },
    weatherInfo: {
      temperature: 29,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 31, min: 25 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 30, min: 26 }, condition: 'partly cloudy' },
        { date: '2024-07-17', temperature: { max: 32, min: 27 }, condition: 'sunny' }
      ]
    }
  },
  {
    id: '28',
    name: 'Edinburgh',
    country: 'Scotland',
    imageUrl: 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg',
    rating: 4.5,
    priceLevel: 'moderate',
    description: 'Historic Scottish capital with medieval Old Town and elegant Georgian New Town.',
    categories: ['history', 'culture', 'urban'],
    coordinates: { lat: 55.9533, lng: -3.1883 },
    weatherInfo: {
      temperature: 17,
      condition: 'cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 19, min: 13 }, condition: 'cloudy' },
        { date: '2024-07-16', temperature: { max: 21, min: 15 }, condition: 'partly cloudy' },
        { date: '2024-07-17', temperature: { max: 18, min: 12 }, condition: 'rainy' }
      ]
    }
  },
  {
    id: '29',
    name: 'Cusco',
    country: 'Peru',
    imageUrl: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg',
    rating: 4.4,
    priceLevel: 'budget',
    description: 'Gateway to Machu Picchu with Incan ruins and colonial architecture.',
    categories: ['history', 'culture', 'adventure'],
    coordinates: { lat: -13.5319, lng: -71.9675 },
    weatherInfo: {
      temperature: 14,
      condition: 'partly cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 17, min: 7 }, condition: 'partly cloudy' },
        { date: '2024-07-16', temperature: { max: 19, min: 9 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 16, min: 6 }, condition: 'cloudy' }
      ]
    }
  },
  {
    id: '30',
    name: 'Reykjavik',
    country: 'Iceland',
    imageUrl: 'https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg',
    rating: 4.5,
    priceLevel: 'moderate',
    description: 'Colorful Nordic capital and gateway to Iceland\'s natural wonders.',
    categories: ['culture', 'nature', 'unique'],
    coordinates: { lat: 64.1466, lng: -21.9426 },
    weatherInfo: {
      temperature: 11,
      condition: 'cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 13, min: 7 }, condition: 'cloudy' },
        { date: '2024-07-16', temperature: { max: 15, min: 9 }, condition: 'partly cloudy' },
        { date: '2024-07-17', temperature: { max: 12, min: 6 }, condition: 'rainy' }
      ]
    }
  },
  {
    id: '31',
    name: 'Dubrovnik',
    country: 'Croatia',
    imageUrl: 'https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg',
    rating: 4.6,
    priceLevel: 'moderate',
    description: 'Pearl of the Adriatic with medieval walls and stunning coastal views.',
    categories: ['history', 'culture', 'relaxation'],
    coordinates: { lat: 42.6507, lng: 18.0944 },
    weatherInfo: {
      temperature: 26,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 28, min: 22 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 30, min: 24 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 27, min: 21 }, condition: 'partly cloudy' }
      ]
    }
  },
  {
    id: '32',
    name: 'Seville',
    country: 'Spain',
    imageUrl: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg',
    rating: 4.5,
    priceLevel: 'budget',
    description: 'Andalusian gem with Moorish architecture, flamenco, and tapas culture.',
    categories: ['culture', 'history', 'food'],
    coordinates: { lat: 37.3891, lng: -5.9845 },
    weatherInfo: {
      temperature: 28,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 31, min: 23 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 33, min: 25 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 30, min: 22 }, condition: 'partly cloudy' }
      ]
    }
  },
  {
    id: '33',
    name: 'Bruges',
    country: 'Belgium',
    imageUrl: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg',
    rating: 4.7,
    priceLevel: 'moderate',
    description: 'Medieval fairy-tale city with canals, cobblestone streets, and chocolate.',
    categories: ['history', 'culture', 'relaxation'],
    coordinates: { lat: 51.2093, lng: 3.2247 },
    weatherInfo: {
      temperature: 18,
      condition: 'cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 20, min: 14 }, condition: 'cloudy' },
        { date: '2024-07-16', temperature: { max: 22, min: 16 }, condition: 'partly cloudy' },
        { date: '2024-07-17', temperature: { max: 19, min: 13 }, condition: 'rainy' }
      ]
    }
  },
  {
    id: '34',
    name: 'Queenstown',
    country: 'New Zealand',
    imageUrl: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
    rating: 4.7,
    priceLevel: 'moderate',
    description: 'Adventure capital with stunning alpine scenery and extreme sports.',
    categories: ['adventure', 'nature', 'relaxation'],
    coordinates: { lat: -45.0312, lng: 168.6626 },
    weatherInfo: {
      temperature: 12,
      condition: 'partly cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 15, min: 7 }, condition: 'partly cloudy' },
        { date: '2024-07-16', temperature: { max: 17, min: 9 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 14, min: 6 }, condition: 'cloudy' }
      ]
    }
  },
  {
    id: '35',
    name: 'Jaipur',
    country: 'India',
    imageUrl: 'https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg',
    rating: 4.4,
    priceLevel: 'budget',
    description: 'Pink City with magnificent palaces, forts, and vibrant bazaars.',
    categories: ['history', 'culture', 'adventure'],
    coordinates: { lat: 26.9124, lng: 75.7873 },
    weatherInfo: {
      temperature: 33,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 36, min: 26 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 38, min: 28 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 35, min: 25 }, condition: 'partly cloudy' }
      ]
    }
  },
  {
    id: '36',
    name: 'Havana',
    country: 'Cuba',
    imageUrl: 'https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg',
    rating: 4.3,
    priceLevel: 'budget',
    description: 'Colorful capital with colonial architecture, classic cars, and salsa music.',
    categories: ['culture', 'history', 'music'],
    coordinates: { lat: 23.1136, lng: -82.3666 },
    weatherInfo: {
      temperature: 27,
      condition: 'partly cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 29, min: 23 }, condition: 'partly cloudy' },
        { date: '2024-07-16', temperature: { max: 31, min: 25 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 28, min: 22 }, condition: 'rainy' }
      ]
    }
  },
  {
    id: '37',
    name: 'Angkor Wat',
    country: 'Cambodia',
    imageUrl: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg',
    rating: 4.8,
    priceLevel: 'budget',
    description: 'Magnificent temple complex and UNESCO World Heritage site.',
    categories: ['history', 'culture', 'adventure'],
    coordinates: { lat: 13.4125, lng: 103.8670 },
    weatherInfo: {
      temperature: 31,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 33, min: 25 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 34, min: 26 }, condition: 'partly cloudy' },
        { date: '2024-07-17', temperature: { max: 32, min: 24 }, condition: 'rainy' }
      ]
    }
  },
  {
    id: '38',
    name: 'Santorini',
    country: 'Greece',
    imageUrl: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg',
    rating: 4.6,
    priceLevel: 'luxury',
    description: 'Iconic Greek island with blue-domed churches and spectacular sunsets.',
    categories: ['relaxation', 'culture', 'luxury'],
    coordinates: { lat: 36.3932, lng: 25.4615 },
    weatherInfo: {
      temperature: 26,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 28, min: 22 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 30, min: 24 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 27, min: 21 }, condition: 'partly cloudy' }
      ]
    }
  },
  {
    id: '39',
    name: 'Mykonos',
    country: 'Greece',
    imageUrl: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg',
    rating: 4.4,
    priceLevel: 'luxury',
    description: 'Cosmopolitan island with vibrant nightlife and pristine beaches.',
    categories: ['relaxation', 'nightlife', 'luxury'],
    coordinates: { lat: 37.4467, lng: 25.3289 },
    weatherInfo: {
      temperature: 25,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 27, min: 21 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 29, min: 23 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 26, min: 20 }, condition: 'partly cloudy' }
      ]
    }
  },
  {
    id: '40',
    name: 'Zanzibar',
    country: 'Tanzania',
    imageUrl: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
    rating: 4.5,
    priceLevel: 'moderate',
    description: 'Spice island with pristine beaches, Stone Town, and rich Swahili culture.',
    categories: ['relaxation', 'culture', 'history'],
    coordinates: { lat: -6.1659, lng: 39.2026 },
    weatherInfo: {
      temperature: 28,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 30, min: 24 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 31, min: 25 }, condition: 'partly cloudy' },
        { date: '2024-07-17', temperature: { max: 29, min: 23 }, condition: 'sunny' }
      ]
    }
  },
  {
    id: '41',
    name: 'Phuket',
    country: 'Thailand',
    imageUrl: 'https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg',
    rating: 4.3,
    priceLevel: 'moderate',
    description: 'Thailand\'s largest island with beautiful beaches and vibrant nightlife.',
    categories: ['relaxation', 'adventure', 'nightlife'],
    coordinates: { lat: 7.8804, lng: 98.3923 },
    weatherInfo: {
      temperature: 30,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 32, min: 26 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 33, min: 27 }, condition: 'partly cloudy' },
        { date: '2024-07-17', temperature: { max: 31, min: 25 }, condition: 'rainy' }
      ]
    }
  },
  {
    id: '42',
    name: 'Florence',
    country: 'Italy',
    imageUrl: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg',
    rating: 4.7,
    priceLevel: 'moderate',
    description: 'Renaissance capital with world-class art, architecture, and Tuscan cuisine.',
    categories: ['art', 'culture', 'history'],
    coordinates: { lat: 43.7696, lng: 11.2558 },
    weatherInfo: {
      temperature: 26,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 28, min: 22 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 30, min: 24 }, condition: 'partly cloudy' },
        { date: '2024-07-17', temperature: { max: 27, min: 21 }, condition: 'sunny' }
      ]
    }
  },
  {
    id: '43',
    name: 'Chiang Mai',
    country: 'Thailand',
    imageUrl: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg',
    rating: 4.5,
    priceLevel: 'budget',
    description: 'Cultural hub with ancient temples, night markets, and mountain adventures.',
    categories: ['culture', 'adventure', 'nature'],
    coordinates: { lat: 18.7883, lng: 98.9853 },
    weatherInfo: {
      temperature: 29,
      condition: 'partly cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 31, min: 23 }, condition: 'partly cloudy' },
        { date: '2024-07-16', temperature: { max: 32, min: 24 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 30, min: 22 }, condition: 'rainy' }
      ]
    }
  },
  {
    id: '44',
    name: 'Salzburg',
    country: 'Austria',
    imageUrl: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg',
    rating: 4.6,
    priceLevel: 'moderate',
    description: 'Mozart\'s birthplace with baroque architecture and Alpine beauty.',
    categories: ['culture', 'history', 'music'],
    coordinates: { lat: 47.8095, lng: 13.0550 },
    weatherInfo: {
      temperature: 21,
      condition: 'partly cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 23, min: 17 }, condition: 'partly cloudy' },
        { date: '2024-07-16', temperature: { max: 25, min: 19 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 22, min: 16 }, condition: 'cloudy' }
      ]
    }
  },
  {
    id: '45',
    name: 'Goa',
    country: 'India',
    imageUrl: 'https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg',
    rating: 4.2,
    priceLevel: 'budget',
    description: 'Coastal paradise with Portuguese heritage, beaches, and laid-back vibes.',
    categories: ['relaxation', 'culture', 'nightlife'],
    coordinates: { lat: 15.2993, lng: 74.1240 },
    weatherInfo: {
      temperature: 30,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 32, min: 26 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 33, min: 27 }, condition: 'partly cloudy' },
        { date: '2024-07-17', temperature: { max: 31, min: 25 }, condition: 'sunny' }
      ]
    }
  },
  {
    id: '46',
    name: 'Krakow',
    country: 'Poland',
    imageUrl: 'https://images.pexels.com/photos/1845331/pexels-photo-1845331.jpeg',
    rating: 4.6,
    priceLevel: 'budget',
    description: 'Medieval city with stunning architecture, rich history, and vibrant culture.',
    categories: ['history', 'culture', 'urban'],
    coordinates: { lat: 50.0647, lng: 19.9450 },
    weatherInfo: {
      temperature: 20,
      condition: 'partly cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 22, min: 16 }, condition: 'partly cloudy' },
        { date: '2024-07-16', temperature: { max: 24, min: 18 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 21, min: 15 }, condition: 'cloudy' }
      ]
    }
  },
  {
    id: '47',
    name: 'Ubud',
    country: 'Indonesia',
    imageUrl: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg',
    rating: 4.7,
    priceLevel: 'moderate',
    description: 'Cultural heart of Bali with rice terraces, yoga retreats, and art scene.',
    categories: ['culture', 'relaxation', 'nature'],
    coordinates: { lat: -8.5069, lng: 115.2625 },
    weatherInfo: {
      temperature: 27,
      condition: 'partly cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 29, min: 23 }, condition: 'partly cloudy' },
        { date: '2024-07-16', temperature: { max: 30, min: 24 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 28, min: 22 }, condition: 'rainy' }
      ]
    }
  },
  {
    id: '48',
    name: 'Tulum',
    country: 'Mexico',
    imageUrl: 'https://images.pexels.com/photos/259967/pexels-photo-259967.jpeg',
    rating: 4.4,
    priceLevel: 'moderate',
    description: 'Bohemian beach town with Mayan ruins and cenotes.',
    categories: ['relaxation', 'history', 'nature'],
    coordinates: { lat: 20.2114, lng: -87.4654 },
    weatherInfo: {
      temperature: 28,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 30, min: 24 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 31, min: 25 }, condition: 'partly cloudy' },
        { date: '2024-07-17', temperature: { max: 29, min: 23 }, condition: 'rainy' }
      ]
    }
  },
  {
    id: '49',
    name: 'Patagonia',
    country: 'Argentina',
    imageUrl: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
    rating: 4.8,
    priceLevel: 'moderate',
    description: 'Vast wilderness with glaciers, mountains, and incredible wildlife.',
    categories: ['nature', 'adventure', 'wildlife'],
    coordinates: { lat: -50.9423, lng: -73.4068 },
    weatherInfo: {
      temperature: 8,
      condition: 'cloudy',
      forecast: [
        { date: '2024-07-15', temperature: { max: 12, min: 2 }, condition: 'cloudy' },
        { date: '2024-07-16', temperature: { max: 14, min: 4 }, condition: 'partly cloudy' },
        { date: '2024-07-17', temperature: { max: 11, min: 1 }, condition: 'rainy' }
      ]
    }
  },
  {
    id: '50',
    name: 'Serengeti',
    country: 'Tanzania',
    imageUrl: 'https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg',
    rating: 4.9,
    priceLevel: 'luxury',
    description: 'World-famous safari destination with the Great Migration.',
    categories: ['wildlife', 'adventure', 'nature'],
    coordinates: { lat: -2.3333, lng: 34.8333 },
    weatherInfo: {
      temperature: 24,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 27, min: 18 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 28, min: 19 }, condition: 'partly cloudy' },
        { date: '2024-07-17', temperature: { max: 26, min: 17 }, condition: 'cloudy' }
      ]
    }
  }
];

export const getDestinationById = (id) => {
  return destinations.find(dest => dest.id === id);
};

export const getRecommendedDestinations = (user) => {
  if (!user) return destinations.slice(0, 8);
  
  // Filter based on user preferences
  const { budget, interests } = user.preferences || {};
  
  let filtered = destinations;
  
  if (budget) {
    filtered = filtered.filter(dest => dest.priceLevel === budget);
  }
  
  if (interests && interests.length > 0) {
    filtered = filtered.filter(dest => 
      dest.categories.some(category => interests.includes(category))
    );
  }
  
  return filtered.length > 0 ? filtered : destinations.slice(0, 12);
};

export const searchDestinations = (query) => {
  if (!query) return destinations;
  
  const searchTerm = query.toLowerCase();
  return destinations.filter(dest =>
    dest.name.toLowerCase().includes(searchTerm) ||
    dest.country.toLowerCase().includes(searchTerm) ||
    dest.description.toLowerCase().includes(searchTerm) ||
    dest.categories.some(cat => cat.toLowerCase().includes(searchTerm))
  );
};