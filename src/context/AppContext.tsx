
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Professional, Service, Client, Appointment, Product, User } from '@/types';

interface AppContextType {
  // User and Auth
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  
  // Data
  professionals: Professional[];
  services: Service[];
  clients: Client[];
  appointments: Appointment[];
  products: Product[];
  
  // Setters
  setProfessionals: (professionals: Professional[]) => void;
  setServices: (services: Service[]) => void;
  setClients: (clients: Client[]) => void;
  setAppointments: (appointments: Appointment[]) => void;
  setProducts: (products: Product[]) => void;
  
  // Features
  hasStockModule: boolean;
  setHasStockModule: (has: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: '1',
    name: 'João Silva',
    email: 'joao@salao.com',
    role: 'admin',
    isActive: true
  });

  const [professionals, setProfessionals] = useState<Professional[]>([
    {
      id: '1',
      name: 'Maria Santos',
      email: 'maria@salao.com',
      phone: '(11) 99999-9999',
      specialties: ['Corte', 'Coloração', 'Escova'],
      workingHours: {
        start: '09:00',
        end: '18:00',
        days: [1, 2, 3, 4, 5, 6] // Mon-Sat
      },
      isActive: true,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c3ca?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Carlos Oliveira',
      email: 'carlos@salao.com',
      phone: '(11) 88888-8888',
      specialties: ['Corte Masculino', 'Barba', 'Bigode'],
      workingHours: {
        start: '08:00',
        end: '17:00',
        days: [1, 2, 3, 4, 5, 6]
      },
      isActive: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  ]);

  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Corte Feminino',
      duration: 60,
      price: 50.00,
      professionalIds: ['1'],
      category: 'Cabelo',
      description: 'Corte moderno e personalizado'
    },
    {
      id: '2',
      name: 'Coloração',
      duration: 120,
      price: 120.00,
      professionalIds: ['1'],
      category: 'Cabelo',
      description: 'Coloração completa com produtos premium'
    },
    {
      id: '3',
      name: 'Corte Masculino',
      duration: 30,
      price: 25.00,
      professionalIds: ['2'],
      category: 'Cabelo',
      description: 'Corte masculino tradicional ou moderno'
    },
    {
      id: '4',
      name: 'Barba Completa',
      duration: 45,
      price: 30.00,
      professionalIds: ['2'],
      category: 'Barba',
      description: 'Aparar e modelar barba'
    }
  ]);

  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Ana Costa',
      email: 'ana@email.com',
      phone: '(11) 77777-7777',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Pedro Lima',
      email: 'pedro@email.com',
      phone: '(11) 66666-6666',
      createdAt: new Date('2024-02-10')
    }
  ]);

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      clientId: '1',
      professionalId: '1',
      serviceId: '1',
      date: new Date('2024-06-16'),
      startTime: '10:00',
      endTime: '11:00',
      status: 'scheduled',
      price: 50.00
    },
    {
      id: '2',
      clientId: '2',
      professionalId: '2',
      serviceId: '3',
      date: new Date('2024-06-16'),
      startTime: '14:00',
      endTime: '14:30',
      status: 'confirmed',
      price: 25.00
    }
  ]);

  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Shampoo Premium',
      category: 'Higiene',
      currentStock: 15,
      minStock: 5,
      unit: 'un',
      price: 45.90,
      supplier: 'Beleza Distribuição'
    },
    {
      id: '2',
      name: 'Tinta Loreal 6.0',
      category: 'Coloração',
      currentStock: 3,
      minStock: 5,
      unit: 'un',
      price: 28.50,
      supplier: 'Cosméticos Pro'
    }
  ]);

  const [hasStockModule, setHasStockModule] = useState(true);

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      professionals,
      services,
      clients,
      appointments,
      products,
      setProfessionals,
      setServices,
      setClients,
      setAppointments,
      setProducts,
      hasStockModule,
      setHasStockModule
    }}>
      {children}
    </AppContext.Provider>
  );
};
