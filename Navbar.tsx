
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  if (!user) return null;

  return (
    <nav className="bg-[#005691] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="text-xl font-bold tracking-tight">
              HybridShift<span className="text-orange-400">Tracker</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#004270]">Dashboard</Link>
                <Link to="/my-shifts" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#004270]">My Shifts</Link>
                <Link to="/profile" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#004270]">Profile</Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-light hidden sm:inline">Welcome, {user.name}</span>
            <button
              onClick={() => authService.logout()}
              className="bg-orange-500 hover:bg-orange-600 px-4 py-1.5 rounded text-sm font-semibold transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
