'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/utils';
import { Button } from '@/components/atoms';
import type { Barber } from '@/types';

interface BarberCardProps {
  barber: Barber;
  onSelectBarber?: (barberId: string) => void;
  className?: string;
}

const BarberCard: React.FC<BarberCardProps> = ({
  barber,
  onSelectBarber,
  className
}) => {
  return (
    <div className={cn(
      'bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-200',
      className
    )}>
      {/* Barber Photo */}
      <div className="relative h-64 w-full">
        <Image
          src={barber.avatar}
          alt={barber.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
          </svg>
          <span className="text-sm font-semibold text-gray-900">
            {barber.rating}
          </span>
        </div>
      </div>

      {/* Barber Info */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {barber.name}
          </h3>
          <p className="text-red-600 font-medium">
            {barber.experience} años de experiencia
          </p>
        </div>

        {/* Specialties */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Especialidades:
          </h4>
          <div className="flex flex-wrap gap-2">
            {barber.specialties.map((specialty, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Bio */}
        {barber.bio && (
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {barber.bio}
          </p>
        )}

        {/* Action Button */}
        <Button
          variant="outline"
          size="md"
          onClick={() => onSelectBarber?.(barber.id)}
          className="w-full"
        >
          Seleccionar Barbero
        </Button>
      </div>
    </div>
  );
};

export default BarberCard; 