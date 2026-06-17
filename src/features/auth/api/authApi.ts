import { apiClient } from '../../../lib/axios';

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatarUrl?: string;
}

export const authApi = {
  login: async (data: Record<string, any>) => {
    const response = await apiClient.post<{ user: User }>('/auth/login', data);
    return response.data;
  },
  register: async (data: Record<string, any>) => {
    const response = await apiClient.post<{ user: User }>('/auth/register', data);
    return response.data;
  },
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },
};
