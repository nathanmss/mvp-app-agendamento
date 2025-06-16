
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { 
  CreditCard, 
  Package, 
  Users, 
  Bell, 
  Shield, 
  Crown,
  Smartphone,
  Calendar,
  MessageCircle
} from 'lucide-react';

const Settings = () => {
  const { hasStockModule, setHasStockModule, currentUser } = useApp();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600">Gerencie seu plano e configurações do sistema</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Plan Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Crown className="w-5 h-5 mr-2 text-yellow-500" />
                  Plano Atual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Plano Intermediário</h3>
                    <p className="text-gray-600">1 ADM + 4 profissionais</p>
                    <Badge className="mt-2 bg-green-100 text-green-800">Ativo</Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">R$ 49,90</p>
                    <p className="text-sm text-gray-600">por mês</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600 mb-2" />
                    <p className="text-sm text-gray-600">Profissionais</p>
                    <p className="font-bold">2 de 4 usados</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <Package className="w-6 h-6 text-green-600 mb-2" />
                    <p className="text-sm text-gray-600">Módulo Estoque</p>
                    <p className="font-bold">{hasStockModule ? 'Ativo' : 'Inativo'}</p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline">Alterar Plano</Button>
                  <Button variant="outline">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Faturamento
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Modules */}
            <Card>
              <CardHeader>
                <CardTitle>Módulos Opcionais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Package className="w-6 h-6 text-blue-600" />
                      <div>
                        <h4 className="font-medium">Controle de Estoque</h4>
                        <p className="text-sm text-gray-600">Gerencie produtos e alertas de estoque baixo</p>
                        <p className="text-sm font-medium text-green-600">+R$ 30,00/mês</p>
                      </div>
                    </div>
                    <Switch 
                      checked={hasStockModule}
                      onCheckedChange={setHasStockModule}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notificações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Lembretes por E-mail</p>
                      <p className="text-sm text-gray-600">Enviar lembretes automáticos para clientes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Alertas de Estoque</p>
                      <p className="text-sm text-gray-600">Notificar quando produtos estiverem em falta</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Resumo Diário</p>
                      <p className="text-sm text-gray-600">Receber relatório diário por e-mail</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Available Plans */}
            <Card>
              <CardHeader>
                <CardTitle>Planos Disponíveis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-bold">Básico</h4>
                  <p className="text-sm text-gray-600">1 ADM + 2 profissionais</p>
                  <p className="font-bold text-green-600">R$ 29,90/mês</p>
                </div>
                <div className="border-2 border-blue-500 rounded-lg p-4 bg-blue-50">
                  <h4 className="font-bold">Intermediário</h4>
                  <p className="text-sm text-gray-600">1 ADM + 4 profissionais</p>
                  <p className="font-bold text-blue-600">R$ 49,90/mês</p>
                  <Badge className="mt-1 bg-blue-600">Atual</Badge>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-bold">Avançado</h4>
                  <p className="text-sm text-gray-600">1 ADM + 10 profissionais</p>
                  <p className="font-bold text-purple-600">R$ 89,90/mês</p>
                </div>
              </CardContent>
            </Card>

            {/* Future Features */}
            <Card>
              <CardHeader>
                <CardTitle>Próximas Funcionalidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                    <Smartphone className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">Aplicativo Mobile</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">Integração Google Agenda</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                    <MessageCircle className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">Lembretes WhatsApp</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">Portal do Cliente</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Suporte</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Central de Ajuda
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Contatar Suporte
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Sugerir Funcionalidade
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
