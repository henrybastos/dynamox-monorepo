import axios from 'axios';
import { getSession } from 'next-auth/react';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const token = (session as any)?.user?.accessToken;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  // (error) => {
  //   return Promise.reject(error);
  // }
);

export default api;
