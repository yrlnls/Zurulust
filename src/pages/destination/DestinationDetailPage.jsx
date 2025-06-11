import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Tag, DollarSign, CalendarPlus, Share2, Heart, Plus } from 'lucide-react';
import { getDestinationById, getActivitiesForDestination } from '../../data/mockData';
import { useTrip } from '../../hooks/useTrip';
import ActivityCard from '../../components/activity/ActivityCard';
import WeatherWidget from '../../components/weather/WeatherWidget';
import Button from '../../components/ui/Button';

const DestinationDetailPage = () => {
  const { id } = useParams();
  const { trips, addDestinationToTrip } = useTrip();
  
  // Get destination and its activities
  const destination = id ? getDestinationById(id) : undefined;
  const activities = id ? getActivitiesForDestination(id) : [];
  
  // Price level display
  const priceLevelDisplay = {
    budget: '$ Budget Friendly',
    moderate: '$$ Moderate',
    luxury: '$$$ Luxury'
  };
  
  if (!destination) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Destination not found</h2>
        <p className="mt-2 text-gray-500">The destination you're looking for doesn't exist.</p>
        <Link to="/explore" className="mt-6 inline-block">
          <Button leftIcon={<ArrowLeft className="h-5 w-5" />}>
            Back to Explore
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-4 mb-6">
        <Link to="/explore">
          <Button variant="ghost" leftIcon={<ArrowLeft className="h-5 w-5" />}>
            Back to Explore
          </Button>
        </Link>
      </div>
      
      {/* Hero Section */}
      <div className="relative h-96 rounded-xl overflow-hidden">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <h1 className="text-4xl font-bold text-white">{destination.name}</h1>
          <div className="flex items-center mt-2 text-white">
            <MapPin className="h-5 w-5 mr-1" />
            <span>{destination.country}</span>
            <div className="ml-4 flex items-center">
              <Star className="h-5 w-5 mr-1 fill-amber-400 text-amber-400" />
              <span>{destination.rating}</span>
            </div>
          </div>
        </div>
        
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            variant="ghost"
            className="bg-white bg-opacity-90 hover:bg-opacity-100"
            leftIcon={<Heart className="h-5 w-5 text-red-500" />}
          >
            Save
          </Button>
          <Button
            variant="ghost"
            className="bg-white bg-opacity-90 hover:bg-opacity-100"
            leftIcon={<Share2 className="h-5 w-5" />}
          >
            Share
          </Button>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About {destination.name}</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{destination.description}</p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-800">
                <DollarSign className="h-4 w-4 mr-1" />
                {priceLevelDisplay[destination.priceLevel]}
              </div>
              
              {Array.isArray(destination.categories) && destination.categories.map((category, index) => (
                <div 
                  key={index} 
                  className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-800"
                >
                  <Tag className="h-4 w-4 mr-1" />
                  {category}
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Top Activities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activities.map(activity => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onAddToItinerary={() => {
                      // This would open a modal to select a trip and day
                      alert(`Add ${activity.name} to itinerary`);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Weather Widget */}
          {destination.weatherInfo && (
            <WeatherWidget weatherInfo={destination.weatherInfo} />
          )}
          
          {/* Add to Trip Widget */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Add to Trip</h3>
            <p className="text-sm text-gray-600 mb-4">
              Add {destination.name} to one of your planned trips or create a new trip.
            </p>
            
            {trips.length > 0 ? (
              <div className="space-y-2">
                {trips
                  .filter(trip => trip.status === 'planning')
                  .slice(0, 3)
                  .map(trip => (
                    <button
                      key={trip.id}
                      className="flex items-center w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => addDestinationToTrip(trip.id, destination)}
                    >
                      <div className="flex-1 text-left">
                        <h4 className="font-medium text-gray-800">{trip.name}</h4>
                        <p className="text-xs text-gray-500">
                          {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Plus className="h-5 w-5" />
                    </button>
                  ))}
                
                <Link to="/trips" className="inline-block mt-4">
                  <Button 
                    variant="outline" 
                    fullWidth 
                    leftIcon={<CalendarPlus className="h-5 w-5" />}
                  >
                    See All Trips
                  </Button>
                </Link>
              </div>
            ) : (
              <Link to="/trips/new">
                <Button 
                  fullWidth 
                  leftIcon={<CalendarPlus className="h-5 w-5" />}
                >
                  Create New Trip
                </Button>
              </Link>
            )}
          </div>
          
          {/* Map Placeholder */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Location</h3>
            <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <MapPin className="h-8 w-8 text-gray-400" />
              <span className="ml-2 text-gray-500">Map view</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailPage;