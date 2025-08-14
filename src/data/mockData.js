// Import from separate files for better organization
import { destinations, getDestinationById, getRecommendedDestinations } from './destinations';
import { users, getUserById, getUserByEmail } from './users';

// Re-export for backward compatibility
export { destinations as mockDestinations, getDestinationById, getRecommendedDestinations };
export { users as mockUsers, getUserById, getUserByEmail };

export const getActivitiesForDestination = (destinationId) => {
  const activities = {
    '1': [
      { 
        id: 'act1', 
        name: 'Surfing Lesson', 
        destinationId: '1',
        description: 'Learn to surf on the beautiful beaches of Bali',
        imageUrl: 'https://images.pexels.com/photos/390051/surfer-wave-sunset-the-indian-ocean-390051.jpeg',
        duration: 3,
        price: 45,
        rating: 4.7,
        categories: ['adventure', 'water sports']
      },
      { 
        id: 'act2', 
        name: 'Temple Tour', 
        destinationId: '1',
        description: 'Visit ancient Hindu temples and learn about Balinese culture',
        imageUrl: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg',
        duration: 4,
        price: 35,
        rating: 4.8,
        categories: ['culture', 'history']
      }
    ],
    '2': [
      { 
        id: 'act3', 
        name: 'Eiffel Tower Visit', 
        destinationId: '2',
        description: 'Iconic tower with stunning views of Paris',
        imageUrl: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg',
        duration: 2,
        price: 25,
        rating: 4.6,
        categories: ['sightseeing', 'culture']
      },
      { 
        id: 'act4', 
        name: 'Louvre Museum Tour', 
        destinationId: '2',
        description: 'Explore the world\'s largest art museum',
        imageUrl: 'https://images.pexels.com/photos/2675266/pexels-photo-2675266.jpeg',
        duration: 3,
        price: 20,
        rating: 4.9,
        categories: ['culture', 'art', 'history']
      }
    ]
  };
  
  return activities[destinationId] || [];
};

export const mockTrips = [
  {
    id: 'trip-1',
    name: 'Bali Adventure',
    startDate: '2024-08-15',
    endDate: '2024-08-22',
    status: 'planning',
    destinations: [
      { id: '1', name: 'Bali', country: 'Indonesia', imageUrl: 'https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg' }
    ],
    itinerary: [
      {
        day: 1,
        activities: [
          { activityId: 'act1', name: 'Surfing Lesson' }
        ]
      }
    ]
  }
];

export const getDestinationById = (id) => {
  return mockDestinations.find(dest => dest.id === id);
};

// Travel planner users - demo accounts for login
export const mockUsers = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    preferences: {
      budget: 'moderate',
      interests: ['adventure', 'culture'],
      travelStyle: ['backpacking', 'luxury']
    }
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    preferences: {
      budget: 'luxury',
      interests: ['relaxation', 'culture'],
      travelStyle: ['luxury', 'romantic']
    }
  }
];