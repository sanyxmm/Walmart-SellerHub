import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Analytics from './components/Analytics';
import Chatbot from './components/Chatbot';
import OrderFulfillment from './components/OrderFulfillment';
import OCRScanner from './components/OCRScanner';
import PolarisOptimizer from './components/PolarisOptimizer';
import Gamification from './components/Gamification';
import { Login } from './components/Login';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOpen,   setIsOpen]    = useState(true);   // start expanded
const [isLoggedIn, setIsLoggedIn] = useState(() => {
  return localStorage.getItem('isLoggedIn') === 'true';
});

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      case 'analytics':
        return <Analytics />;
      case 'chatbot':
        return <Chatbot />;
      case 'orders':
        return <OrderFulfillment />;
      case 'ocr':
        return <OCRScanner />;
      case 'optimizer':
        return <PolarisOptimizer />;
      case 'gamification':
        return <Gamification />;
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Configure your account and preferences</p>
            <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <p className="text-gray-600">Settings panel coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };
  if (!isLoggedIn) {
    return <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />;
  }
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab}  isOpen={isOpen} toggleOpen={() => setIsOpen(!isOpen)}   handleLogout={handleLogout} />
      <div className={`flex-1 p-6 transition-[margin] duration-300 ease-in-out
                        ${isOpen ? 'md:ml-44' : 'md:ml-12'}`}>
        {renderContent()}
      </div>
    </div>
  );
}

export default App;