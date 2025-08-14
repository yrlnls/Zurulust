import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Compass, TrendingUp, Heart, Plane, Star } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import DestinationCard from '../components/destination/DestinationCard';
import { mockDestinations } from '../data/mockData';

const HomePage = () => {
  // Take top 4 destinations for featured section
  const featuredDestinations = mockDestinations.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[600px]" style={{ backgroundImage: "url('https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
              <span className="block">Discover Your</span>
              <span className="block text-teal-400">Perfect Journey</span>
            </h1>
            <p className="mt-6 text-xl text-white">
              Plan your dream trip with smart suggestions based on your preferences, budget, and interests.
            </p>
            <div className="mt-10">
              <Link to="/explore">
                <Button size="lg" leftIcon={<Compass />}>
                  Start Exploring
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="bg-white shadow-md py-6 relative z-10 -mt-12 rounded-lg mx-auto max-w-5xl px-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Where to?"
              leftIcon={<MapPin className="h-4 w-4" />}
              fullWidth
            />
          </div>
          <div className="flex-1">
            <Input
              type="date"
              placeholder="When?"
              leftIcon={<Calendar className="h-4 w-4" />}
              fullWidth
            />
          </div>
          <div>
            <Button leftIcon={<Search className="h-4 w-4" />}>
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Plan Smarter, Travel Better</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our travel planning platform helps you create the perfect trip with personalized recommendations and tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto bg-teal-100 rounded-full flex items-center justify-center">
                <Compass className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Smart Recommendations</h3>
              <p className="mt-2 text-gray-500">
                Get personalized destination and activity suggestions based on your preferences and budget.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto bg-teal-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Intelligent Itineraries</h3>
              <p className="mt-2 text-gray-500">
                Build detailed day-by-day plans with optimized routes to maximize your travel experience.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto bg-teal-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Real-Time Updates</h3>
              <p className="mt-2 text-gray-500">
                Receive weather forecasts and local event notifications to help you plan your activities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Destinations</h2>
            <Link to="/explore" className="text-teal-600 hover:text-teal-800 font-medium flex items-center">
              View all
              <svg className="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map(destination => (
              <DestinationCard
                key={destination.id}
                destination={destination}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to start your adventure?</h2>
          <p className="mt-4 text-xl text-teal-100 max-w-2xl mx-auto">
            Create your account today and begin planning your next unforgettable journey.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link to="/signup">
              <Button 
                variant="secondary" 
                size="lg"
                leftIcon={<Plane className="h-5 w-5" />}
              >
                Start Planning
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Travelers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Wanderlust made planning our honeymoon so easy! The recommendations were spot on, and we discovered places we never would have found otherwise."
              </p>
              <div className="mt-6 flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                  <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150" alt="Avatar" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Trip to Bali</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The itinerary planner is a game-changer! It automatically organized our days to minimize travel time and maximize experiences."
              </p>
              <div className="mt-6 flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                  <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150" alt="Avatar" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Michael Chen</h4>
                  <p className="text-sm text-gray-500">Trip to Japan</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I love how I could share my trip plans with friends and they could contribute suggestions. Made planning our group vacation so much easier!"
              </p>
              <div className="mt-6 flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                  <img src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150" alt="Avatar" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">Jessica Rivera</h4>
                  <p className="text-sm text-gray-500">Trip to Barcelona</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;