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
      <section className="relative bg-gradient-to-br from-red-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Encuentra tu Barbería
              <span className="block gradient-text">Perfecta</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Selecciona la ubicación más conveniente para ti y descubre todos los servicios, 
              productos y paquetes que tenemos disponibles en cada una de nuestras barberías.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-red-200 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-300 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-4 w-4 h-32 barbershop-pole opacity-20"></div>
      </section>

      {/* Location Selector Section */}
      <section className="py-16 bg-white">
        <LocationSelector onSelectBarbershop={handleSelectBarbershop} />
      </section>
    </main>
  );
};

export default HomeTemplate; 