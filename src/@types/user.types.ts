export type UserRole = 'resident' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  apartment?: string;
  profileImage?: string;
  role: UserRole;
  isOnline?: boolean;
  lastActive?: string;
  phone?: string;
  cpf?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthCredentials {
  cpf?: string;
  email?: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
