
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Clock, DollarSign, Users } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const Services = () => {
  const { services, professionals } = useApp();

  const getProfessionalNames = (professionalIds: string[]) => {
    return professionalIds
      .map(id => professionals.find(p => p.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const formatDuration = (duration: number) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    
    if (hours > 0) {
      return minutes > 0 ? `${hours}h ${minutes}min` : `${hours}h`;
    }
    return `${minutes}min`;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Serviços</h1>
          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Novo Serviço</span>
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar serviços..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {service.category}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {formatPrice(service.price)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {service.description && (
                  <p className="text-sm text-gray-600">{service.description}</p>
                )}
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(service.duration)}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span>{formatPrice(service.price)}</span>
                </div>

                <div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700 mb-2">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">Profissionais:</span>
                  </div>
                  <p className="text-sm text-gray-600 pl-6">
                    {getProfessionalNames(service.professionalIds)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Services;
