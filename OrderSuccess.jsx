import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OrderSuccess() {
  const location = useLocation();
  const orderData = location.state?.orderData;

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Pedido não encontrado
          </h1>
          <Link to="/">
            <Button>Voltar ao Início</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Confirmação de Sucesso */}
          <div className="text-center mb-8">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Pedido Confirmado!
            </h1>
            <p className="text-gray-600 text-lg">
              Obrigado pela sua compra. Seu pedido foi processado com sucesso.
            </p>
          </div>

          {/* Detalhes do Pedido */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Detalhes do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Número do Pedido</h3>
                  <p className="text-gray-600">{orderData.orderNumber}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Total Pago</h3>
                  <p className="text-gray-600 text-lg font-semibold">
                    {formatPrice(orderData.total)}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email de Confirmação</h3>
                  <p className="text-gray-600">{orderData.customerData.email}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Endereço de Entrega</h3>
                  <p className="text-gray-600">
                    {orderData.customerData.address}, {orderData.customerData.city}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Produtos Comprados */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Produtos Comprados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img
                      src={item.image || '/placeholder-product.jpg'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-gray-600">Quantidade: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Status de Entrega */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Status da Entrega</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <div>
                    <h4 className="font-semibold">Pedido Confirmado</h4>
                    <p className="text-gray-600 text-sm">Seu pedido foi recebido e confirmado</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Package className="h-6 w-6 text-gray-400" />
                  <div>
                    <h4 className="font-semibold text-gray-600">Preparando para Envio</h4>
                    <p className="text-gray-600 text-sm">Seus produtos estão sendo preparados</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck className="h-6 w-6 text-gray-400" />
                  <div>
                    <h4 className="font-semibold text-gray-600">Em Transporte</h4>
                    <p className="text-gray-600 text-sm">Produto a caminho do destino</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Próximos Passos */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 rounded-full p-1">
                  <span className="block w-2 h-2 bg-blue-600 rounded-full"></span>
                </div>
                <div>
                  <h4 className="font-semibold">Confirmação por Email</h4>
                  <p className="text-gray-600 text-sm">
                    Você receberá um email de confirmação com todos os detalhes do seu pedido.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 rounded-full p-1">
                  <span className="block w-2 h-2 bg-blue-600 rounded-full"></span>
                </div>
                <div>
                  <h4 className="font-semibold">Código de Rastreamento</h4>
                  <p className="text-gray-600 text-sm">
                    Assim que seu pedido for enviado, você receberá o código de rastreamento.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 rounded-full p-1">
                  <span className="block w-2 h-2 bg-blue-600 rounded-full"></span>
                </div>
                <div>
                  <h4 className="font-semibold">Prazo de Entrega</h4>
                  <p className="text-gray-600 text-sm">
                    Seu pedido será entregue em até 7 dias úteis.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="outline" size="lg">
                <Home className="h-5 w-5 mr-2" />
                Voltar ao Início
              </Button>
            </Link>
            <Link to="/profile">
              <Button size="lg">
                Ver Meus Pedidos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

