import React from 'react';
import { Sun, Cloud, CloudRain, CloudLightning, Snowflake, CloudDrizzle, CloudSun, Thermometer, Droplets, Wind } from 'lucide-react';

const WeatherWidget = ({ weatherInfo, compact = false }) => {
  // Helper function to get the appropriate weather icon
  const getWeatherIcon = (condition, size = 'h-6 w-6') => {
    const iconClass = `${size}`;
    
    switch (condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return <Sun className={`${iconClass} text-amber-500`} />;
      case 'clouds':
      case 'cloudy':
        return <Cloud className={`${iconClass} text-gray-500`} />;
      case 'partly cloudy':
        return <CloudSun className={`${iconClass} text-amber-400`} />;
      case 'rain':
      case 'rainy':
        return <CloudRain className={`${iconClass} text-blue-500`} />;
      case 'thunderstorm':
      case 'stormy':
        return <CloudLightning className={`${iconClass} text-purple-500`} />;
      case 'snow':
      case 'snowy':
        return <Snowflake className={`${iconClass} text-blue-300`} />;
      case 'drizzle':
        return <CloudDrizzle className={`${iconClass} text-blue-400`} />;
      default:
        return <Sun className={`${iconClass} text-amber-500`} />;
    }
  };

  if (compact) {
    return (
      <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
        <div className="w-9 h-9 flex items-center justify-center">
          {getWeatherIcon(weatherInfo.condition, 'h-6 w-6')}
        </div>
        <div className="ml-2">
          <div className="text-lg font-semibold">{weatherInfo.temperature}°C</div>
          <div className="text-xs text-gray-500 capitalize">{weatherInfo.condition}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-bold text-gray-800 mb-3">Current Weather</h3>
      
      <div className="flex items-center mb-4 p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg">
        <div className="w-16 h-16 flex items-center justify-center">
          {getWeatherIcon(weatherInfo.condition, 'h-12 w-12')}
        </div>
        <div className="ml-4 flex-1">
          <div className="text-3xl font-bold">{weatherInfo.temperature}°C</div>
          <div className="text-gray-600 capitalize">{weatherInfo.description || weatherInfo.condition}</div>
        </div>
      </div>
      
      {/* Additional weather details */}
      {(weatherInfo.humidity || weatherInfo.windSpeed) && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {weatherInfo.humidity && (
            <div className="flex items-center">
              <Droplets className="h-4 w-4 text-blue-500 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Humidity</p>
                <p className="font-medium">{weatherInfo.humidity}%</p>
              </div>
            </div>
          )}
          {weatherInfo.windSpeed && (
            <div className="flex items-center">
              <Wind className="h-4 w-4 text-gray-500 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Wind</p>
                <p className="font-medium">{weatherInfo.windSpeed} m/s</p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Forecast */}
      {weatherInfo.forecast && weatherInfo.forecast.length > 0 && (
        <>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">3-Day Forecast</h4>
          <div className="grid grid-cols-3 gap-2">
            {weatherInfo.forecast.slice(0, 3).map((day, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center p-2 border border-gray-100 rounded-lg"
              >
                <div className="text-xs text-gray-500 mb-1">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="w-6 h-6 mb-1 flex items-center justify-center">
                  {getWeatherIcon(day.condition, 'h-5 w-5')}
                </div>
                <div className="text-xs flex space-x-1">
                  <span className="font-medium">{day.temperature.max}°</span>
                  <span className="text-gray-500">{day.temperature.min}°</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;