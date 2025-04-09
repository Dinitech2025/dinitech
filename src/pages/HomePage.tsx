import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const { user, isAuthenticated, logout, isAdmin, isStaff } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header / Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">AuthDemo</h1>
            </div>
            <nav>
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-4">
                  <span className="hidden md:inline-block text-gray-600">
                    Bonjour, <span className="font-medium">{user.name}</span>
                  </span>
                  
                  {(isAdmin() || isStaff()) && (
                    <Link
                      to="/admin"
                      className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
                      </svg>
                      Administration
                    </Link>
                  )}
                  
                  <button
                    onClick={logout}
                    className="inline-flex items-center px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 5a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                    </svg>
                    Déconnexion
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="btn-primary"
                >
                  Se connecter
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block text-secondary-600">Système d'authentification</span>
            <span className="block text-primary-600">Multi-rôles</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Une démonstration d'authentification avec différents niveaux d'accès et de permissions.
          </p>
        </div>

        {/* Features/Roles Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-16">
          <div className="px-6 py-8 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Différents niveaux d'accès
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Admin Role Card */}
              <div className="card p-6 border-t-4 border-admin animate-slide-up">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-admin/10 flex items-center justify-center text-2xl">👑</div>
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900">Admin</h3>
                    <span className="badge-admin">Accès complet</span>
                  </div>
                </div>
                <p className="text-gray-600">
                  Accès total au panneau d'administration avec toutes les fonctionnalités et permissions.
                </p>
              </div>

              {/* Staff Role Card */}
              <div className="card p-6 border-t-4 border-staff animate-slide-up animation-delay-100">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-staff/10 flex items-center justify-center text-2xl">🛠️</div>
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900">Staff</h3>
                    <span className="badge-staff">Accès limité</span>
                  </div>
                </div>
                <p className="text-gray-600">
                  Accès au panneau d'administration avec des permissions limitées et restrictions.
                </p>
              </div>

              {/* Client Role Card */}
              <div className="card p-6 border-t-4 border-client animate-slide-up animation-delay-200">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-client/10 flex items-center justify-center text-2xl">👤</div>
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900">Client</h3>
                    <span className="badge-client">Accès de base</span>
                  </div>
                </div>
                <p className="text-gray-600">
                  Accès aux fonctionnalités de base de l'application sans droits administratifs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User Information or CTA */}
        {isAuthenticated && user ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
            <div className="px-6 py-8 sm:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Votre Profil
              </h2>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Nom</dt>
                    <dd className="mt-1 text-lg font-medium text-gray-900">{user.name}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-lg font-medium text-gray-900">{user.email}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Rôle</dt>
                    <dd className="mt-1">
                      {user.role === 'admin' && <span className="badge-admin">Admin</span>}
                      {user.role === 'staff' && <span className="badge-staff">Staff</span>}
                      {user.role === 'client' && <span className="badge-client">Client</span>}
                    </dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Statut</dt>
                    <dd className="mt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                        Actif
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-primary-600 rounded-xl shadow-lg overflow-hidden animate-fade-in">
            <div className="px-6 py-12 sm:p-16 text-center">
              <h2 className="text-3xl font-extrabold text-white">
                Prêt à tester les différents niveaux d'accès?
              </h2>
              <p className="mt-4 text-lg text-primary-100">
                Connectez-vous avec les identifiants de votre choix pour explorer les fonctionnalités.
              </p>
              <div className="mt-8">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 transition-colors"
                >
                  Se connecter maintenant
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">AuthDemo</h3>
              <p className="text-gray-300">
                Une démonstration d'authentification avec gestion des rôles et des permissions.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                    Connexion
                  </Link>
                </li>
                {isAuthenticated && (isAdmin() || isStaff()) && (
                  <li>
                    <Link to="/admin" className="text-gray-300 hover:text-white transition-colors">
                      Administration
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Rôles</h3>
              <ul className="space-y-2">
                <li className="text-gray-300">Admin - Accès complet</li>
                <li className="text-gray-300">Staff - Accès limité</li>
                <li className="text-gray-300">Client - Accès de base</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Technologies</h3>
              <ul className="space-y-2">
                <li className="text-gray-300">React</li>
                <li className="text-gray-300">TypeScript</li>
                <li className="text-gray-300">Tailwind CSS</li>
                <li className="text-gray-300">React Router</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} AuthDemo. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 