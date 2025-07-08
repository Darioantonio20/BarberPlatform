'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LocationSelector } from '@/components/molecules';
import { ROUTES } from '@/constants';
import { Barbershop } from '@/types';

const HomeTemplate: React.FC = () => {
  const router = useRouter();

  const handleSelectBarbershop = (barbershop: Barbershop) => {
    // Navegar a la página de la barbería específica
    router.push(`${ROUTES.BARBERSHOP}/${barbershop.id}`);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-blue-50 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
              Encuentra tu Barbería
              <span className="block gradient-text mt-2">Perfecta</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 lg:mb-10 max-w-2xl lg:max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
              Selecciona la ubicación más conveniente para ti y descubre todos los servicios, 
              productos y paquetes que tenemos disponibles en cada una de nuestras barberías.
            </p>
          </div>
        </div>

        {/* Decorative Elements - Hidden on mobile */}
        <div className="hidden sm:block absolute top-6 sm:top-10 left-4 sm:left-10 w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 bg-red-200 rounded-full opacity-50 animate-pulse"></div>
        <div className="hidden sm:block absolute bottom-6 sm:bottom-10 right-4 sm:right-10 w-20 sm:w-24 lg:w-32 h-20 sm:h-24 lg:h-32 bg-blue-300 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="hidden lg:block absolute top-1/2 left-2 lg:left-4 w-3 lg:w-4 h-24 lg:h-32 barbershop-pole opacity-20"></div>
      </section>

      {/* Location Selector Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <LocationSelector onSelectBarbershop={handleSelectBarbershop} />
      </section>
    </main>
  );
};

export default HomeTemplate; 