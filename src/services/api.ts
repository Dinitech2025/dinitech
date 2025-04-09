import * as dashboardController from '../api/dashboardController';
import * as userController from '../api/userController';

// Types pour les statistiques du tableau de bord
export interface IDashboardStats {
  userCount: number;
  platformCount: number;
  subscriptionCount: number;
  recentActivities: {
    action: string;
    description: string;
    date: string;
  }[];
}

// Méthode pour récupérer les statistiques du tableau de bord
export const getDashboardStats = async (): Promise<IDashboardStats> => {
  try {
    // Utiliser le contrôleur pour récupérer les vraies données
    return await dashboardController.getDashboardStats();
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    throw new Error('Impossible de récupérer les statistiques du tableau de bord');
  }
};

// Méthode pour récupérer les utilisateurs
export const getUsers = async () => {
  try {
    // Utiliser le contrôleur pour récupérer les vraies données
    return await userController.getUsers();
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    throw new Error('Impossible de récupérer les utilisateurs');
  }
};

// Méthode pour le nettoyage (non utilisée dans cette version)
export const disconnectPrisma = async () => {
  // Cette fonction ne fait plus rien car nous utilisons un singleton Prisma
  // qui est géré au niveau de l'application
}; 