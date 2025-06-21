import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Package, AlertTriangle, TrendingDown, Edit } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const Stock = () => {
  const { products } = useApp();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const getStockStatus = (product: any) => {
    if (product.currentStock <= product.minStock) {
      return { status: 'low', variant: 'destructive' as const, icon: AlertTriangle };
    }
    return { status: 'normal', variant: 'secondary' as const, icon: Package };
  };

  const lowStockProducts = products.filter(p => p.currentStock <= p.minStock);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Controle de Estoque</h1>
          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Novo Produto</span>
          </Button>
        </div>

        {lowStockProducts.length > 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-orange-800">
                <AlertTriangle className="w-5 h-5" />
                <span>Produtos com Estoque Baixo</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lowStockProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between py-2 border-b border-orange-200 last:border-b-0">
                    <span className="font-medium text-orange-900">{product.name}</span>
                    <Badge variant="destructive">
                      {product.currentStock} {product.unit} restantes
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar produtos..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const stockStatus = getStockStatus(product);
            const StockIcon = stockStatus.icon;
            
            return (
              <Card key={product.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {product.category}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <StockIcon className={`w-4 h-4 ${stockStatus.status === 'low' ? 'text-red-500' : 'text-green-500'}`} />
                      <span className="text-sm font-medium">
                        {product.currentStock} {product.unit}
                      </span>
                    </div>
                    <Badge variant={stockStatus.variant}>
                      {stockStatus.status === 'low' ? 'Estoque Baixo' : 'Normal'}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Estoque mínimo:</span>
                      <span>{product.minStock} {product.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Preço unitário:</span>
                      <span className="font-medium text-green-600">{formatPrice(product.price)}</span>
                    </div>
                    {product.supplier && (
                      <div className="flex justify-between">
                        <span>Fornecedor:</span>
                        <span>{product.supplier}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Valor total em estoque:</span>
                      <span className="font-semibold text-gray-900">
                        {formatPrice(product.currentStock * product.price)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Stock;
