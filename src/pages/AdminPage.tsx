import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import AdminHeader from '../components/admin/layout/AdminHeader';
import AdminSidebar from '../components/admin/layout/AdminSidebar';
import DashboardContent from '../components/admin/dashboard/DashboardContent';
import SettingsContent from '../components/admin/settings/SettingsContent';
import PlatformsSection from '../components/admin/streaming/PlatformsSection';
import OffersSection from '../components/admin/streaming/OffersSection';
import AccountsSection from '../components/admin/streaming/AccountsSection';
import ProfilesSection from '../components/admin/streaming/ProfilesSection';
import SubscriptionsSection from '../components/admin/streaming/SubscriptionsSection';

type TabType = 'dashboard' | 'users' | 'settings' | 'platforms' | 'offers' | 'accounts' | 'profiles' | 'subscriptions';

const AdminPage: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const navigate = useNavigate();

  // Si l'utilisateur n'est pas connecté ou n'a pas les droits, rediriger
  if (!user || !(isAdmin() || user.role === 'staff')) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Content */}
          <main className="w-full lg:flex-1 lg:ml-6">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              {activeTab === 'dashboard' && <DashboardContent />}
              {activeTab === 'settings' && <SettingsContent />}
              {activeTab === 'platforms' && <PlatformsSection />}
              {activeTab === 'offers' && <OffersSection />}
              {activeTab === 'accounts' && <AccountsSection />}
              {activeTab === 'profiles' && <ProfilesSection />}
              {activeTab === 'subscriptions' && <SubscriptionsSection />}
              
              {activeTab === 'users' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestion des utilisateurs</h2>
                  {isAdmin() ? (
                    <div>
                      <div className="mb-5 flex justify-between items-center">
                        <span className="text-sm text-gray-500">3 utilisateurs trouvés</span>
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          <svg className="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Ajouter un utilisateur
                        </button>
                      </div>
                      
                      <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Nom
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Rôle
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                      <span className="sr-only">Actions</span>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm font-medium text-gray-900">Admin</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm text-gray-500">admin@example.com</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                                        Admin
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                      <button className="text-indigo-600 hover:text-indigo-900">Modifier</button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-md bg-yellow-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">Accès limité</h3>
                          <div className="mt-2 text-sm text-yellow-700">
                            <p>
                              Vous devez être administrateur pour accéder à la gestion des utilisateurs.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 