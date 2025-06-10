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
  },
  {
    id: '2',
    name: 'Paris',
    country: 'France',
    imageUrl: 'https://images.pexels.com/photos/736402/pexels-photo-736402.jpeg',
    rating: 4.7,
    priceLevel: 'luxury',
    description: 'Discover the art, fashion, and gastronomy of Paris.',
  },
];

export const getRecommendedDestinations = (user) => {
  return user ? mockDestinations : mockDestinations.slice(0, 2);
};

export const getActivitiesForDestination = (destinationId) => {
  return [
    { id: 'act1', name: 'Surfing Lesson', destinationId: '1' },
    { id: 'act2', name: 'Temple Tour', destinationId: '1' },
    { id: 'act3', name: 'Eiffel Tower Visit', destinationId: '2' },
    { id: 'act4', name: 'Louvre Museum Tour', destinationId: '2' },
  ].filter(act => act.destinationId === destinationId);
};

export const mockTrips = [
  {
    id: 'trip-1',
    name: 'Bali Adventure',
    destinations: [
      { id: '1', name: 'Bali', country: 'Indonesia' }
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

// The old mockUsers is being replaced by the HR `users` export.
// If any part of the trip planner app needs it, it should be adapted to use the main `users` export.
export const mockUsers = users;