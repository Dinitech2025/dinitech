import prisma from './dbClient';
import { User } from '../types';

/**
 * Récupérer tous les utilisateurs
 */
export const getUsers = async (): Promise<User[]> => {
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
    return users as User[];
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
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
    return user as User | null;
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
    const user = await prisma.user.create({
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
    return user as User;
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
    const user = await prisma.user.update({
      where: { id },
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
    return user as User;
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
    await prisma.user.delete({
      where: { id }
    });
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'utilisateur ${id}:`, error);
    throw new Error(`Impossible de supprimer l'utilisateur ${id}`);
  }
}; 