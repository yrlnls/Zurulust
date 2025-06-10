import { useState, createContext, useContext } from 'react';
import { mockTrips, getActivitiesForDestination } from '../data/mockData';

const TripContext = createContext(undefined);

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [currentTrip, setCurrentTripState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createTrip = (tripData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newTrip = {
        ...tripData,
        id: `trip-${Date.now()}`
      };
      
      setTrips(prevTrips => [...prevTrips, newTrip]);
      setCurrentTripState(newTrip);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to create trip');
      setIsLoading(false);
    }
  };

  const updateTrip = (updatedTrip) => {
    setIsLoading(true);
    setError(null);
    
    try {
      setTrips(prevTrips => 
        prevTrips.map(trip => 
          trip.id === updatedTrip.id ? updatedTrip : trip
        )
      );
      
      if (currentTrip && currentTrip.id === updatedTrip.id) {
        setCurrentTripState(updatedTrip);
      }
      
      setIsLoading(false);
    } catch (err) {
      setError('Failed to update trip');
      setIsLoading(false);
    }
  };

  const deleteTrip = (tripId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      setTrips(prevTrips => prevTrips.filter(trip => trip.id !== tripId));
      
      if (currentTrip && currentTrip.id === tripId) {
        setCurrentTripState(null);
      }
      
      setIsLoading(false);
    } catch (err) {
      setError('Failed to delete trip');
      setIsLoading(false);
    }
  };

  const selectCurrentTrip = (tripId) => {
    const trip = trips.find(t => t.id === tripId);
    setCurrentTripState(trip || null);
  };

  const addDestinationToTrip = (tripId, destination) => {
    setTrips(prevTrips => 
      prevTrips.map(trip => {
        if (trip.id === tripId) {
          const updatedDestinations = [...trip.destinations, destination];
          return { ...trip, destinations: updatedDestinations };
        }
        return trip;
      })
    );
    
    if (currentTrip && currentTrip.id === tripId) {
      setCurrentTripState({
        ...currentTrip,
        destinations: [...currentTrip.destinations, destination]
      });
    }
  };

  const removeDestinationFromTrip = (tripId, destinationId) => {
    setTrips(prevTrips => 
      prevTrips.map(trip => {
        if (trip.id === tripId) {
          const updatedDestinations = trip.destinations.filter(d => d.id !== destinationId);
          return { ...trip, destinations: updatedDestinations };
        }
        return trip;
      })
    );
    
    if (currentTrip && currentTrip.id === tripId) {
      setCurrentTripState({
        ...currentTrip,
        destinations: currentTrip.destinations.filter(d => d.id !== destinationId)
      });
    }
  };

  const addActivityToDay = (tripId, day, activity) => {
    setTrips(prevTrips => 
      prevTrips.map(trip => {
        if (trip.id === tripId) {
          const updatedItinerary = trip.itinerary.map(itineraryDay => {
            if (itineraryDay.day === day) {
              return {
                ...itineraryDay,
                activities: [...itineraryDay.activities, activity]
              };
            }
            return itineraryDay;
          });
          
          return { ...trip, itinerary: updatedItinerary };
        }
        return trip;
      })
    );
    
    if (currentTrip && currentTrip.id === tripId) {
      setCurrentTripState({
        ...currentTrip,
        itinerary: currentTrip.itinerary.map(itineraryDay => {
          if (itineraryDay.day === day) {
            return {
              ...itineraryDay,
              activities: [...itineraryDay.activities, activity]
            };
          }
          return itineraryDay;
        })
      });
    }
  };

  const removeActivityFromDay = (tripId, day, activityId) => {
    setTrips(prevTrips => 
      prevTrips.map(trip => {
        if (trip.id === tripId) {
          const updatedItinerary = trip.itinerary.map(itineraryDay => {
            if (itineraryDay.day === day) {
              return {
                ...itineraryDay,
                activities: itineraryDay.activities.filter(a => a.activityId !== activityId)
              };
            }
            return itineraryDay;
          });
          
          return { ...trip, itinerary: updatedItinerary };
        }
        return trip;
      })
    );
    
    if (currentTrip && currentTrip.id === tripId) {
      setCurrentTripState({
        ...currentTrip,
        itinerary: currentTrip.itinerary.map(itineraryDay => {
          if (itineraryDay.day === day) {
            return {
              ...itineraryDay,
              activities: itineraryDay.activities.filter(a => a.activityId !== activityId)
            };
          }
          return itineraryDay;
        })
      });
    }
  };

  return (
    <TripContext.Provider
      value={{
        trips,
        currentTrip,
        isLoading,
        error,
        createTrip,
        updateTrip,
        deleteTrip,
        setCurrentTrip: selectCurrentTrip,
        addDestinationToTrip,
        removeDestinationFromTrip,
        addActivityToDay,
        removeActivityFromDay
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};