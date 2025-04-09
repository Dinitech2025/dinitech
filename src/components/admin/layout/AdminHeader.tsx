import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const AdminHeader: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-900 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Panneau d'administration</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline-flex items-center text-sm bg-gray-800 rounded-full px-3 py-1">
              <span className="inline-block h-2 w-2 rounded-full bg-green-400 mr-2"></span>
              {user?.name} ({user?.role})
            </span>
            <Link 
              to="/" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Retour au site
            </Link>
            <button 
              onClick={logout}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader; 