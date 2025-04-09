import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = []
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  // Si le chargement est en cours, afficher un état de chargement
  if (isLoading) {
    return <div className="loading">Chargement...</div>;
  }

  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  // Si des rôles spécifiques sont requis, vérifier si l'utilisateur a un rôle autorisé
  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  // Si l'utilisateur est authentifié et a les autorisations nécessaires, afficher le contenu protégé
  return <>{children}</>;
};

export default ProtectedRoute; 