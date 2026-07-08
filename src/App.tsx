import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import VendorDetail from './pages/VendorDetail';
import VendorDashboard from './pages/VendorDashboard';
import Planning from './pages/Planning';
import UserDashboard from './pages/UserDashboard';
import Login from './pages/Login';
import EInvitation from './pages/EInvitation';
import Admin from './pages/Admin';
import FloatingAI from './components/FloatingAI';
import Toast from './components/Toast';
import { BookingProvider } from './context/BookingContext';

function App() {
  return (
    <BookingProvider>
      <Router>
        {/* Global Fixed Background */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
          <img 
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Wedding Atmospheric" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }}
          />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(9,9,9,0.3) 0%, rgba(9,9,9,0.9) 100%)' }}></div>
        </div>
        <Header />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/vendor/:id" element={<VendorDetail />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/e-invitation" element={<EInvitation />} />
          <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
        <FloatingAI />
        <Toast />
      </Router>
    </BookingProvider>
  );
}

export default App;
