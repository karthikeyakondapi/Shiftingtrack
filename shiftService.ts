
import api from './api';
import { Shift, WorkMode } from '../types';

// Mock storage for demo mode
const getMockShifts = (): Shift[] => {
  const saved = localStorage.getItem('mock_shifts');
  return saved ? JSON.parse(saved) : [];
};

const saveMockShift = (shift: Shift) => {
  const shifts = getMockShifts();
  const index = shifts.findIndex(s => s.date === shift.date && s.employeeId === shift.employeeId);
  if (index > -1) {
    shifts[index] = shift;
  } else {
    shifts.push(shift);
  }
  localStorage.setItem('mock_shifts', JSON.stringify(shifts));
};

const deleteMockShift = (employeeId: string, date: string) => {
  const shifts = getMockShifts();
  const filtered = shifts.filter(s => !(s.employeeId === employeeId && s.date === date));
  localStorage.setItem('mock_shifts', JSON.stringify(filtered));
};

export const shiftService = {
  getShifts: async (employeeId: string): Promise<Shift[]> => {
    try {
      const response = await api.get(`/shifts/${employeeId}`);
      return response.data;
    } catch (error) {
      // Demo fallback
      return getMockShifts().filter(s => s.employeeId === employeeId);
    }
  },

  saveShift: async (shift: Omit<Shift, 'id'>): Promise<Shift> => {
    const newShift: Shift = { ...shift, id: Math.random().toString(36).substr(2, 9) };
    try {
      const response = await api.post('/shifts', newShift);
      return response.data;
    } catch (error) {
      // Demo fallback
      saveMockShift(newShift);
      return newShift;
    }
  },

  deleteShift: async (employeeId: string, date: string): Promise<void> => {
    try {
      await api.delete(`/shifts/${employeeId}/${date}`);
    } catch (error) {
      // Demo fallback
      deleteMockShift(employeeId, date);
    }
  }
};
