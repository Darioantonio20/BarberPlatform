'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/atoms';
import { ServiceCard } from '@/components/molecules';
import { cn } from '@/utils';
import { SERVICES_MOCK, ROUTES } from '@/constants';
import { ServiceCategory } from '@/types';

const ServicesTemplate: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');

  const categories = [
    { id: 'all' as const, name: 'Todos los Servicios', emoji: '✨' },
    { id: ServiceCategory.HAIRCUT, name: 'Cortes de Cabello', emoji: '✂️' },
    { id: ServiceCategory.BEARD, name: 'Servicios de Barba', emoji: '🧔' },
    { id: ServiceCategory.TREATMENT, name: 'Tratamientos Faciales', emoji: '🧴' },
    { id: ServiceCategory.STYLING, name: 'Estilizado', emoji: '💇' },
    { id: ServiceCategory.COMBO, name: 'Paquetes Especiales', emoji: '💎' },
  ];

  const filteredServices = selectedCategory === 'all' 
    ? SERVICES_MOCK 
    : SERVICES_MOCK.filter(service => service.category === selectedCategory);

  const handleBookNow = (serviceId: string) => {
    // Redirect to booking page with preselected service
    window.location.href = `${ROUTES.BOOKING}?service=${serviceId}`;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-600 to-amber-800 py-12 sm:py-16 md:py-20 lg:py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8">
            Nuestros Servicios
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-amber-100 max-w-2xl lg:max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
            Descubre nuestra amplia gama de servicios profesionales de barbería y grooming. 
            Desde cortes clásicos hasta tratamientos premium.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 sm:py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  'px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-200',
                  'border border-gray-300',
                  selectedCategory === category.id
                    ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                    : 'bg-white text-gray-700 hover:border-amber-500 hover:bg-amber-50'
                )}
              >
                <span className="mr-1 sm:mr-2">{category.emoji}</span>
                <span className="hidden sm:inline">{category.name}</span>
                <span className="sm:hidden">{category.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredServices.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.563M15 9a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No hay servicios disponibles</h3>
              <p className="text-gray-500 text-sm sm:text-base">
                No hay servicios disponibles en esta categoría.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
                  {categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  {filteredServices.length} servicio{filteredServices.length !== 1 ? 's' : ''} disponible{filteredServices.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onBookNow={handleBookNow}
                    className="card-hover"
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-amber-100 mb-6 sm:mb-8 max-w-xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Contáctanos y te ayudaremos a encontrar el servicio perfecto para ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Link href={ROUTES.HOME}>
              <Button variant="secondary" size="md" className="w-full sm:w-auto sm:size-lg">
                Ver Barberías
              </Button>
            </Link>
            <Link href={ROUTES.BOOKING}>
              <Button variant="ghost" size="md" className="w-full sm:w-auto sm:size-lg text-white border-white hover:bg-white hover:text-amber-600">
                Reservar Cita
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
              ¿Por qué elegir nuestros servicios?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              Descubre las ventajas que nos hacen únicos en el cuidado y estilo masculino
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            <div className="text-center p-4 sm:p-6 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Calidad Garantizada</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Solo utilizamos productos de alta calidad y técnicas profesionales.</p>
            </div>

            <div className="text-center p-4 sm:p-6 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Barberos Expertos</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Nuestro equipo cuenta con años de experiencia y certificaciones.</p>
            </div>

            <div className="text-center p-4 sm:p-6 rounded-lg hover:bg-gray-50 transition-colors duration-200 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Horarios Flexibles</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Abierto todos los días con horarios convenientes para ti.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesTemplate; 