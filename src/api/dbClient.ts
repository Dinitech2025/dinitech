import { PrismaClient } from '../generated/prisma';

// Singleton pattern pour la connexion à la base de données
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Déclaration de type pour le client global
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Utilisation d'une variable globale pour éviter plusieurs instances en développement
const prisma = global.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma; 