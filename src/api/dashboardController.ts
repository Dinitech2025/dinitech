import { IDashboardStats } from '../services/api';
import { UserRole } from '../types';

// Utilisateurs de démo (mêmes que dans userController et AuthContext)
const mockUsers = [
  { id: 1, email: 'admin@example.com', password: 'admin123', name: 'Admin', role: 'admin' as UserRole, createdAt: new Date('2023-01-01') },
  { id: 2, email: 'staff@example.com', password: 'staff123', name: 'Staff', role: 'staff' as UserRole, createdAt: new Date('2023-02-01') },
  { id: 3, email: 'client@example.com', password: 'client123', name: 'Client', role: 'client' as UserRole, createdAt: new Date('2023-03-01') }
];

/**
 * Récupère les statistiques pour le tableau de bord
 */
export const getDashboardStats = async (): Promise<IDashboardStats> => {
  try {
    console.log("Récupération des statistiques du tableau de bord depuis les données mockées");
    
    // Compter les utilisateurs réels (à partir des données mockées)
    const userCount = mockUsers.length;
    
    // Définir des valeurs mockées pour les autres compteurs
    const platformCount = 5;
    const subscriptionCount = 12;
    
    // Créer des activités basées sur les utilisateurs réels
    const recentActivities = mockUsers.map(user => ({
      action: 'Création utilisateur',
      description: `Nouvel utilisateur inscrit: ${user.name}`,
      date: new Date(user.createdAt).toLocaleString('fr-FR')
    }));
    
    return {
      userCount,
      platformCount,
      subscriptionCount,
      recentActivities
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    throw new Error('Impossible de récupérer les statistiques du tableau de bord');
  }
}; 