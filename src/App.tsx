import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import AppRoutes from './routes';
import Footer from './components/Footer';

function App() {
  const location = useLocation();
  const hideFooter = location.pathname === '/list-spot' || location.pathname.includes('/host/spots/') && location.pathname.includes('/edit') || location.pathname.startsWith('/host') || location.pathname.startsWith('/admin');
  const hideNavbar = location.pathname === '/list-spot' || location.pathname.includes('/host/spots/') && location.pathname.includes('/edit');

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideNavbar && <Navbar />}
      <AppRoutes />
      {!hideFooter && <Footer />}
      <Toaster position="top-center" />
    </div>
  );
}

export default App;