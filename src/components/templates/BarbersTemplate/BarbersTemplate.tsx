import React from 'react';
import Link from 'next/link';
import { BarberCard } from '@/components/molecules';
import { Button } from '@/components/atoms';
import { BARBERS_MOCK, ROUTES } from '@/constants';

interface BarbersTemplateProps {
  className?: string;
}

const BarbersTemplate: React.FC<BarbersTemplateProps> = ({ className }) => {
  return (
    <main className={`min-h-screen bg-gradient-to-b from-white to-blue-50 ${className || ''}`}>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 barbershop-pole opacity-5"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Nuestro Equipo</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Conoce a nuestros barberos profesionales, cada uno especializado en diferentes 
              técnicas y estilos para brindarte el mejor servicio.
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="flex justify-center space-x-8 mb-12">
            <div className="w-1 h-16 bg-red-600 transform rotate-12"></div>
            <div className="w-1 h-20 bg-blue-600"></div>
            <div className="w-1 h-16 bg-red-600 transform -rotate-12"></div>
          </div>
        </div>
      </section>

      {/* Barbers Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {BARBERS_MOCK.map((barber, index) => (
              <div 
                key={barber.id}
                className="animate-slideInUp"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <BarberCard barber={barber} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              ¿Por qué elegir nuestro equipo?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Más que barberos, somos artistas dedicados a crear looks únicos que reflejen tu personalidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Experiencia Comprobada</h3>
              <p className="text-gray-600 leading-relaxed">
                Más de 20 años de experiencia combinada en técnicas tradicionales y modernas de barbería.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Pasión por el Detalle</h3>
              <p className="text-gray-600 leading-relaxed">
                Cada corte es una obra de arte. Nos enfocamos en cada detalle para lograr la perfección.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Actualización Constante</h3>
              <p className="text-gray-600 leading-relaxed">
                Nos mantenemos al día con las últimas tendencias y técnicas de la industria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 barbershop-gradient">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para tu transformación?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Reserva tu cita con cualquiera de nuestros barberos expertos y vive la experiencia BarberWeb.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link href={ROUTES.BOOKING}>
              <Button 
                variant="secondary" 
                size="lg"
                className="w-full sm:w-auto bg-red text-red-600 hover:bg-blue-100 border-white hover:border-blue-100"
              >
                Reservar Cita Ahora
              </Button>
            </Link>
            <Link href={ROUTES.SERVICES}>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-white text-white hover:bg-red hover:text-red-600"
              >
                Ver Nuestros Servicios
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BarbersTemplate; 