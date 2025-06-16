
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
    },
    {
      id: '3',
      name: 'Ana Paula Costa',
      email: 'ana@salao.com',
      phone: '(11) 77777-7777',
      specialties: ['Manicure', 'Pedicure', 'Nail Art'],
      workingHours: {
        start: '10:00',
        end: '19:00',
        days: [1, 2, 3, 4, 5, 6]
      },
      isActive: true,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '4',
      name: 'Ricardo Silva',
      email: 'ricardo@salao.com',
      phone: '(11) 66666-6666',
      specialties: ['Massagem', 'Relaxamento', 'Terapias'],
      workingHours: {
        start: '08:00',
        end: '16:00',
        days: [1, 2, 3, 4, 5]
      },
      isActive: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '5',
      name: 'Fernanda Lima',
      email: 'fernanda@salao.com',
      phone: '(11) 55555-5555',
      specialties: ['Depilação', 'Sobrancelha', 'Limpeza de Pele'],
      workingHours: {
        start: '09:30',
        end: '18:30',
        days: [1, 2, 3, 4, 5, 6]
      },
      isActive: false,
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face'
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
    },
    {
      id: '5',
      name: 'Escova Progressiva',
      duration: 180,
      price: 200.00,
      professionalIds: ['1'],
      category: 'Tratamento',
      description: 'Alisamento e hidratação profunda'
    },
    {
      id: '6',
      name: 'Manicure',
      duration: 45,
      price: 20.00,
      professionalIds: ['3'],
      category: 'Unhas',
      description: 'Cuidado completo das unhas das mãos'
    },
    {
      id: '7',
      name: 'Pedicure',
      duration: 60,
      price: 25.00,
      professionalIds: ['3'],
      category: 'Unhas',
      description: 'Cuidado completo das unhas dos pés'
    },
    {
      id: '8',
      name: 'Nail Art',
      duration: 30,
      price: 15.00,
      professionalIds: ['3'],
      category: 'Unhas',
      description: 'Decoração artística das unhas'
    },
    {
      id: '9',
      name: 'Massagem Relaxante',
      duration: 60,
      price: 80.00,
      professionalIds: ['4'],
      category: 'Bem-estar',
      description: 'Massagem terapêutica para relaxamento'
    },
    {
      id: '10',
      name: 'Depilação Pernas',
      duration: 45,
      price: 35.00,
      professionalIds: ['5'],
      category: 'Depilação',
      description: 'Depilação completa das pernas'
    },
    {
      id: '11',
      name: 'Design de Sobrancelha',
      duration: 30,
      price: 25.00,
      professionalIds: ['5'],
      category: 'Estética',
      description: 'Modelagem e design das sobrancelhas'
    },
    {
      id: '12',
      name: 'Limpeza de Pele',
      duration: 90,
      price: 60.00,
      professionalIds: ['5'],
      category: 'Estética',
      description: 'Limpeza profunda e hidratação facial'
    }
  ]);

  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Ana Costa',
      email: 'ana@email.com',
      phone: '(11) 77777-7777',
      createdAt: new Date('2024-01-15'),
      notes: 'Cliente VIP, preferência por profissional Maria'
    },
    {
      id: '2',
      name: 'Pedro Lima',
      email: 'pedro@email.com',
      phone: '(11) 66666-6666',
      createdAt: new Date('2024-02-10')
    },
    {
      id: '3',
      name: 'Juliana Santos',
      email: 'juliana@email.com',
      phone: '(11) 99988-7766',
      createdAt: new Date('2024-01-20'),
      notes: 'Alérgica a produtos com sulfato'
    },
    {
      id: '4',
      name: 'Roberto Ferreira',
      email: 'roberto@email.com',
      phone: '(11) 88877-6655',
      createdAt: new Date('2024-03-05')
    },
    {
      id: '5',
      name: 'Camila Rodrigues',
      email: 'camila@email.com',
      phone: '(11) 77766-5544',
      createdAt: new Date('2024-02-28'),
      notes: 'Gosta de cores ousadas, cliente frequente'
    },
    {
      id: '6',
      name: 'Bruno Alves',
      email: 'bruno@email.com',
      phone: '(11) 66655-4433',
      createdAt: new Date('2024-03-12')
    },
    {
      id: '7',
      name: 'Larissa Martins',
      email: 'larissa@email.com',
      phone: '(11) 55544-3322',
      createdAt: new Date('2024-01-08'),
      notes: 'Prefere agendamentos pela manhã'
    },
    {
      id: '8',
      name: 'Diego Santos',
      email: 'diego@email.com',
      phone: '(11) 44433-2211',
      createdAt: new Date('2024-03-18')
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
    },
    {
      id: '3',
      clientId: '3',
      professionalId: '1',
      serviceId: '2',
      date: new Date('2024-06-17'),
      startTime: '09:00',
      endTime: '11:00',
      status: 'completed',
      price: 120.00
    },
    {
      id: '4',
      clientId: '4',
      professionalId: '2',
      serviceId: '4',
      date: new Date('2024-06-17'),
      startTime: '15:30',
      endTime: '16:15',
      status: 'scheduled',
      price: 30.00
    },
    {
      id: '5',
      clientId: '5',
      professionalId: '3',
      serviceId: '6',
      date: new Date('2024-06-18'),
      startTime: '11:00',
      endTime: '11:45',
      status: 'confirmed',
      price: 20.00
    },
    {
      id: '6',
      clientId: '6',
      professionalId: '4',
      serviceId: '9',
      date: new Date('2024-06-18'),
      startTime: '16:00',
      endTime: '17:00',
      status: 'scheduled',
      price: 80.00
    },
    {
      id: '7',
      clientId: '7',
      professionalId: '3',
      serviceId: '7',
      date: new Date('2024-06-19'),
      startTime: '10:00',
      endTime: '11:00',
      status: 'completed',
      price: 25.00
    },
    {
      id: '8',
      clientId: '8',
      professionalId: '1',
      serviceId: '5',
      date: new Date('2024-06-19'),
      startTime: '13:00',
      endTime: '16:00',
      status: 'confirmed',
      price: 200.00
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
    },
    {
      id: '3',
      name: 'Condicionador Hidratante',
      category: 'Higiene',
      currentStock: 12,
      minStock: 8,
      unit: 'un',
      price: 38.90,
      supplier: 'Beleza Distribuição'
    },
    {
      id: '4',
      name: 'Creme de Massagem',
      category: 'Massagem',
      currentStock: 2,
      minStock: 3,
      unit: 'kg',
      price: 85.50,
      supplier: 'Wellness Supplies'
    },
    {
      id: '5',
      name: 'Esmalte Rosa',
      category: 'Unhas',
      currentStock: 8,
      minStock: 4,
      unit: 'un',
      price: 12.90,
      supplier: 'Nail Art Pro'
    },
    {
      id: '6',
      name: 'Cera Depilatória',
      category: 'Depilação',
      currentStock: 1,
      minStock: 2,
      unit: 'kg',
      price: 65.00,
      supplier: 'Depil Express'
    },
    {
      id: '7',
      name: 'Óleo Essencial Lavanda',
      category: 'Aromaterapia',
      currentStock: 6,
      minStock: 3,
      unit: 'ml',
      price: 45.00,
      supplier: 'Wellness Supplies'
    },
    {
      id: '8',
      name: 'Algodão Quadrado',
      category: 'Descartáveis',
      currentStock: 25,
      minStock: 10,
      unit: 'pacote',
      price: 8.50,
      supplier: 'Suprimentos Gerais'
    },
    {
      id: '9',
      name: 'Luvas Descartáveis',
      category: 'Descartáveis',
      currentStock: 5,
      minStock: 15,
      unit: 'caixa',
      price: 22.90,
      supplier: 'Suprimentos Gerais'
    },
    {
      id: '10',
      name: 'Toalhas Papel',
      category: 'Descartáveis',
      currentStock: 18,
      minStock: 12,
      unit: 'pacote',
      price: 15.50,
      supplier: 'Suprimentos Gerais'
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
