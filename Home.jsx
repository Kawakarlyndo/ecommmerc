import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../utils/productService';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const result = await getAllProducts();
      if (result.success) {
        // Mostrar apenas os primeiros 8 produtos como destaque
        setFeaturedProducts(result.products.slice(0, 8));
      }
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Bem-vindo à ShopNow
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Descubra as últimas tendências da moda feminina com qualidade e estilo únicos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products/camisas">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Ver Coleção
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600">
                Cadastre-se
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Frete Grátis</h3>
              <p className="text-gray-600">Frete grátis para compras acima de R$ 150</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compra Segura</h3>
              <p className="text-gray-600">Seus dados protegidos com criptografia SSL</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Suporte 24/7</h3>
              <p className="text-gray-600">Atendimento especializado sempre disponível</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nossas Categorias</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/products/camisas" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src="/category-camisas.jpg"
                  alt="Camisas"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors">
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-2xl font-bold">Camisas</h3>
                    <p className="text-white/80">Estilo e conforto</p>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link to="/products/tenis" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src="/category-tenis.jpg"
                  alt="Tênis"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors">
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-2xl font-bold">Tênis</h3>
                    <p className="text-white/80">Para todos os momentos</p>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link to="/products/acessorios" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src="/category-acessorios.jpg"
                  alt="Acessórios"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors">
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-2xl font-bold">Acessórios</h3>
                    <p className="text-white/80">Complete seu look</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Produtos em Destaque</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Confira nossa seleção especial de produtos com as melhores ofertas e novidades
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                  <div className="bg-gray-300 h-64 rounded mb-4"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">
                Nenhum produto encontrado. Que tal adicionar alguns produtos?
              </p>
              <Link to="/admin">
                <Button>Gerenciar Produtos</Button>
              </Link>
            </div>
          )}

          {featuredProducts.length > 0 && (
            <div className="text-center mt-12">
              <Link to="/products">
                <Button size="lg" variant="outline">
                  Ver Todos os Produtos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Fique por Dentro das Novidades</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Receba ofertas exclusivas e seja a primeira a saber sobre nossos lançamentos
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <Button variant="secondary" size="lg">
              Inscrever-se
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

