import api from './axios';

export interface ApiUser {
  _id: string;
  name: string;
  email: string;
}

export const authApi = {
  login: async (email: string, password: string): Promise<ApiUser> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data.user;
  },

  signup: async (name: string, email: string, password: string): Promise<ApiUser> => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data.user;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  verifyUser: async (): Promise<ApiUser> => {
    const response = await api.get('/auth/verify');
    return response.data.user;
  },
};
