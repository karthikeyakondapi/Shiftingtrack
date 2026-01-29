
import api from './api';
import { Employee } from '../types';

const MOCK_USER: Employee = {
  employeeId: 'E01',
  name: 'Karthik',
  role: 'Full Stack Developer',
  email: 'karthikhcl@gmail.com',
  department: 'ECE',
  manager: 'V.Tejitha',
  location: 'Chennai, India',
  password: '1234'
};

export const authService = {
  login: async (employeeId: string, password: string): Promise<Employee> => {
    try {
      // Attempt to contact real backend
      const response = await api.post('/auth/login', { employeeId, password });
      return response.data;
    } catch (error) {
      // Fallback to mock data for demo/deployment stability
      if (employeeId === MOCK_USER.employeeId && password === MOCK_USER.password) {
        return { ...MOCK_USER };
      }
      throw new Error('Invalid credentials');
    }
  },

  getCurrentUser: (): Employee | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  logout: () => {
    localStorage.removeItem('user');
    // For HashRouter navigation
    window.location.hash = '/login';
  }
};
