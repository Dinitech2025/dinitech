import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { user, isAuthenticated, logout, isAdmin, isStaff } = useAuth();

  return (
    <div className="homepage">
      <header>
        <h1>Bienvenue sur notre Application</h1>
        <nav>
          {isAuthenticated && user ? (
            <div className="user-nav">
              <span>Bonjour, {user.email}</span>
              {(isAdmin() || isStaff()) && (
                <Link to="/admin">Panel d'administration</Link>
              )}
              <button onClick={logout}>Déconnexion</button>
            </div>
          ) : (
            <div className="auth-nav">
              <Link to="/login">Connexion</Link>
            </div>
          )}
        </nav>
      </header>
      <main>
        <section className="hero">
          <h2>Authentification avec Connexion Rapide</h2>
          <p>Cette application démontre un système d'authentification avec trois rôles différents:</p>
          <ul>
            <li><strong>Client</strong> - Accès aux fonctionnalités de base</li>
            <li><strong>Staff</strong> - Accès au tableau de bord avec permissions limitées</li>
            <li><strong>Admin</strong> - Accès complet au tableau de bord et à toutes les fonctionnalités</li>
          </ul>
          <p>Utilisez la page de connexion pour tester les différents rôles.</p>
          
          {!isAuthenticated && (
            <div className="cta-buttons">
              <Link to="/login" className="login-button">Se connecter</Link>
            </div>
          )}
          
          {isAuthenticated && user && (
            <div className="user-info">
              <h3>Information utilisateur</h3>
              <p>Email: {user.email}</p>
              <p>Rôle: {user.role}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage; 