import React, { useState, useEffect } from 'react';
import { Search, MapPin, Tag, DollarSign, Filter, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { mockDestinations, getRecommendedDestinations } from '../../data/mockData';
import DestinationCard from '../../components/destination/DestinationCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const ExplorePage = () => {
  const { currentUser } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [destinations, setDestinations] = useState(mockDestinations);
  const [filteredDestinations, setFilteredDestinations] = useState(mockDestinations);
  
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
        selectedStyles.some(style => dest.categories.includes(style))
      );
    }
    
    // Filter by budget
    if (selectedBudget) {
      filtered = filtered.filter(dest => dest.priceLevel === selectedBudget);
    }
    
    setFilteredDestinations(filtered);
  }, [searchTerm, destinations, selectedStyles, selectedBudget]);
  
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
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            Explore Destinations
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Discover your next perfect getaway
          </p>
        </div>
      </div>
      
      <div className="mt-8 bg-white shadow overflow-hidden rounded-lg">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="h-5 w-5" />}
                fullWidth
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
              Try changing your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {filteredDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                showDetails
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;