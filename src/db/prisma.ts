import { PrismaClient } from '../../src/generated/prisma';

// Création d'une instance PrismaClient
let prisma: PrismaClient;

// Cette approche évite de créer plusieurs instances en développement
// à cause du hot-reloading
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // Utiliser une variable globale pour éviter de créer plusieurs connexions
  // pendant le développement et le hot-reloading
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient({
      log: ['query', 'error', 'warn'],
    });
  }
  prisma = (global as any).prisma;
}

// Fonction pour tester la connexion à la base de données
export const testConnection = async () => {
  try {
    // Vérifier la connexion en effectuant une requête simple
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return false;
  }
};

export default prisma; 