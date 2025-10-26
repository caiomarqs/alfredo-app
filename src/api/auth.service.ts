import { httpClient } from './http-client';
import { User, AuthCredentials, AuthResponse } from '../@types';
import { delay } from '../utils';

class AuthService {
  /**
   * Login for residents (CPF + password)
   */
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    // Mock implementation - replace with actual API call
    await delay(1000);
    
    const mockUser: User = {
      id: '1',
      name: 'João Silva',
      email: 'joao.silva@example.com',
      apartment: '302A',
      cpf: credentials.cpf,
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      role: 'resident',
      isOnline: true,
      lastActive: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    return {
      user: mockUser,
      token: 'mock-jwt-token-' + Date.now(),
    };
    
    // Real implementation:
    // return httpClient.post<AuthResponse>('/auth/login', credentials);
  }

  /**
   * Login for admins (email + password)
   */
  async adminLogin(credentials: AuthCredentials): Promise<AuthResponse> {
    // Mock implementation - replace with actual API call
    await delay(1000);
    
    const mockAdmin: User = {
      id: 'admin1',
      name: 'Admin Silva',
      email: credentials.email || 'admin@alfredo.com',
      profileImage: 'https://randomuser.me/api/portraits/men/41.jpg',
      role: 'admin',
      isOnline: true,
      lastActive: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    return {
      user: mockAdmin,
      token: 'mock-admin-jwt-token-' + Date.now(),
    };
    
    // Real implementation:
    // return httpClient.post<AuthResponse>('/auth/admin/login', credentials);
  }

  /**
   * Logout
   */
  async logout(): Promise<void> {
    // Real implementation:
    // return httpClient.post<void>('/auth/logout');
    await delay(500);
  }

  /**
   * Refresh token
   */
  async refreshToken(): Promise<AuthResponse> {
    return httpClient.post<AuthResponse>('/auth/refresh');
  }

  /**
   * Validate token
   */
  async validateToken(token: string): Promise<boolean> {
    try {
      await httpClient.get<void>('/auth/validate', { token });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<void> {
    return httpClient.post<void>('/auth/password-reset/request', { email });
  }

  /**
   * Reset password
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    return httpClient.post<void>('/auth/password-reset/confirm', {
      token,
      newPassword,
    });
  }
}

export const authService = new AuthService();
