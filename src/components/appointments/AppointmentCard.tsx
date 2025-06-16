
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, Phone, CheckCircle, XCircle } from 'lucide-react';
import { Appointment, Client, Professional, Service } from '@/types';

interface AppointmentCardProps {
  appointment: Appointment;
  client: Client;
  professional: Professional;
  service: Service;
  onConfirm?: (id: string) => void;
  onCancel?: (id: string) => void;
}

export const AppointmentCard = ({
  appointment,
  client,
  professional,
  service,
  onConfirm,
  onCancel
}: AppointmentCardProps) => {
  const statusColors = {
    scheduled: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
    'no-show': 'bg-gray-100 text-gray-800'
  };

  const statusLabels = {
    scheduled: 'Agendado',
    confirmed: 'Confirmado',
    completed: 'Concluído',
    cancelled: 'Cancelado',
    'no-show': 'Não compareceu'
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="font-medium">{appointment.startTime} - {appointment.endTime}</span>
          </div>
          <Badge className={statusColors[appointment.status]}>
            {statusLabels[appointment.status]}
          </Badge>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-500" />
            <span className="font-medium">{client.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{client.phone}</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="font-medium text-sm">{service.name}</p>
          <p className="text-sm text-gray-600">Com {professional.name}</p>
          <p className="text-sm font-medium text-green-600">R$ {appointment.price.toFixed(2)}</p>
        </div>

        {appointment.status === 'scheduled' && (
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onConfirm?.(appointment.id)}
              className="flex-1"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Confirmar
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onCancel?.(appointment.id)}
              className="flex-1 text-red-600 hover:text-red-700"
            >
              <XCircle className="w-4 h-4 mr-1" />
              Cancelar
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
