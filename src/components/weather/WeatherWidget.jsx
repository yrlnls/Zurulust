import React from 'react';
import { Sun, Cloud, CloudRain, CloudLightning, Snowflake, CloudDrizzle, CloudSun } from 'lucide-react';

const WeatherWidget = ({ weatherInfo, compact = false }) => {
  // Helper function to get the appropriate weather icon
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="text-amber-500" />;
      case 'cloudy':
        return <Cloud className="text-gray-500" />;
      case 'partly cloudy':
        return <CloudSun className="text-amber-400" />;
      case 'rainy':
        return <CloudRain className="text-blue-500" />;
      case 'stormy':
        return <CloudLightning className="text-purple-500" />;
      case 'snowy':
        return <Snowflake className="text-blue-300" />;
      case 'drizzle':
        return <CloudDrizzle className="text-blue-400" />;
      default:
        return <Sun className="text-amber-500" />;
    }
  };

  if (compact) {
    return (
      <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
        <div className="w-9 h-9">
          {getWeatherIcon(weatherInfo.condition)}
        </div>
        <div className="ml-2">
          <div className="text-lg font-semibold">{weatherInfo.temperature}°C</div>
          <div className="text-xs text-gray-500">{weatherInfo.condition}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-bold text-gray-800 mb-3">Weather Forecast</h3>
      
      <div className="flex items-center mb-4 p-3 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg">
        <div className="w-12 h-12">
          {getWeatherIcon(weatherInfo.condition)}
        </div>
        <div className="ml-3">
          <div className="text-2xl font-bold">{weatherInfo.temperature}°C</div>
          <div className="text-gray-600">{weatherInfo.condition}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {weatherInfo.forecast.map((day, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center p-2 border border-gray-100 rounded-lg"
          >
            <div className="text-xs text-gray-500">
              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className="w-6 h-6 my-1">
              {getWeatherIcon(day.condition)}
            </div>
            <div className="text-xs flex space-x-1">
              <span className="font-medium">{day.temperature.max}°</span>
              <span className="text-gray-500">{day.temperature.min}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget;