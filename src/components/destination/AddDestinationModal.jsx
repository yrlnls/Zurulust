import React, { useState } from 'react';
import { X, MapPin, Star, DollarSign, Tag, Image, Globe } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const AddDestinationModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    description: '',
    imageUrl: '',
    rating: 4.0,
    priceLevel: 'moderate',
    categories: [],
    coordinates: { lat: 0, lng: 0 }
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const priceLevels = [
    { value: 'budget', label: 'Budget Friendly' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'luxury', label: 'Luxury' }
  ];

  const availableCategories = [
    'adventure', 'relaxation', 'culture', 'nature', 'urban', 
    'history', 'art', 'food', 'nightlife', 'luxury', 'wildlife', 'unique'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleCategoryToggle = (category) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Destination name is required';
    }
    
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    }
    
    if (formData.categories.length === 0) {
      newErrors.categories = 'At least one category is required';
    }
    
    if (formData.coordinates.lat === 0 && formData.coordinates.lng === 0) {
      newErrors.coordinates = 'Valid coordinates are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const newDestination = {
        ...formData,
        id: `dest-${Date.now()}`,
        rating: parseFloat(formData.rating),
        coordinates: {
          lat: parseFloat(formData.coordinates.lat),
          lng: parseFloat(formData.coordinates.lng)
        },
        weatherInfo: {
          temperature: Math.floor(Math.random() * 20) + 15,
          condition: ['sunny', 'partly cloudy', 'cloudy'][Math.floor(Math.random() * 3)],
          forecast: []
        }
      };
      
      onAdd(newDestination);
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        country: '',
        description: '',
        imageUrl: '',
        rating: 4.0,
        priceLevel: 'moderate',
        categories: [],
        coordinates: { lat: 0, lng: 0 }
      });
    } catch (error) {
      console.error('Error adding destination:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Add New Destination</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Destination Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  leftIcon={<MapPin className="h-5 w-5 text-gray-400" />}
                  error={errors.name}
                  fullWidth
                  required
                />
                
                <Input
                  label="Country"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  leftIcon={<Globe className="h-5 w-5 text-gray-400" />}
                  error={errors.country}
                  fullWidth
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                  placeholder="Describe what makes this destination special..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                )}
              </div>

              <Input
                label="Image URL"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                leftIcon={<Image className="h-5 w-5 text-gray-400" />}
                error={errors.imageUrl}
                fullWidth
                placeholder="https://images.pexels.com/..."
                helperText="Use high-quality images from Pexels or similar sources"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <div className="relative">
                    <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={(e) => handleInputChange('rating', e.target.value)}
                      className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Level
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={formData.priceLevel}
                      onChange={(e) => handleInputChange('priceLevel', e.target.value)}
                      className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    >
                      {priceLevels.map(level => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Latitude"
                  type="number"
                  step="any"
                  value={formData.coordinates.lat}
                  onChange={(e) => handleInputChange('coordinates', {
                    ...formData.coordinates,
                    lat: e.target.value
                  })}
                  error={errors.coordinates}
                  fullWidth
                  required
                />
                
                <Input
                  label="Longitude"
                  type="number"
                  step="any"
                  value={formData.coordinates.lng}
                  onChange={(e) => handleInputChange('coordinates', {
                    ...formData.coordinates,
                    lng: e.target.value
                  })}
                  fullWidth
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Tag className="inline h-4 w-4 mr-1" />
                  Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableCategories.map(category => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleCategoryToggle(category)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        formData.categories.includes(category)
                          ? 'bg-teal-100 text-teal-800 border border-teal-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
                {errors.categories && (
                  <p className="mt-1 text-sm text-red-500">{errors.categories}</p>
                )}
              </div>
            </form>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <Button
              type="submit"
              onClick={handleSubmit}
              isLoading={isSubmitting}
              className="w-full sm:w-auto sm:ml-3"
            >
              Add Destination
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="mt-3 w-full sm:mt-0 sm:w-auto"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDestinationModal;