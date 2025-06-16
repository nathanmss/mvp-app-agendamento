
import { Layout } from '@/components/layout/Layout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AppointmentCard } from '@/components/appointments/AppointmentCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { appointments, clients, professionals, services, products, hasStockModule } = useApp();

  // Calculate today's appointments
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    aptDate.setHours(0, 0, 0, 0);
    return aptDate.getTime() === today.getTime();
  });

  // Calculate revenue
  const todayRevenue = todayAppointments
    .filter(apt => apt.status === 'completed')
    .reduce((sum, apt) => sum + apt.price, 0);

  // Low stock alerts
  const lowStockProducts = products.filter(p => p.currentStock <= p.minStock);

  // Get next appointments (next 3 today)
  const nextAppointments = todayAppointments
    .filter(apt => apt.status === 'scheduled' || apt.status === 'confirmed')
    .sort((a, b) => a.startTime.localeCompare(b.startTime))
    .slice(0, 3);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Visão geral do seu negócio hoje</p>
          </div>
          <Link to="/appointments/new">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Agendamento
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Agendamentos Hoje"
            value={todayAppointments.length}
            icon={<Calendar className="w-6 h-6" />}
            color="blue"
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Clientes Ativos"
            value={clients.length}
            icon={<Users className="w-6 h-6" />}
            color="green"
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Receita Hoje"
            value={`R$ ${todayRevenue.toFixed(2)}`}
            icon={<DollarSign className="w-6 h-6" />}
            color="yellow"
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Profissionais Ativos"
            value={professionals.filter(p => p.isActive).length}
            icon={<TrendingUp className="w-6 h-6" />}
            color="purple"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Próximos Agendamentos
                </CardTitle>
                <Link to="/appointments">
                  <Button variant="outline" size="sm">Ver Todos</Button>
                </Link>
              </CardHeader>
              <CardContent>
                {nextAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {nextAppointments.map(appointment => {
                      const client = clients.find(c => c.id === appointment.clientId)!;
                      const professional = professionals.find(p => p.id === appointment.professionalId)!;
                      const service = services.find(s => s.id === appointment.serviceId)!;
                      
                      return (
                        <AppointmentCard
                          key={appointment.id}
                          appointment={appointment}
                          client={client}
                          professional={professional}
                          service={service}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum agendamento para hoje</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/appointments/new" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Novo Agendamento
                  </Button>
                </Link>
                <Link to="/clients/new" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Novo Cliente
                  </Button>
                </Link>
                <Link to="/services" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Gerenciar Serviços
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Low Stock Alerts (if stock module enabled) */}
            {hasStockModule && lowStockProducts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-600">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Estoque Baixo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lowStockProducts.slice(0, 3).map(product => (
                      <div key={product.id} className="flex justify-between items-center p-2 bg-orange-50 rounded">
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-gray-600">{product.currentStock} {product.unit} restantes</p>
                        </div>
                      </div>
                    ))}
                    <Link to="/stock">
                      <Button variant="link" className="w-full text-orange-600">
                        Ver Estoque Completo
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Team Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Desempenho da Equipe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {professionals.filter(p => p.isActive).map(professional => {
                    const professionalAppointments = todayAppointments.filter(
                      apt => apt.professionalId === professional.id
                    );
                    
                    return (
                      <div key={professional.id} className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {professional.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="text-sm font-medium">{professional.name}</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {professionalAppointments.length} agendamentos
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
