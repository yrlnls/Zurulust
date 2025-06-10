import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { TripProvider } from './hooks/useTrip';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import TripsPage from './pages/trips/TripsPage';
import ExplorePage from './pages/explore/ExplorePage';
import DestinationDetailPage from './pages/destination/DestinationDetailPage';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/destinations/:id" element={<DestinationDetailPage />} />
      
      {/* Protected routes */}
      <Route 
        path="/trips" 
        element={
          <ProtectedRoute>
            <TripsPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <TripProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow bg-gray-50">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </Router>
      </TripProvider>
    </AuthProvider>
  );
};

export default App;