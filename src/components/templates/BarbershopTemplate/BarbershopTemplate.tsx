'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/atoms';
import { ServiceCard } from '@/components/molecules';
import { BARBERSHOPS_MOCK, SERVICES_MOCK } from '@/constants';
import { Barbershop } from '@/types';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context';

interface BarbershopTemplateProps {
  barberiaId: string;
}

const BarbershopTemplate: React.FC<BarbershopTemplateProps> = ({ barberiaId }) => {
  const router = useRouter();
  const { cart, addToCart, updateQuantity, getCartTotal } = useCart();
  const [barbershop, setBarbershop] = useState<Barbershop | null>(null);
  const [activeTab, setActiveTab] = useState<'services' | 'products' | 'packages'>('services');

  useEffect(() => {
    const foundBarbershop = BARBERSHOPS_MOCK.find(b => b.id === barberiaId);
    if (foundBarbershop) {
      setBarbershop(foundBarbershop as Barbershop);
    } else {
      router.push('/');
    }
  }, [barberiaId, router]);

  const proceedToBooking = () => {
    if (cart.items.length === 0) {
      alert('Por favor, agrega al menos un servicio o producto al carrito');
      return;
    }
    
    router.push('/reservar');
  };

  if (!barbershop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Barbería no encontrada</h1>
          <Button onClick={() => router.push('/')}>Volver al inicio</Button>
        </div>
      </div>
    );
  }

  const availableServices = SERVICES_MOCK.filter(service => 
    barbershop.services.includes(service.id)
  );

  const availablePackages = SERVICES_MOCK.filter(service => 
    barbershop.packages.includes(service.id)
  );

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header de la barbería */}
      <section className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 relative w-full md:w-64 h-48">
              <Image
                src={barbershop.image}
                alt={barbershop.name}
                fill
                className="object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = '/images/barbershops/default.svg';
                }}
              />
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {barbershop.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {barbershop.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {barbershop.address}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {barbershop.phone}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navegación de tabs */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('services')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'services'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Servicios
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Productos
            </button>
            <button
              onClick={() => setActiveTab('packages')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'packages'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Paquetes
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contenido principal */}
          <div className="flex-1">
            {activeTab === 'services' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Servicios Disponibles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableServices.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      onBookNow={() => {
                        addToCart({
                          id: service.id,
                          type: 'service',
                          name: service.name,
                          price: service.price,
                          quantity: 1,
                          image: service.image,
                          barbershopId: barberiaId
                        });
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Productos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {barbershop.products.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="relative h-48 w-full">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/images/products/default.svg';
                          }}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                        <p className="text-2xl font-bold text-red-600 mb-4">${product.price}</p>
                        <Button
                          variant="primary"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            addToCart({
                              id: product.id,
                              type: 'product',
                              name: product.name,
                              price: product.price,
                              quantity: 1,
                              image: product.image,
                              barbershopId: barberiaId
                            });
                          }}
                        >
                          Agregar al carrito
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'packages' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Paquetes Especiales</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availablePackages.map((packageItem) => (
                    <ServiceCard
                      key={packageItem.id}
                      service={packageItem}
                      onBookNow={() => {
                        addToCart({
                          id: packageItem.id,
                          type: 'package',
                          name: packageItem.name,
                          price: packageItem.price,
                          quantity: 1,
                          image: packageItem.image,
                          barbershopId: barberiaId
                        });
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Carrito lateral */}
          <div className="lg:w-80 bg-white rounded-lg shadow-md p-6 h-fit">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Carrito</h3>
            
            {cart.items.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Tu carrito está vacío</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">${item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-red-600">${getCartTotal()}</span>
                  </div>
                  
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={proceedToBooking}
                  >
                    Proceder a Reservar
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BarbershopTemplate; 