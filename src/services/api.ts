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
    // Vérifier si nous sommes en mode développement avec des données mockées
    const mockData = {
      userCount: 3, // Nous savons qu'il y a 3 utilisateurs
      platformCount: 5,
      subscriptionCount: 12,
      recentActivities: [
        {
          action: 'Création utilisateur',
          description: 'Nouvel utilisateur inscrit: John Doe',
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
      ]
    };

    return mockData;
    
    // Dans un environnement de production, vous feriez plutôt :
    // const response = await fetch('/api/dashboard/stats');
    // if (!response.ok) throw new Error('Erreur réseau');
    // return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    throw new Error('Impossible de récupérer les statistiques du tableau de bord');
  }
};

// Méthode pour récupérer les utilisateurs
export const getUsers = async () => {
  try {
    // Données mockées pour le développement
    const mockUsers = [
      {
        id: 1,
        name: 'Admin',
        email: 'admin@example.com',
        role: 'admin',
        createdAt: new Date()
      },
      {
        id: 2,
        name: 'Staff',
        email: 'staff@example.com',
        role: 'staff',
        createdAt: new Date(Date.now() - 86400000)
      },
      {
        id: 3,
        name: 'Client',
        email: 'client@example.com',
        role: 'client',
        createdAt: new Date(Date.now() - 172800000)
      }
    ];

    return mockUsers;
    
    // Dans un environnement de production, vous feriez plutôt :
    // const response = await fetch('/api/users');
    // if (!response.ok) throw new Error('Erreur réseau');
    // return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    throw new Error('Impossible de récupérer les utilisateurs');
  }
};

// Méthode pour le nettoyage (non utilisée dans cette version)
export const disconnectPrisma = async () => {
  // Cette fonction ne fait plus rien car nous n'utilisons plus Prisma directement
  // dans le navigateur
}; 