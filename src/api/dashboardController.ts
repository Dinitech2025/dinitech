import prisma from './dbClient';
import { IDashboardStats } from '../services/api';

/**
 * Récupère les statistiques pour le tableau de bord
 */
export const getDashboardStats = async (): Promise<IDashboardStats> => {
  try {
    // Récupérer le nombre réel d'utilisateurs
    const userCount = await prisma.user.count();
    
    // Récupérer le nombre de plateformes (si ce modèle existe)
    let platformCount = 0;
    try {
      // Vérifier si le modèle platform existe
      const metadata = await prisma.$queryRaw`
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name='Platform'
      `;
      // @ts-ignore - On vérifie juste si le tableau n'est pas vide
      if (metadata && metadata.length > 0) {
        // @ts-ignore - Si le modèle existe
        platformCount = await prisma.platform.count();
      }
    } catch (error) {
      console.log('Modèle Platform non disponible:', error);
    }
    
    // Récupérer le nombre d'abonnements (si ce modèle existe)
    let subscriptionCount = 0;
    try {
      // Vérifier si le modèle subscription existe
      const metadata = await prisma.$queryRaw`
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name='Subscription'
      `;
      // @ts-ignore - On vérifie juste si le tableau n'est pas vide
      if (metadata && metadata.length > 0) {
        // @ts-ignore - Si le modèle existe
        subscriptionCount = await prisma.subscription.count();
      }
    } catch (error) {
      console.log('Modèle Subscription non disponible:', error);
    }
    
    // Récupérer les derniers utilisateurs pour les activités
    const recentUsers = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3
    });
    
    // Créer les activités basées sur les données réelles
    const recentActivities = recentUsers.map(user => ({
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
  } finally {
    // Pas besoin de déconnecter ici car on utilise un singleton
  }
}; 