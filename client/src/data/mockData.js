// mockData.js

// --- HR Management Data ---

export const users = [
    { id: 'user-admin', name: 'John Admin', email: 'admin@emplora.com', role: 'admin' },
    { id: 'user-hr', name: 'Sarah HR', email: 'hr@emplora.com', role: 'hr' },
    { id: 'user-manager', name: 'Mike Manager', email: 'manager@emplora.com', role: 'manager' },
    { id: 'user-employee', name: 'Emily Employee', email: 'employee@emplora.com', role: 'employee' },
];

export const employees = [
    { id: 'emp1', userId: 'user-admin', firstName: 'John', lastName: 'Admin', managerId: null, role: 'admin' },
    { id: 'emp2', userId: 'user-manager', firstName: 'Mike', lastName: 'Manager', managerId: 'emp1', role: 'manager' },
    { id: 'emp3', userId: 'user-employee', firstName: 'Emily', lastName: 'Employee', managerId: 'emp2', role: 'employee' },
    { id: 'emp4', userId: 'user-hr', firstName: 'Sarah', lastName: 'HR', managerId: 'emp1', role: 'hr' },
];

export const payslips = [
    { id: 'ps1', employeeId: 'emp3', month: new Date().getMonth() + 1, year: new Date().getFullYear(), salary: 5000, allowances: [{type: 'Housing', amount: 500}], deductions: [{type: 'Tax', amount: 1000}], netPay: 4500, status: 'paid', generatedDate: new Date().toISOString() },
    { id: 'ps2', employeeId: 'emp2', month: new Date().getMonth() + 1, year: new Date().getFullYear(), salary: 8000, allowances: [{type: 'Housing', amount: 1000}], deductions: [{type: 'Tax', amount: 2000}], netPay: 7000, status: 'paid', generatedDate: new Date().toISOString() },
    { id: 'ps3', employeeId: 'emp3', month: new Date().getMonth(), year: new Date().getFullYear(), salary: 5000, allowances: [{type: 'Housing', amount: 500}], deductions: [{type: 'Tax', amount: 1000}], netPay: 4500, status: 'paid', generatedDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString() },
];

export const leaveRequests = [
    { id: 'lr1', employeeId: 'emp3', type: 'vacation', startDate: '2024-08-10', endDate: '2024-08-15', status: 'approved', createdAt: new Date().toISOString() },
    { id: 'lr2', employeeId: 'emp2', type: 'sick', startDate: '2024-07-20', endDate: '2024-07-21', status: 'pending', createdAt: new Date().toISOString() },
    { id: 'lr3', employeeId: 'emp3', type: 'sick', startDate: '2024-07-22', endDate: '2024-07-22', status: 'rejected', createdAt: new Date().toISOString() },
];

export const leaveBalances = [
    { employeeId: 'emp3', type: 'vacation', entitled: 20, used: 5, remaining: 15 },
    { employeeId: 'emp3', type: 'sick', entitled: 10, used: 2, remaining: 8 },
    { employeeId: 'emp3', type: 'casual', entitled: 5, used: 0, remaining: 5 },
    { employeeId: 'emp2', type: 'vacation', entitled: 25, used: 10, remaining: 15 },
    { employeeId: 'emp2', type: 'sick', entitled: 10, used: 1, remaining: 9 },
    { employeeId: 'emp2', type: 'casual', entitled: 5, used: 2, remaining: 3 },
    { employeeId: 'emp1', type: 'vacation', entitled: 30, used: 5, remaining: 25 },
    { employeeId: 'emp4', type: 'vacation', entitled: 25, used: 8, remaining: 17 },
];

let loggedInUser = null;

export const login = (email, password) => {
  // Simple mock login, ignore password
  const user = users.find(u => u.email === email);
  if (user) {
    loggedInUser = user;
    sessionStorage.setItem('emplora-user', JSON.stringify(user));
    return user;
  }
  return null;
};

export const logout = () => {
  loggedInUser = null;
  sessionStorage.removeItem('emplora-user');
};

export const getCurrentUser = () => {
  if (loggedInUser) return loggedInUser;
  const storedUser = sessionStorage.getItem('emplora-user');
  if (storedUser) {
    loggedInUser = JSON.parse(storedUser);
    return loggedInUser;
  }
  return null;
};


// --- Trip Planner Data ---

export const mockDestinations = [
  {
    id: '1',
    name: 'Bali',
    country: 'Indonesia',
    imageUrl: 'https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg',
    rating: 4.8,
    priceLevel: 'moderate',
    description: 'Experience the beautiful beaches and vibrant culture of Bali.',
    categories: ['relaxation', 'culture', 'nature'],
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
    description: 'Discover the art, fashion, and gastronomy of Paris.',
    categories: ['culture', 'urban', 'art'],
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
    weatherInfo: {
      temperature: 26,
      condition: 'sunny',
      forecast: [
        { date: '2024-07-15', temperature: { max: 28, min: 22 }, condition: 'sunny' },
        { date: '2024-07-16', temperature: { max: 30, min: 24 }, condition: 'sunny' },
        { date: '2024-07-17', temperature: { max: 27, min: 21 }, condition: 'partly cloudy' }
      ]
    }
  }
];

export const getRecommendedDestinations = (user) => {
  return user ? mockDestinations : mockDestinations.slice(0, 2);
};

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