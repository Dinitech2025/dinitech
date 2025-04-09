import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';

type TabType = 'dashboard' | 'users' | 'orders';

const Dashboard: React.FC = () => {
  const { user, logout, isAdmin, isStaff } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Rediriger si l'utilisateur n'est pas admin ou staff
  if (!user || !(isAdmin() || isStaff())) {
    return <Navigate to="/login" />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <section className="dashboard-content">
            <h2>Tableau de bord</h2>
            <div className="dashboard-stats">
              <div className="stat-card">
                <h3>Utilisateurs</h3>
                <p className="stat-number">-</p>
              </div>
              <div className="stat-card">
                <h3>Commandes</h3>
                <p className="stat-number">-</p>
              </div>
              <div className="stat-card">
                <h3>Ventes</h3>
                <p className="stat-number">- €</p>
              </div>
            </div>
            
            {isAdmin() && (
              <div className="admin-only">
                <h3>Fonctionnalités Administrateur</h3>
                <p>Cette section n'est visible que par les administrateurs.</p>
              </div>
            )}
            
            {isStaff() && (
              <div className="staff-section">
                <h3>Fonctionnalités Staff</h3>
                <p>Cette section est visible par le staff et les administrateurs.</p>
              </div>
            )}
          </section>
        );
      case 'users':
        return (
          <section className="user-management">
            <h2>Gestion des Utilisateurs</h2>
            <p>Fonctionnalité à venir prochainement...</p>
          </section>
        );
      case 'orders':
        return (
          <section className="order-management">
            <h2>Gestion des Commandes</h2>
            <p>Fonctionnalité à venir prochainement...</p>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard">
      <header>
        <h1>Panel d'Administration</h1>
        <nav>
          <div className="user-nav">
            <span>Connecté en tant que: {user.email}</span>
            <span>Rôle: {user.role}</span>
            <Link to="/">Retour au site</Link>
            <button onClick={logout}>Déconnexion</button>
          </div>
        </nav>
      </header>
      
      <div className="dashboard-container">
        <div className="sidebar">
          <ul className="sidebar-menu">
            <li 
              className={activeTab === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveTab('dashboard')}
            >
              Tableau de bord
            </li>
            <li 
              className={activeTab === 'orders' ? 'active' : ''}
              onClick={() => setActiveTab('orders')}
            >
              Commandes
            </li>
            {isAdmin() && (
              <li 
                className={activeTab === 'users' ? 'active' : ''}
                onClick={() => setActiveTab('users')}
              >
                Utilisateurs
              </li>
            )}
          </ul>
        </div>
        
        <main className="dashboard-main">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 