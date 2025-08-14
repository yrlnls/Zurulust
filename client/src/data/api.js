// api.js

const API_URL = 'https://api.example.com';

// Example API call function
export const fetchDestinations = async () => {
  try {
    const response = await fetch(`${API_URL}/destinations`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    throw error;
  }
};

// Example of a function to get a destination by ID
export const getDestinationById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/destinations/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching destination by ID:', error);
    throw error;
  }
};

// Add more API functions as needed...