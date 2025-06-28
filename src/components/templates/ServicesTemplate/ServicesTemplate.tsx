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
      <section className="bg-gradient-to-br from-amber-600 to-amber-800 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nuestros Servicios
          </h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            Descubre nuestra amplia gama de servicios profesionales de barbería y grooming. 
            Desde cortes clásicos hasta tratamientos premium.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  'px-6 py-3 rounded-full text-sm font-medium transition-all duration-200',
                  'border border-gray-300',
                  selectedCategory === category.id
                    ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                    : 'bg-white text-gray-700 hover:border-amber-500 hover:bg-amber-50'
                )}
              >
                <span className="mr-2">{category.emoji}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No hay servicios disponibles en esta categoría.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600">
                  {filteredServices.length} servicio{filteredServices.length !== 1 ? 's' : ''} disponible{filteredServices.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Contáctanos y te ayudaremos a encontrar el servicio perfecto para ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={ROUTES.CONTACT}>
              <Button variant="secondary" size="lg">
                Contactar Ahora
              </Button>
            </Link>
            <Link href={ROUTES.BOOKING}>
              <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white hover:text-amber-600">
                Reservar Cita
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir nuestros servicios?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Calidad Garantizada</h3>
              <p className="text-gray-600">Solo utilizamos productos de alta calidad y técnicas profesionales.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Barberos Expertos</h3>
              <p className="text-gray-600">Nuestro equipo cuenta con años de experiencia y certificaciones.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Horarios Flexibles</h3>
              <p className="text-gray-600">Abierto todos los días con horarios convenientes para ti.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesTemplate; 