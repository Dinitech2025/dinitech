import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

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

export const getDashboardStats = async (): Promise<IDashboardStats> => {
  try {
    // Récupérer le nombre d'utilisateurs
    const userCount = await prisma.user.count();
    
    // Récupérer le nombre de plateformes (si ce modèle existe)
    let platformCount = 0;
    try {
      // @ts-ignore - Vérification de l'existence du modèle
      platformCount = await prisma.platform.count();
    } catch (error) {
      console.log('Modèle Platform non disponible');
    }
    
    // Récupérer le nombre d'abonnements (si ce modèle existe)
    let subscriptionCount = 0;
    try {
      // @ts-ignore - Vérification de l'existence du modèle
      subscriptionCount = await prisma.subscription.count();
    } catch (error) {
      console.log('Modèle Subscription non disponible');
    }
    
    // Récupérer les activités récentes (à adapter selon votre modèle)
    // Ici, on simule des activités basées sur des données réelles
    const recentActivities = [
      {
        action: 'Création utilisateur',
        description: `Nombre total d'utilisateurs: ${userCount}`,
        date: new Date().toLocaleString('fr-FR')
      },
      {
        action: 'Mise à jour système',
        description: 'Configuration de la base de données terminée',
        date: new Date(Date.now() - 86400000).toLocaleString('fr-FR') // Hier
      },
      {
        action: 'Maintenance',
        description: 'Prochaine maintenance prévue dimanche',
        date: new Date(Date.now() - 172800000).toLocaleString('fr-FR') // Avant-hier
      }
    ];
    
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

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
    return users;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    throw new Error('Impossible de récupérer les utilisateurs');
  }
};

// Fonction pour nettoyer les ressources
export const disconnectPrisma = async () => {
  await prisma.$disconnect();
}; 