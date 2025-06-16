
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Calendar, 
  Users, 
  Settings, 
  BarChart3, 
  Package, 
  Home,
  Clock,
  UserCog,
  Scissors
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

const adminNavItems = [
  { href: '/', icon: Home, label: 'Dashboard' },
  { href: '/appointments', icon: Calendar, label: 'Agendamentos' },
  { href: '/clients', icon: Users, label: 'Clientes' },
  { href: '/professionals', icon: UserCog, label: 'Profissionais' },
  { href: '/services', icon: Scissors, label: 'Serviços' },
  { href: '/reports', icon: BarChart3, label: 'Relatórios' },
];

const professionalNavItems = [
  { href: '/', icon: Home, label: 'Dashboard' },
  { href: '/my-schedule', icon: Calendar, label: 'Minha Agenda' },
  { href: '/appointments', icon: Clock, label: 'Agendamentos' },
  { href: '/clients', icon: Users, label: 'Clientes' },
];

export const Sidebar = () => {
  const location = useLocation();
  const { currentUser, hasStockModule } = useApp();
  
  const isAdmin = currentUser?.role === 'admin';
  const navItems = isAdmin ? adminNavItems : professionalNavItems;

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Scissors className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">AgendaPro</h1>
            <p className="text-sm text-gray-500">Gestão Inteligente</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                isActive 
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700" 
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
        
        {isAdmin && hasStockModule && (
          <Link
            to="/stock"
            className={cn(
              "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
              location.pathname === '/stock'
                ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700" 
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            <Package className="w-5 h-5" />
            <span className="font-medium">Estoque</span>
          </Link>
        )}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Link
          to="/settings"
          className={cn(
            "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors w-full",
            location.pathname === '/settings'
              ? "bg-blue-50 text-blue-700" 
              : "text-gray-600 hover:bg-gray-50"
          )}
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Configurações</span>
        </Link>
      </div>
    </div>
  );
};
