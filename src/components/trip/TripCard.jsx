import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';
import { formatDateRange, calculateTripDuration } from '../../utils/dateUtils';
import Button from '../ui/Button';

const TripCard = ({ trip, onDelete }) => {
  const { id, name, startDate, endDate, destinations, status } = trip;
  
  const duration = calculateTripDuration(startDate, endDate);
  const dateRange = formatDateRange(startDate, endDate);
  
  const statusColors = {
    planning: 'bg-blue-100 text-blue-800',
    confirmed: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800'
  };
  
  const statusText = {
    planning: 'Planning',
    confirmed: 'Confirmed',
    completed: 'Completed'
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        {destinations.length > 0 ? (
          <img 
            src={destinations[0].imageUrl} 
            alt={name} 
            className="w-full h-44 object-cover"
          />
        ) : (
          <div className="w-full h-44 bg-gray-200 flex items-center justify-center">
            <MapPin className="w-8 h-8 text-gray-400" />
          </div>
        )}
        
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-medium ${statusColors[status]}`}>
          {statusText[status]}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        
        <div className="mt-3 space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">{dateRange} • {duration} days</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {destinations.length > 0
                ? destinations.map(d => d.name).join(', ')
                : 'No destinations yet'}
            </span>
          </div>
          
          {trip.isPublic && (
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">Public trip</span>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex space-x-2">
          <Link to={`/trips/${id}`} className="flex-1">
            <Button fullWidth>View Trip</Button>
          </Link>
          
          {status === 'planning' && onDelete && (
            <Button variant="danger" onClick={onDelete}>
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripCard;