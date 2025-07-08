'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/atoms';
import { BARBERSHOPS_MOCK } from '@/constants';
import { Barbershop } from '@/types';

interface LocationSelectorProps {
  onSelectBarbershop: (barbershop: Barbershop) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onSelectBarbershop }) => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleLocationSelect = (barbershop: Barbershop) => {
    setSelectedLocation(barbershop.id);
    onSelectBarbershop(barbershop);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Selecciona una Ubicación
        </h2>
        <p className="text-lg text-gray-600">
          Elige la barbería más cercana a ti para ver sus servicios y realizar tu reserva
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BARBERSHOPS_MOCK.map((barbershop) => (
          <div
            key={barbershop.id}
            className={`border rounded-lg p-6 cursor-pointer transition-all duration-300 ${
              selectedLocation === barbershop.id
                ? 'border-red-500 bg-red-50 shadow-lg'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
            onClick={() => handleLocationSelect(barbershop)}
          >
            <div className="mb-4 relative h-48 w-full">
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
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {barbershop.name}
            </h3>
            
            <p className="text-gray-600 mb-3">
              {barbershop.description}
            </p>
            
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {barbershop.address}
            </div>
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {barbershop.phone}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {barbershop.services.slice(0, 3).map((serviceId) => (
                <span
                  key={serviceId}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {serviceId.replace('-', ' ')}
                </span>
              ))}
              {barbershop.services.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  +{barbershop.services.length - 3} más
                </span>
              )}
            </div>
            
            <Button
              variant={selectedLocation === barbershop.id ? 'primary' : 'outline'}
              size="md"
              className="w-full"
              onClick={() => handleLocationSelect(barbershop)}
            >
              {selectedLocation === barbershop.id ? 'Seleccionado' : 'Seleccionar'}
            </Button>
          </div>
        ))}
      </div>

      {/* Sección de Mapa Placeholder */}
      <div className="mt-12 bg-gray-100 rounded-lg p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Mapa de Ubicaciones
        </h3>
        <p className="text-gray-600 mb-4">
          Pronto podrás ver todas nuestras ubicaciones en un mapa interactivo
        </p>
        <div className="bg-white rounded-lg p-6 border-2 border-dashed border-gray-300">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <p className="text-gray-500">Mapa interactivo próximamente</p>
        </div>
      </div>
    </div>
  );
};

export default LocationSelector; 