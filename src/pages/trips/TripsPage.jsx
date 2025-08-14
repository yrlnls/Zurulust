import React, { useState } from 'react';
import { Plus, Calendar, MapPin, Filter, Search } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTrip } from '../../hooks/useTrip';
import TripCard from '../../components/trip/TripCard';
import GoogleMap from '../../components/map/GoogleMap';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const TripsPage = () => {
  const { currentUser } = useAuth();
  const { trips, deleteTrip } = useTrip();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showMap, setShowMap] = useState(false);

  // Filter trips based on search and status
  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.destinations.some(dest => 
                           dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dest.country.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    
    const matchesStatus = statusFilter === 'all' || trip.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Get all destinations from all trips for map view
  const getAllTripDestinations = () => {
    const allDestinations = [];
    filteredTrips.forEach(trip => {
      trip.destinations.forEach(dest => {
        if (!allDestinations.find(d => d.id === dest.id)) {
          allDestinations.push(dest);
        }
      });
    });
    return allDestinations;
  };

  const handleDeleteTrip = (tripId) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      deleteTrip(tripId);
    }
  };

  if (!currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Please sign in to view your trips</h2>
        <p className="mt-2 text-gray-500">Create an account to start planning your adventures.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            My Trips
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Plan and manage your travel adventures
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button
            variant="outline"
            onClick={() => setShowMap(!showMap)}
            leftIcon={<MapPin className="h-5 w-5" />}
          >
            {showMap ? 'Hide Map' : 'Show Map'}
          </Button>
          <Button
            leftIcon={<Plus className="h-5 w-5" />}
          >
            Create Trip
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-8 bg-white shadow overflow-hidden rounded-lg">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search trips or destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="h-5 w-5" />}
                fullWidth
              />
            </div>
            <div className="sm:w-48">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="all">All Trips</option>
                  <option value="planning">Planning</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Map View */}
        {showMap && (
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Trip Destinations</h3>
            <GoogleMap
              destinations={getAllTripDestinations()}
              height="400px"
            />
          </div>
        )}

        {/* Trips Grid */}
        {filteredTrips.length === 0 ? (
          <div className="py-16 text-center">
            <div className="flex justify-center">
              <Calendar className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {trips.length === 0 ? 'No trips yet' : 'No trips match your search'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {trips.length === 0 
                ? 'Start planning your first adventure!'
                : 'Try adjusting your search or filters'
              }
            </p>
            {trips.length === 0 && (
              <div className="mt-6">
                <Button leftIcon={<Plus className="h-5 w-5" />}>
                  Create Your First Trip
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onDelete={() => handleDeleteTrip(trip.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripsPage;