
export interface Professional {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  workingHours: {
    start: string;
    end: string;
    days: number[]; // 0-6 (Sunday-Saturday)
  };
  isActive: boolean;
  avatar?: string;
}

export interface Service {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number;
  professionalIds: string[];
  category: string;
  description?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  createdAt: Date;
}

export interface Appointment {
  id: string;
  clientId: string;
  professionalId: string;
  serviceId: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  unit: string;
  price: number;
  supplier?: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  type: 'in' | 'out';
  quantity: number;
  date: Date;
  reason: string;
  userId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'professional';
  isActive: boolean;
  professionalId?: string;
}
