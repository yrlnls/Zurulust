import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Globe, PlaneLanding } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center">
              <PlaneLanding className="h-8 w-8 text-teal-400" />
              <span className="ml-2 text-xl font-bold">Wanderlust</span>
            </div>
            <p className="mt-2 text-sm text-gray-300">
              Discover the world on your terms. Plan your perfect trip with us.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Destinations</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/destinations/europe" className="text-base text-gray-300 hover:text-teal-400 transition-colors">Europe</Link>
              </li>
              <li>
                <Link to="/destinations/asia" className="text-base text-gray-300 hover:text-teal-400 transition-colors">Asia</Link>
              </li>
              <li>
                <Link to="/destinations/africa" className="text-base text-gray-300 hover:text-teal-400 transition-colors">Africa</Link>
              </li>
              <li>
                <Link to="/destinations/americas" className="text-base text-gray-300 hover:text-teal-400 transition-colors">Americas</Link>
              </li>
              <li>
                <Link to="/destinations/oceania" className="text-base text-gray-300 hover:text-teal-400 transition-colors">Oceania</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Travel Styles</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/styles/adventure" className="text-base text-gray-300 hover:text-teal-400 transition-colors">Adventure</Link>
              </li>
              <li>
                <Link to="/styles/relaxation" className="text-base text-gray-300 hover:text-teal-400 transition-colors">Relaxation</Link>
              </li>
              <li>
                <Link to="/styles/culture" className="text-base text-gray-300 hover:text-teal-400 transition-colors">Culture</Link>
              </li>
              <li>
                <Link to="/styles/nature" className="text-base text-gray-300 hover:text-teal-400 transition-colors">Nature</Link>
              </li>
              <li>
                <Link to="/styles/urban" className="text-base text-gray-300 hover:text-teal-400 transition-colors">Urban</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-base text-gray-300 hover:text-teal-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-300 hover:text-teal-400 transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/blog" className="text-base text-gray-300 hover:text-teal-400 transition-colors">Travel Blog</Link>
              </li>
              <li>
                <Link to="/terms" className="text-base text-gray-300 hover:text-teal-400 transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-base text-gray-300 hover:text-teal-400 transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 md:order-2">
              <a href="mailto:info@wanderlust.com" className="text-gray-400 hover:text-teal-400 flex items-center transition-colors">
                <Mail className="h-5 w-5 mr-2" />
                <span>info@wanderlust.com</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 flex items-center transition-colors">
                <Globe className="h-5 w-5 mr-2" />
                <span>English (US)</span>
              </a>
            </div>
            <p className="mt-4 md:mt-0 text-base text-gray-400 md:order-1">
              &copy; {new Date().getFullYear()} Wanderlust. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;