import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  isStaff: () => boolean;
  isClient: () => boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};

// Utilisateurs fictifs pour la démo
const mockUsers = [
  { id: 1, email: 'admin@example.com', password: 'admin123', name: 'Admin', role: 'admin' as UserRole },
  { id: 2, email: 'staff@example.com', password: 'staff123', name: 'Staff', role: 'staff' as UserRole },
  { id: 3, email: 'client@example.com', password: 'client123', name: 'Client', role: 'client' as UserRole }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  useEffect(() => {
    // Vérifier si un utilisateur est déjà connecté
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        console.log('Utilisateur trouvé dans le localStorage:', user.email);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } catch (error) {
        console.error('Erreur lors de la lecture des données utilisateur:', error);
        localStorage.removeItem('authUser');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log(`Tentative de connexion pour: ${email}`);
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));

      // Vérifier les identifiants
      const user = mockUsers.find(
        u => u.email === email && u.password === password
      );

      if (user) {
        // Utilisateur trouvé, on enlève le mot de passe pour le stockage
        const { password: _, ...safeUser } = user;
        localStorage.setItem('authUser', JSON.stringify(safeUser));
        
        setAuthState({
          user: safeUser,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
        
        console.log('Connexion réussie pour:', email);
        return true;
      } else {
        console.error('Identifiants incorrects pour:', email);
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Email ou mot de passe incorrect'
        }));
        return false;
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Une erreur est survenue lors de la connexion'
      }));
      return false;
    }
  };

  const logout = () => {
    console.log('Déconnexion de l\'utilisateur');
    localStorage.removeItem('authUser');
    setAuthState(initialState);
  };

  const isAdmin = () => authState.user?.role === 'admin';
  const isStaff = () => authState.user?.role === 'staff';
  const isClient = () => authState.user?.role === 'client';

  const contextValue: AuthContextType = {
    ...authState,
    login,
    logout,
    isAdmin,
    isStaff,
    isClient
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 