export type UserRole = 'client' | 'staff' | 'admin';

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}

export interface AuthUser {
  id: number;
  email: string;
  role: UserRole;
} 