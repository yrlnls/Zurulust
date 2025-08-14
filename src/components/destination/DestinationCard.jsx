import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, ThermometerSun, ExternalLink } from 'lucide-react';
import Button from '../ui/Button';

const DestinationCard = ({ 
  destination, 
  onAddToTrip,
  showDetails = false 
}) => {
  const { id, name, country, imageUrl, rating, priceLevel, weatherInfo } = destination;

  const priceLevelDisplay = {
    budget: '$ Budget Friendly',
    moderate: '$$ Moderate',
    luxury: '$$$ Luxury'
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-3 right-3 bg-teal-600 text-white px-2 py-1 rounded-md flex items-center text-sm font-medium">
          <Star className="w-4 h-4 mr-1 fill-current" />
          {rating}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        <div className="flex items-center text-gray-600 mt-1">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{country}</span>
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <span className="text-sm text-gray-600">{priceLevelDisplay[priceLevel]}</span>
          
          {weatherInfo && (
            <div className="flex items-center">
              <ThermometerSun className="w-4 h-4 mr-1 text-amber-500" />
              <span className="text-sm">{weatherInfo.temperature}°C</span>
            </div>
          )}
        </div>
        
        {showDetails && (
          <p className="mt-3 text-sm text-gray-600 line-clamp-3">{destination.description}</p>
        )}
        
        {/* Image source link */}
        <div className="mt-2">
          <a 
            href={imageUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs text-gray-500 hover:text-teal-600 transition-colors"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            View Image Source
          </a>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <Link to={`/destinations/${id}`} className="flex-1">
            <Button variant="outline" fullWidth>
              View Details
            </Button>
          </Link>
          
          {onAddToTrip && (
            <Button onClick={onAddToTrip} fullWidth>
              Add to Trip
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
