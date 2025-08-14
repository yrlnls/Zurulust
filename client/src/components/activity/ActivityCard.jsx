import React from 'react';
import { Clock, DollarSign, Star, MapPin, Plus } from 'lucide-react';
import Button from '../ui/Button';

// Remove TypeScript interface and types
function ActivityCard({ 
  activity, 
  onAddToItinerary,
  compact = false 
}) {
  const { name, description, imageUrl, duration, price, rating, categories } = activity;
  
  // Helper function to format price display
  const formatPrice = (price) => {
    if (price === 0) return 'Free';
    return `$${price}`;
  };
  
  if (compact) {
    return (
      <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-16 h-16 object-cover rounded"
        />
        <div className="ml-3 flex-1">
          <h4 className="font-medium text-gray-800">{name}</h4>
          <div className="flex items-center mt-1">
            <Clock className="w-3 h-3 mr-1 text-gray-500" />
            <span className="text-xs text-gray-500 mr-3">{duration} hrs</span>
            <DollarSign className="w-3 h-3 mr-1 text-gray-500" />
            <span className="text-xs text-gray-500">{formatPrice(price)}</span>
          </div>
        </div>
        {onAddToItinerary && (
          <Button variant="outline" size="sm" onClick={onAddToItinerary}>
            <Plus className="w-4 h-4" />
          </Button>
        )}
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-teal-600 text-white px-2 py-1 rounded-md flex items-center text-sm font-medium">
          <Star className="w-4 h-4 mr-1 fill-current" />
          {rating}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        
        <div className="mt-2 flex items-center space-x-4">
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{duration} hours</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <DollarSign className="w-4 h-4 mr-1" />
            <span className="text-sm">{formatPrice(price)}</span>
          </div>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-1">
          {Array.isArray(categories) && categories.map((category, index) => (
            <span 
              key={index}
              className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
            >
              {category}
            </span>
          ))}
        </div>
        
        <p className="mt-3 text-sm text-gray-600 line-clamp-3">{description}</p>
        
        {onAddToItinerary && (
          <div className="mt-4">
            <Button 
              fullWidth 
              variant="primary" 
              onClick={onAddToItinerary}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add to Itinerary
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivityCard;