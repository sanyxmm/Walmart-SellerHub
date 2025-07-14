import React from 'react';
import {
  Home,
  Package,
  BarChart3,
  MessageSquare,
  MapPin,
  Camera,
  Trophy,
  Settings,
  Zap,
  LogOut,
  Eye ,
} from 'lucide-react';
import '../index.css';
const handleRedirect = () => {
  window.open('https://polarisoptimizer.streamlit.app', '_blank'); // opens in new tab
  // OR use `window.location.href = '...'` to open in same tab
};
/* --- Menu config --- */
const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  // { id: 'products',  label: 'Products',  icon: Package },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'orders', label: 'Order Fulfillment', icon: MapPin },
  { id: 'chatbot', label: 'AI Assistant', icon: MessageSquare },
    // { id: 'gamification', label: 'Achievements', icon: Trophy },
  // { id: 'ocr', label: 'Receipt Scanner', icon: Camera },
];

/* --- Sidebar component (pure JSX) --- */
const Sidebar = ({
  activeTab,
  onTabChange,
  isOpen,
  toggleOpen,
  handleLogout,
}) => (
  <aside
    className={`fixed h-screen border-r border-gray-200 bg-blue-700 p-2
      transition-[width] duration-300 ease-in-out
      ${isOpen ? 'w-[15vw]' : 'w-[5vw]'} flex flex-col`}
  >
    {/* ---- Brand / Toggle ---- */}
    <button
      onClick={toggleOpen}
      aria-label="Toggle sidebar"
      className="flex items-center justify-center p-2 bg-blue-700 focus:outline-none"
    >
      <span className={`font-bold text-white ${isOpen ? 'text-2xl' : 'hidden'}`}>
        Walmart&nbsp;
      </span>

      {/* Sunburst icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 540 540"
      >
        <path
          fill="#FFC220"
          d="M368.4 246c11.3-2.3 111-48 119.8-53a42.4 42.4 0 1 0-42.5-73.5c-8.8 5.1-98.2 68.5-105.9 77.1a30 30 0 0 0-3.8 35.1 30.1 30.1 0 0 0 32.4 14.3ZM488.2 347c-8.9-5-108.5-50.7-119.8-53-13-2.7-25.9 3-32.4 14.3a30 30 0 0 0 3.8 35c7.7 8.7 97 72.1 106 77.2a42.5 42.5 0 0 0 42.4-73.5ZM269.7 346.5c-13 0-24.4 8.4-28.5 20.9-3.7 10.9-14 120-14 130.2a42.4 42.4 0 0 0 85 0c0-10.3-10.3-119.3-14-130.2a30.1 30.1 0 0 0-28.5-20.9ZM171 294c-11.2 2.3-110.9 48-119.8 53a42.4 42.4 0 1 0 42.5 73.5c8.9-5.1 98.3-68.5 106-77.1a30 30 0 0 0 3.7-35.1 30.1 30.1 0 0 0-32.3-14.3ZM93.7 119.5A42.5 42.5 0 0 0 51.2 193c9 5 108.6 50.7 119.9 53 12.9 2.7 25.8-3 32.3-14.3a30 30 0 0 0-3.8-35c-7.6-8.7-97-72.1-105.9-77.2ZM269.7 0c-23.4 0-42.4 19-42.4 42.4 0 10.3 10.2 119.3 13.9 130.2a30.1 30.1 0 0 0 28.5 20.9c13 0 24.4-8.4 28.6-20.9 3.6-10.9 13.9-120 13.9-130.2 0-23.4-19-42.4-42.5-42.4Z"
        />
      </svg>
    </button>

    {/* ---- Navigation ---- */}
    <nav className="flex flex-col h-full justify-between overflow-y-auto p-1 no-scrollbar text-[0.8rem]">
      <ul>
        {menuItems.map(({ id, label, icon: Icon }) => (
          <li key={id}>
            <button
              onClick={() => onTabChange(id)}
              className={`flex items-center w-full rounded-lg px-4 py-3 transition-colors duration-200
                ${
                  activeTab === id
                    ? 'bg-blue-700 text-white border-2 border-[#FFC220]'
                    : 'text-gray-100 hover:bg-blue-700 hover:text-white'
                }
                ${isOpen ? 'justify-start space-x-3' : 'justify-center'}`}
            >
              <Icon className="w-4 h-4 shrink-0 text-white" />
              {isOpen && <span className="font-medium">{label}</span>}
            </button>
          </li>
        ))}
         <button
  onClick={handleRedirect}
  className={`flex items-center w-full rounded-lg px-4 py-3 transition-colors duration-200
    bg-blue-700 text-white border-[#FFC220]
    ${isOpen ? 'justify-start space-x-3' : 'justify-center'}`}
>
<Eye className="w-4 h-4 shrink-0 text-white" />
    &emsp;Product Visibility
</button>
      </ul>

      {/* ---- Log‑out ---- */}
      <ul>
        <li>
          <button
            onClick={handleLogout}
            className={`flex items-center w-full rounded-lg px-4 py-3 transition-colors duration-200
              bg-blue-700 text-white border-[#FFC220]
              ${isOpen ? 'justify-start space-x-3' : 'justify-center'}`}
          >
            <LogOut className="w-4 h-4 shrink-0 text-white" />
            {isOpen && <span className="font-medium">Log Out</span>}
          </button>
        </li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
