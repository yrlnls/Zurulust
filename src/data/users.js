// Extended user database with more diverse profiles
export const users = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    preferences: {
      budget: 'moderate',
      interests: ['adventure', 'culture'],
      travelStyle: ['backpacking', 'cultural']
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
  },
  {
    id: 'user-3',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    preferences: {
      budget: 'budget',
      interests: ['adventure', 'nature'],
      travelStyle: ['backpacking', 'adventure']
    }
  },
  {
    id: 'user-4',
    name: 'Maria Garcia',
    email: 'maria@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    preferences: {
      budget: 'moderate',
      interests: ['culture', 'art', 'history'],
      travelStyle: ['cultural', 'educational']
    }
  },
  {
    id: 'user-5',
    name: 'David Chen',
    email: 'david@example.com',
    avatar: 'https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&w=150',
    preferences: {
      budget: 'luxury',
      interests: ['relaxation', 'luxury', 'food'],
      travelStyle: ['luxury', 'culinary']
    }
  },
  {
    id: 'user-6',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=150',
    preferences: {
      budget: 'moderate',
      interests: ['nature', 'wildlife', 'adventure'],
      travelStyle: ['eco-tourism', 'adventure']
    }
  },
  {
    id: 'user-7',
    name: 'Michael Brown',
    email: 'michael@example.com',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
    preferences: {
      budget: 'budget',
      interests: ['culture', 'history', 'urban'],
      travelStyle: ['backpacking', 'cultural']
    }
  },
  {
    id: 'user-8',
    name: 'Emma Davis',
    email: 'emma@example.com',
    avatar: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=150',
    preferences: {
      budget: 'luxury',
      interests: ['relaxation', 'spa', 'luxury'],
      travelStyle: ['luxury', 'wellness']
    }
  }
];

export const getUserById = (id) => {
  return users.find(user => user.id === id);
};

export const getUserByEmail = (email) => {
  return users.find(user => user.email === email);
};