import React from 'react';

const DashboardContent: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tableau de bord</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Utilisateurs</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">42</div>
                </dd>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">Tâches totales</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">7</div>
                </dd>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">Statistiques</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">+12%</div>
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Activity List */}
      <h3 className="text-lg font-medium text-gray-900 mb-3">Activité récente</h3>
      <div className="bg-gray-50 shadow overflow-hidden rounded-md">
        <ul className="divide-y divide-gray-200">
          <li className="px-6 py-4">
            <div className="flex items-center">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">Nouvel utilisateur inscrit: Marie Dupont</p>
                <p className="text-sm text-gray-500">Il y a 2 heures</p>
              </div>
            </div>
          </li>
          <li className="px-6 py-4">
            <div className="flex items-center">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">Mise à jour du système effectuée</p>
                <p className="text-sm text-gray-500">Hier à 15:30</p>
              </div>
            </div>
          </li>
          <li className="px-6 py-4">
            <div className="flex items-center">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">Maintenance programmée: Dimanche 24 avril</p>
                <p className="text-sm text-gray-500">Il y a 2 jours</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardContent; 