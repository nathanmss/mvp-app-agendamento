
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Calendar, Users, TrendingUp, Download, FileText } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const Reports = () => {
  const { appointments, services, clients, professionals } = useApp();

  // Dados para gráficos (simulados)
  const monthlyRevenue = [
    { month: 'Jan', revenue: 4200 },
    { month: 'Fev', revenue: 3800 },
    { month: 'Mar', revenue: 5100 },
    { month: 'Abr', revenue: 4600 },
    { month: 'Mai', revenue: 5800 },
    { month: 'Jun', revenue: 6200 },
  ];

  const serviceStats = [
    { name: 'Corte Feminino', value: 35, color: '#8884d8' },
    { name: 'Coloração', value: 25, color: '#82ca9d' },
    { name: 'Corte Masculino', value: 20, color: '#ffc658' },
    { name: 'Barba', value: 15, color: '#ff7300' },
    { name: 'Outros', value: 5, color: '#8dd1e1' },
  ];

  const totalRevenue = appointments.reduce((sum, apt) => sum + apt.price, 0);
  const completedAppointments = appointments.filter(apt => apt.status === 'completed').length;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Exportar PDF</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Exportar Excel</span>
            </Button>
          </div>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Receita Total"
            value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRevenue)}
            icon={<DollarSign className="w-6 h-6" />}
            trend={{ value: 12.5, isPositive: true }}
            color="green"
          />
          <StatsCard
            title="Agendamentos"
            value={appointments.length}
            icon={<Calendar className="w-6 h-6" />}
            trend={{ value: 8.2, isPositive: true }}
            color="blue"
          />
          <StatsCard
            title="Clientes Ativos"
            value={clients.length}
            icon={<Users className="w-6 h-6" />}
            trend={{ value: 15.3, isPositive: true }}
            color="purple"
          />
          <StatsCard
            title="Taxa de Conversão"
            value="87%"
            icon={<TrendingUp className="w-6 h-6" />}
            trend={{ value: 3.1, isPositive: true }}
            color="yellow"
          />
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Receita Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [
                    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value)),
                    'Receita'
                  ]} />
                  <Bar dataKey="revenue" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Serviços Mais Populares</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={serviceStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serviceStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Resumo dos profissionais */}
        <Card>
          <CardHeader>
            <CardTitle>Performance dos Profissionais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {professionals.map((professional) => {
                const profAppointments = appointments.filter(apt => apt.professionalId === professional.id);
                const profRevenue = profAppointments.reduce((sum, apt) => sum + apt.price, 0);
                
                return (
                  <div key={professional.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {professional.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">{professional.name}</h3>
                        <p className="text-sm text-gray-500">{professional.specialties.join(', ')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(profRevenue)}
                      </p>
                      <p className="text-sm text-gray-500">{profAppointments.length} agendamentos</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;
