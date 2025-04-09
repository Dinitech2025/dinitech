import { User } from '../types';
import { UserRole } from '../types';

// Utilisateurs de démo (mêmes que dans AuthContext)
const mockUsers = [
  { id: 1, email: 'admin@example.com', password: 'admin123', name: 'Admin', role: 'admin' as UserRole, createdAt: new Date('2023-01-01') },
  { id: 2, email: 'staff@example.com', password: 'staff123', name: 'Staff', role: 'staff' as UserRole, createdAt: new Date('2023-02-01') },
  { id: 3, email: 'client@example.com', password: 'client123', name: 'Client', role: 'client' as UserRole, createdAt: new Date('2023-03-01') }
];

/**
 * Récupérer tous les utilisateurs
 */
export const getUsers = async (): Promise<User[]> => {
  try {
    console.log("Récupération des utilisateurs depuis les données mockées");
    
    // Sécuriser les données en retirant les mots de passe
    const safeUsers = mockUsers.map(({ password, ...user }) => user);
    return safeUsers as User[];
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    throw new Error('Impossible de récupérer les utilisateurs');
  }
};

/**
 * Récupérer un utilisateur par son ID
 */
export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const user = mockUsers.find(u => u.id === id);
    
    if (!user) {
      return null;
    }
    
    // Sécuriser les données
    const { password, ...safeUser } = user;
    return safeUser as User;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'utilisateur ${id}:`, error);
    throw new Error(`Impossible de récupérer l'utilisateur ${id}`);
  }
};

/**
 * Créer un nouvel utilisateur
 */
export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
  role: string;
}): Promise<User> => {
  try {
    // Simuler la création d'un utilisateur
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      createdAt: new Date()
    };
    
    // Dans une vraie application, on ajouterait l'utilisateur à la base de données
    // mockUsers.push(newUser);
    
    // Retourner l'utilisateur sans le mot de passe
    const { password, ...safeUser } = newUser;
    return safeUser as User;
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    throw new Error('Impossible de créer l\'utilisateur');
  }
};

/**
 * Mettre à jour un utilisateur existant
 */
export const updateUser = async (id: number, userData: Partial<{
  name: string;
  email: string;
  password: string;
  role: string;
}>): Promise<User> => {
  try {
    // Trouver l'utilisateur
    const userIndex = mockUsers.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      throw new Error(`Utilisateur avec l'ID ${id} non trouvé`);
    }
    
    // Simuler la mise à jour
    const updatedUser = {
      ...mockUsers[userIndex],
      ...userData
    };
    
    // Dans une vraie application, on mettrait à jour la base de données
    // mockUsers[userIndex] = updatedUser;
    
    // Retourner l'utilisateur sans le mot de passe
    const { password, ...safeUser } = updatedUser;
    return safeUser as User;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de l'utilisateur ${id}:`, error);
    throw new Error(`Impossible de mettre à jour l'utilisateur ${id}`);
  }
};

/**
 * Supprimer un utilisateur
 */
export const deleteUser = async (id: number): Promise<void> => {
  try {
    // Trouver l'utilisateur
    const userIndex = mockUsers.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      throw new Error(`Utilisateur avec l'ID ${id} non trouvé`);
    }
    
    // Dans une vraie application, on supprimerait de la base de données
    // mockUsers.splice(userIndex, 1);
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'utilisateur ${id}:`, error);
    throw new Error(`Impossible de supprimer l'utilisateur ${id}`);
  }
}; 