'use client';

import React from 'react';
import Image from 'next/image';
import { cn, formatPrice, formatDuration } from '@/utils';
import { Button } from '@/components/atoms';
import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  onBookNow?: (serviceId: string) => void;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onBookNow,
  className
}) => {
  return (
    <div className={cn(
      'bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100',
      className
    )}>
      {/* Service Image */}
      <div className="relative h-48 w-full">
        <Image
          src={service.image || '/images/default-service.jpg'}
          alt={service.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-amber-600 text-white px-2 py-1 rounded-full text-xs font-semibold uppercase">
            {service.category}
          </span>
        </div>
      </div>

      {/* Service Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">
            {service.name}
          </h3>
          <div className="text-right">
            <p className="text-2xl font-bold text-amber-600">
              {formatPrice(service.price)}
            </p>
            <p className="text-sm text-gray-500">
              {formatDuration(service.duration)}
            </p>
          </div>
        </div>

        <p className="text-gray-600 mb-4 leading-relaxed">
          {service.description}
        </p>

        {/* Action Button */}
        <Button
          variant="primary"
          size="md"
          onClick={() => onBookNow?.(service.id)}
          className="w-full"
        >
          Reservar Ahora
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard; 