import { UserRole } from '../types/user';
import prisma, { testConnection } from './prisma';

// Définir les interfaces pour nos modèles
interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Order {
  id: number;
  userId: number;
  status: string;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

// Fonction pour hasher un mot de passe
const hashPassword = async (password: string): Promise<string> => {
  try {
    // Utiliser l'API Web Crypto pour un hachage sécurisé
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    
    // Convertir le tableau d'octets en chaîne hexadécimale
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  } catch (error) {
    console.error('Erreur lors du hachage du mot de passe:', error);
    // En cas d'erreur, retourner une version simple (moins sécurisée mais fonctionnelle)
    return `simple_hash_${password.split('').reverse().join('')}`;
  }
};

// Fonction pour vérifier un mot de passe
const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  try {
    // Si c'est un hachage simple (fallback)
    if (hashedPassword.startsWith('simple_hash_')) {
      return hashedPassword === `simple_hash_${password.split('').reverse().join('')}`;
    }
    
    // Sinon, vérifier le hachage normalement
    const hashedInput = await hashPassword(password);
    return hashedInput === hashedPassword;
  } catch (error) {
    console.error('Erreur lors de la vérification du mot de passe:', error);
    return false;
  }
};

// Fonction pour initialiser la base de données avec des données de test
export const initDatabase = async () => {
  try {
    // Vérifier la connexion à la base de données
    const isConnected = await testConnection();
    if (!isConnected) {
      throw new Error('Impossible de se connecter à la base de données');
    }

    console.log('Connexion à la base de données établie');
    
    // Vérifier si des utilisateurs existent déjà
    const userCount = await prisma.user.count();
    console.log(`Nombre d'utilisateurs actuels: ${userCount}`);
    
    if (userCount === 0) {
      // Créer des utilisateurs par défaut
      const defaultUsers = [
        {
          email: 'admin@example.com',
          password: await hashPassword('admin123'),
          name: 'Admin',
          role: 'admin',
        },
        {
          email: 'staff@example.com',
          password: await hashPassword('staff123'),
          name: 'Staff',
          role: 'staff',
        },
        {
          email: 'client@example.com',
          password: await hashPassword('client123'),
          name: 'Client',
          role: 'client',
        }
      ];
      
      for (const userData of defaultUsers) {
        try {
          await prisma.user.create({
            data: userData
          });
          console.log(`Utilisateur ${userData.role} créé: ${userData.email}`);
        } catch (err) {
          console.error(`Erreur lors de la création de l'utilisateur ${userData.email}:`, err);
        }
      }
    }
    
    // Vérifier si des produits existent déjà
    const productCount = await prisma.product.count();
    console.log(`Nombre de produits actuels: ${productCount}`);
    
    if (productCount === 0) {
      // Créer des produits par défaut
      const defaultProducts = [
        {
          name: 'Smartphone XYZ',
          description: 'Un smartphone haut de gamme avec les dernières fonctionnalités',
          price: 799.99,
          stock: 50,
          category: 'electronics',
          imageUrl: 'https://via.placeholder.com/300'
        },
        {
          name: 'Chaise de bureau ergonomique',
          description: 'Chaise confortable pour de longues heures de travail',
          price: 199.99,
          stock: 20,
          category: 'furniture',
          imageUrl: 'https://via.placeholder.com/300'
        },
        {
          name: 'T-shirt premium',
          description: 'T-shirt en coton de haute qualité',
          price: 29.99,
          stock: 100,
          category: 'clothing',
          imageUrl: 'https://via.placeholder.com/300'
        }
      ];
      
      for (const productData of defaultProducts) {
        try {
          await prisma.product.create({
            data: productData
          });
          console.log(`Produit créé: ${productData.name}`);
        } catch (err) {
          console.error(`Erreur lors de la création du produit ${productData.name}:`, err);
        }
      }
    }
    
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    throw error;
  }
};

// Wrapper pour gérer les erreurs de base de données
const dbOperation = async <T>(operation: () => Promise<T>): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    console.error('Erreur lors de l\'opération sur la base de données:', error);
    throw error;
  }
};

// Fonctions utilisateurs
export const findUserByEmail = async (email: string) => {
  return dbOperation(async () => {
    return prisma.user.findUnique({
      where: { email }
    });
  });
};

export const authenticateUser = async (email: string, password: string) => {
  return dbOperation(async () => {
    const user = await findUserByEmail(email);
    
    if (!user) {
      return null;
    }
    
    const isPasswordValid = await verifyPassword(password, user.password);
    
    if (!isPasswordValid) {
      return null;
    }
    
    // Ne pas retourner le mot de passe
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
};

export const createUser = async (email: string, password: string, name: string, role: UserRole) => {
  return dbOperation(async () => {
    // Vérifier si l'email existe déjà
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new Error('Un utilisateur avec cet email existe déjà');
    }
    
    // Hasher le mot de passe
    const hashedPassword = await hashPassword(password);
    
    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role
      }
    });
    
    return user.id;
  });
};

export const getAllUsers = async () => {
  return dbOperation(async () => {
    const users = await prisma.user.findMany();
    
    // Filtrer les mots de passe par sécurité
    return users.map((user: User) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  });
};

// Fonctions produits
export const getAllProducts = async () => {
  return dbOperation(async () => {
    return prisma.product.findMany();
  });
};

export const getProductById = async (id: number) => {
  return dbOperation(async () => {
    return prisma.product.findUnique({
      where: { id }
    });
  });
};

type ProductCreateData = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

export const createProduct = async (productData: ProductCreateData) => {
  return dbOperation(async () => {
    const product = await prisma.product.create({
      data: productData
    });
    return product.id;
  });
};

type ProductUpdateData = Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>;

export const updateProduct = async (id: number, updates: ProductUpdateData) => {
  return dbOperation(async () => {
    return prisma.product.update({
      where: { id },
      data: updates
    });
  });
};

export const deleteProduct = async (id: number) => {
  return dbOperation(async () => {
    await prisma.product.delete({
      where: { id }
    });
  });
};

// Fonctions pour les commandes
export interface OrderCreateData {
  userId: number;
  products: { productId: number; quantity: number; price: number }[];
  totalPrice: number;
  status: string;
}

export const createOrder = async (orderData: OrderCreateData): Promise<number> => {
  return dbOperation(async () => {
    const { userId, products, totalPrice, status } = orderData;
    
    const order = await prisma.order.create({
      data: {
        userId,
        totalPrice,
        status,
        items: {
          create: products.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    });
    
    return order.id;
  });
};

export const getOrdersByUserId = async (userId: number) => {
  return dbOperation(async () => {
    return prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });
  });
};

export const updateOrderStatus = async (orderId: number, status: string) => {
  return dbOperation(async () => {
    return prisma.order.update({
      where: { id: orderId },
      data: { status }
    });
  });
}; 