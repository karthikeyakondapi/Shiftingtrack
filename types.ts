
export enum WorkMode {
  WFO = 'WFO',
  WFH = 'WFH',
  HYBRID = 'HYBRID'
}

export interface Employee {
  employeeId: string;
  name: string;
  role: string;
  email: string;
  department: string;
  manager: string;
  location: string;
  password?: string;
}

export interface Shift {
  id: string;
  employeeId: string;
  date: string; // yyyy-MM-dd
  workMode: WorkMode;
}

export interface LoginResponse {
  employeeId: string;
  name: string;
  role: string;
  email: string;
  department: string;
}
