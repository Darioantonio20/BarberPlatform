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
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center sm:justify-start space-x-4 sm:space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('services')}
              className={`py-3 sm:py-4 px-3 sm:px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors duration-200 ${
                activeTab === 'services'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Servicios
              </span>
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`py-3 sm:py-4 px-3 sm:px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors duration-200 ${
                activeTab === 'products'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Productos
              </span>
            </button>
            <button
              onClick={() => setActiveTab('packages')}
              className={`py-3 sm:py-4 px-3 sm:px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors duration-200 ${
                activeTab === 'packages'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                Paquetes
              </span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          {/* Contenido principal */}
          <div className="flex-1 min-w-0">
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
          <div className="xl:w-80 w-full xl:sticky xl:top-24 h-fit">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l1.5-6m4.5 6h6" />
                  </svg>
                  Carrito
                </h3>
                {cart.items.length > 0 && (
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
                    {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>
              
              {cart.items.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l1.5-6m4.5 6h6" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm sm:text-base">Tu carrito está vacío</p>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">Agrega servicios o productos para continuar</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 max-h-64 sm:max-h-80 overflow-y-auto">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between border-b pb-3 sm:pb-4 last:border-b-0">
                        <div className="flex-1 min-w-0 pr-3">
                          <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate">{item.name}</h4>
                          <p className="text-xs sm:text-sm text-gray-500 capitalize">{item.type}</p>
                          <p className="text-sm sm:text-base font-semibold text-red-600">${item.price}</p>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm sm:text-base transition-colors"
                          >
                            -
                          </button>
                          <span className="w-6 sm:w-8 text-center text-sm sm:text-base font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm sm:text-base transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                      <span className="text-base sm:text-lg font-semibold text-gray-900">Total:</span>
                      <span className="text-xl sm:text-2xl font-bold text-red-600">${getCartTotal()}</span>
                    </div>
                    
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full sm:size-lg"
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
      </div>
    </main>
  );
};

export default BarbershopTemplate; 