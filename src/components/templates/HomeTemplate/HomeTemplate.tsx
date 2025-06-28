'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/atoms';
import { ServiceCard } from '@/components/molecules';
import { SERVICES_MOCK, ROUTES, BUSINESS_INFO } from '@/constants';

const HomeTemplate: React.FC = () => {
  const featuredServices = SERVICES_MOCK.slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Estilo y Tradición
              <span className="block gradient-text">en Cada Corte</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experimenta el arte de la barbería tradicional con un toque moderno. 
              Nuestros barberos expertos te ofrecen los mejores cortes y servicios 
              de grooming en la ciudad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={ROUTES.BOOKING}>
                <Button variant="primary" size="lg">
                  Reservar Cita
                </Button>
              </Link>
              <Link href={ROUTES.SERVICES}>
                <Button variant="outline" size="lg">
                  Ver Servicios
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-red-200 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-300 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-4 w-4 h-32 barbershop-pole opacity-20"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Citas Puntuales</h3>
              <p className="text-gray-600">Respetamos tu tiempo. Citas precisas sin esperas innecesarias.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Calidad Garantizada</h3>
              <p className="text-gray-600">Solo los mejores productos y técnicas para resultados excepcionales.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Barberos Expertos</h3>
              <p className="text-gray-600">Profesionales con años de experiencia y pasión por su oficio.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Servicios Destacados
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Desde cortes clásicos hasta los estilos más modernos, 
              tenemos el servicio perfecto para ti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onBookNow={() => {
                  // Navigate to booking with preselected service
                  window.location.href = `${ROUTES.BOOKING}?service=${service.id}`;
                }}
              />
            ))}
          </div>

          <div className="text-center">
            <Link href={ROUTES.SERVICES}>
              <Button variant="outline" size="lg">
                Ver Todos los Servicios
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 barbershop-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para Transformar tu Estilo?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Agenda tu cita hoy y descubre por qué somos la barbería favorita de la ciudad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={ROUTES.BOOKING}>
              <Button variant="secondary" size="lg">
                Reservar Ahora
              </Button>
            </Link>
            <a href={`tel:${BUSINESS_INFO.phone}`}>
              <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white hover:text-red-600">
                Llamar Ahora
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomeTemplate; 