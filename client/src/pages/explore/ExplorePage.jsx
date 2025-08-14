import React, { useState, useEffect } from 'react';
import { Search, MapPin, Tag, DollarSign, Filter, X, Info } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { mockDestinations, getRecommendedDestinations } from '../../data/mockData';
import { getApiSetupInstructions } from '../../services/travelApi';
import DestinationCard from '../../components/destination/DestinationCard';
import DestinationSearch from '../../components/search/DestinationSearch';
import DestinationDetails from '../../components/destination/DestinationDetails';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const ExplorePage = () => {
  const { currentUser } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [destinations, setDestinations] = useState(mockDestinations);
  const [filteredDestinations, setFilteredDestinations] = useState(mockDestinations);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showApiInfo, setShowApiInfo] = useState(false);
  
  // Filters
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState('');
  
  // Get recommended destinations for logged in user
  useEffect(() => {
    if (currentUser) {
      const recommended = getRecommendedDestinations(currentUser);
      setDestinations(recommended);
      setFilteredDestinations(recommended);
    } else {
      setDestinations(mockDestinations);
      setFilteredDestinations(mockDestinations);
    }
  }, [currentUser]);
  
  // Filter destinations based on search and filters
  useEffect(() => {
    let filtered = destinations;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        dest => 
          dest.name.toLowerCase().includes(term) || 
          dest.country.toLowerCase().includes(term) ||
          dest.description.toLowerCase().includes(term)
      );
    }
    
    // Filter by travel style
    if (selectedStyles.length > 0) {
      filtered = filtered.filter(dest => 
        selectedStyles.some(style => dest.categories?.includes(style))
      );
    }
    
    // Filter by budget
    if (selectedBudget) {
      filtered = filtered.filter(dest => dest.priceLevel === selectedBudget);
    }
    
    setFilteredDestinations(filtered);
  }, [searchTerm, destinations, selectedStyles, selectedBudget]);
  
  const handleDestinationSelect = (destination) => {
    // Add the searched destination to our list if it's not already there
    const exists = destinations.find(d => d.id === destination.id);
    if (!exists) {
      const newDestinations = [...destinations, destination];
      setDestinations(newDestinations);
      setFilteredDestinations(newDestinations);
    }
    setSelectedDestination(destination);
  };
  
  const handleAddToTrip = (destination) => {
    // This would integrate with the trip planning functionality
    alert(`Added ${destination.name} to your trip!`);
  };
  
  const clearFilters = () => {
    setSelectedStyles([]);
    setSelectedBudget('');
  };
  
  const toggleTravelStyle = (style) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter(s => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };
  
  const travelStyles = ['adventure', 'relaxation', 'culture', 'nature', 'urban'];
  const budgetRanges = ['budget', 'moderate', 'luxury'];
  
  const budgetLabels = {
    budget: 'Budget Friendly',
    moderate: 'Moderate',
    luxury: 'Luxury'
  };

  const apiInstructions = getApiSetupInstructions();
  
  if (selectedDestination) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedDestination(null)}
            leftIcon={<X className="h-5 w-5" />}
          >
            Back to Search
          </Button>
        </div>
        <DestinationDetails 
          destination={selectedDestination} 
          onAddToTrip={handleAddToTrip}
        />
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            Explore Destinations
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Search for any destination worldwide with real-time data
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            variant="outline"
            onClick={() => setShowApiInfo(!showApiInfo)}
            leftIcon={<Info className="h-5 w-5" />}
          >
            API Setup
          </Button>
        </div>
      </div>

      {/* API Setup Information */}
      {showApiInfo && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-blue-900 mb-3">Free API Integration Setup</h3>
          <p className="text-blue-800 mb-4">
            To enable real-time destination search, weather data, and attractions, set up these free APIs:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(apiInstructions).map(([key, api]) => (
              <div key={key} className="bg-white p-3 rounded border">
                <h4 className="font-medium text-gray-900">{api.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{api.description}</p>
                <a 
                  href={api.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Get API Key →
                </a>
              </div>
            ))}
          </div>
          <p className="text-sm text-blue-700 mt-3">
            Update the API keys in <code>src/services/travelApi.js</code> to enable live data.
          </p>
        </div>
      )}
      
      <div className="mt-8 bg-white shadow overflow-hidden rounded-lg">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <DestinationSearch 
                onDestinationSelect={handleDestinationSelect}
                placeholder="Search any destination worldwide..."
              />
            </div>
            <div>
              <Button 
                variant="outline" 
                leftIcon={showFilters ? <X className="h-5 w-5" /> : <Filter className="h-5 w-5" />}
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? 'Hide Filters' : 'Filters'}
              </Button>
            </div>
          </div>
          
          {/* Legacy search for existing destinations */}
          <div className="mt-4">
            <Input
              placeholder="Search existing destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="h-5 w-5" />}
              fullWidth
            />
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 flex items-center">
                    <Tag className="h-4 w-4 mr-2" />
                    Travel Styles
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {travelStyles.map(style => (
                      <button
                        key={style}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          selectedStyles.includes(style)
                            ? 'bg-teal-100 text-teal-800'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                        onClick={() => toggleTravelStyle(style)}
                      >
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Budget Range
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {budgetRanges.map(budget => (
                      <button
                        key={budget}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          selectedBudget === budget
                            ? 'bg-teal-100 text-teal-800'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                        onClick={() => setSelectedBudget(budget === selectedBudget ? '' : budget)}
                      >
                        {budgetLabels[budget]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {(selectedStyles.length > 0 || selectedBudget) && (
                <div className="mt-4 flex justify-end">
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {filteredDestinations.length === 0 ? (
          <div className="py-16 text-center">
            <div className="flex justify-center">
              <MapPin className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No destinations found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try searching for a new destination or changing your filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {filteredDestinations.map((destination) => (
              <div key={destination.id} onClick={() => setSelectedDestination(destination)}>
                <DestinationCard
                  destination={destination}
                  showDetails
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;