import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2, X } from 'lucide-react';
import { searchDestinations } from '../../services/travelApi';
import Input from '../ui/Input';

const DestinationSearch = ({ onDestinationSelect, placeholder = "Search destinations..." }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const searchRef = useRef(null);
  const resultsRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  useEffect(() => {
    const searchDestinationsDebounced = async () => {
      if (query.length < 2) {
        setResults([]);
        setShowResults(false);
        return;
      }
      
      setIsLoading(true);
      try {
        const searchResults = await searchDestinations(query);
        setResults(searchResults);
        setShowResults(true);
        setSelectedIndex(-1);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    const timeoutId = setTimeout(searchDestinationsDebounced, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);
  
  const handleKeyDown = (e) => {
    if (!showResults || results.length === 0) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleDestinationSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        break;
    }
  };
  
  const handleDestinationSelect = (destination) => {
    setQuery(destination.name);
    setShowResults(false);
    setSelectedIndex(-1);
    onDestinationSelect(destination);
  };
  
  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
    setSelectedIndex(-1);
  };
  
  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setShowResults(true)}
          leftIcon={<Search className="h-5 w-5 text-gray-400" />}
          rightIcon={
            query ? (
              <button
                onClick={clearSearch}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            ) : isLoading ? (
              <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
            ) : null
          }
          fullWidth
        />
      </div>
      
      {showResults && (
        <div 
          ref={resultsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-4 text-center">
              <Loader2 className="h-5 w-5 animate-spin mx-auto text-gray-400" />
              <p className="text-sm text-gray-500 mt-2">Searching destinations...</p>
            </div>
          ) : results.length > 0 ? (
            <ul className="py-1">
              {results.map((destination, index) => (
                <li key={destination.id}>
                  <button
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none ${
                      index === selectedIndex ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => handleDestinationSelect(destination)}
                  >
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {destination.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {destination.state && `${destination.state}, `}{destination.country}
                        </p>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center">
              <p className="text-sm text-gray-500">No destinations found</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default DestinationSearch;