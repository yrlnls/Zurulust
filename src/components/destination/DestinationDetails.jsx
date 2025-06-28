import React, { useState, useEffect } from 'react';
import { MapPin, Star, Thermometer, Users, Calendar, Wifi, Car, Utensils } from 'lucide-react';
import { getCountryInfo, getWeatherInfo, getNearbyAttractions, getNearbyHotels } from '../../services/travelApi';
import WeatherWidget from '../weather/WeatherWidget';
import Button from '../ui/Button';

const DestinationDetails = ({ destination, onAddToTrip }) => {
  const [countryInfo, setCountryInfo] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchDestinationData = async () => {
      setLoading(true);
      
      try {
        const [country, weather, nearbyAttractions, nearbyHotels] = await Promise.all([
          getCountryInfo(destination.country),
          getWeatherInfo(destination.coordinates.lat, destination.coordinates.lng),
          getNearbyAttractions(destination.coordinates.lat, destination.coordinates.lng),
          getNearbyHotels(destination.coordinates.lat, destination.coordinates.lng)
        ]);
        
        setCountryInfo(country);
        setWeatherInfo(weather);
        setAttractions(nearbyAttractions);
        setHotels(nearbyHotels);
      } catch (error) {
        console.error('Error fetching destination data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (destination) {
      fetchDestinationData();
    }
  }, [destination]);

  if (!destination) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: MapPin },
    { id: 'attractions', label: 'Attractions', icon: Star },
    { id: 'hotels', label: 'Hotels', icon: Users }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="relative h-64">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-3xl font-bold">{destination.name}</h1>
          <div className="flex items-center mt-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{destination.country}</span>
            {countryInfo?.flag && (
              <img src={countryInfo.flag} alt={destination.country} className="w-6 h-4 ml-2" />
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading destination details...</p>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">About {destination.name}</h3>
                  <p className="text-gray-600">{destination.description}</p>
                </div>

                {countryInfo && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Country Information</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Capital</p>
                        <p className="font-medium">{countryInfo.capital}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Population</p>
                        <p className="font-medium">{countryInfo.population?.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Region</p>
                        <p className="font-medium">{countryInfo.region}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Currency</p>
                        <p className="font-medium">
                          {countryInfo.currencies?.[0]?.name || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {weatherInfo && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Current Weather</h3>
                    <WeatherWidget weatherInfo={weatherInfo} />
                  </div>
                )}

                <div className="flex justify-end">
                  <Button onClick={() => onAddToTrip(destination)}>
                    Add to Trip
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'attractions' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Popular Attractions</h3>
                {attractions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {attractions.map((attraction) => (
                      <div key={attraction.id} className="border border-gray-200 rounded-lg p-4">
                        <img
                          src={attraction.imageUrl}
                          alt={attraction.name}
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <h4 className="font-semibold">{attraction.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{attraction.category}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span className="text-sm">{attraction.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {Math.round(attraction.distance)}m away
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No attractions found for this destination.</p>
                )}
              </div>
            )}

            {activeTab === 'hotels' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Recommended Hotels</h3>
                {hotels.length > 0 ? (
                  <div className="space-y-4">
                    {hotels.map((hotel) => (
                      <div key={hotel.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex flex-col md:flex-row">
                          <img
                            src={hotel.imageUrl}
                            alt={hotel.name}
                            className="w-full md:w-48 h-32 object-cover rounded-md mb-4 md:mb-0 md:mr-4"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-lg">{hotel.name}</h4>
                              <div className="text-right">
                                <p className="text-lg font-bold text-teal-600">
                                  ${hotel.pricePerNight}
                                </p>
                                <p className="text-sm text-gray-500">per night</p>
                              </div>
                            </div>
                            <div className="flex items-center mb-2">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span className="text-sm">{hotel.rating}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{hotel.address}</p>
                            <div className="flex flex-wrap gap-2">
                              {hotel.amenities.map((amenity, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800"
                                >
                                  {amenity === 'WiFi' && <Wifi className="h-3 w-3 mr-1" />}
                                  {amenity === 'Parking' && <Car className="h-3 w-3 mr-1" />}
                                  {amenity === 'Restaurant' && <Utensils className="h-3 w-3 mr-1" />}
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No hotels found for this destination.</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DestinationDetails;