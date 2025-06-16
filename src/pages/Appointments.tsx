
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { AppointmentCard } from '@/components/appointments/AppointmentCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/context/AppContext';
import { Plus, Search, Filter, Calendar as CalendarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Appointments = () => {
  const { appointments, clients, professionals, services, setAppointments } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');

  // Filter appointments
  const filteredAppointments = appointments.filter(appointment => {
    const client = clients.find(c => c.id === appointment.clientId);
    const professional = professionals.find(p => p.id === appointment.professionalId);
    
    // Search filter
    const matchesSearch = !searchTerm || 
      client?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client?.phone.includes(searchTerm) ||
      professional?.name.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;

    // Date filter
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const appointmentDate = new Date(appointment.date);
    appointmentDate.setHours(0, 0, 0, 0);
    
    let matchesDate = true;
    if (dateFilter === 'today') {
      matchesDate = appointmentDate.getTime() === today.getTime();
    } else if (dateFilter === 'week') {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      matchesDate = appointmentDate >= weekStart && appointmentDate <= weekEnd;
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleConfirm = (id: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: 'confirmed' } : apt
    ));
  };

  const handleCancel = (id: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: 'cancelled' } : apt
    ));
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agendamentos</h1>
            <p className="text-gray-600">Gerencie todos os agendamentos</p>
          </div>
          <Link to="/appointments/new">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Agendamento
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por cliente, telefone ou profissional..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="scheduled">Agendado</SelectItem>
                  <SelectItem value="confirmed">Confirmado</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                  <SelectItem value="no-show">Não compareceu</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[180px]">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="week">Esta semana</SelectItem>
                  <SelectItem value="all">Todos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map(appointment => {
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
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                />
              );
            })
          ) : (
            <div className="col-span-full">
              <Card>
                <CardContent className="p-12 text-center">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nenhum agendamento encontrado
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Não há agendamentos que correspondam aos filtros selecionados.
                  </p>
                  <Link to="/appointments/new">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Criar Primeiro Agendamento
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Appointments;
