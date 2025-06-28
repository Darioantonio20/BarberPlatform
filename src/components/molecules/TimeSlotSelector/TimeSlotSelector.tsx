'use client';

import React from 'react';
import { cn } from '@/utils';
import type { TimeSlot } from '@/types';

interface TimeSlotSelectorProps {
  date: string;
  selectedTime?: string;
  onTimeSelect: (time: string) => void;
  businessHours: { open: string; close: string };
  serviceDuration: number;
  bookedSlots?: string[];
  className?: string;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  date,
  selectedTime,
  onTimeSelect,
  businessHours,
  serviceDuration,
  bookedSlots = [],
  className
}) => {
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const startTime = new Date(`${date}T${businessHours.open}`);
    const endTime = new Date(`${date}T${businessHours.close}`);
    
    // Ajustar para que el último slot permita completar el servicio
    endTime.setMinutes(endTime.getMinutes() - serviceDuration);

    const current = new Date(startTime);
    
    while (current <= endTime) {
      const timeString = current.toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      
      const isBooked = bookedSlots.includes(timeString);
      const isPast = new Date() > current;
      
      slots.push({
        time: timeString,
        available: !isBooked && !isPast,
      });
      
      // Incrementar por 30 minutos
      current.setMinutes(current.getMinutes() + 30);
    }
    
    return slots;
  };

  const timeSlots = generateTimeSlots();
  
  if (timeSlots.length === 0) {
    return (
      <div className={cn('p-4 text-center text-gray-500', className)}>
        No hay horarios disponibles para esta fecha
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-semibold text-gray-900">
        Horarios Disponibles
      </h3>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {timeSlots.map((slot) => (
          <button
            key={slot.time}
            onClick={() => slot.available && onTimeSelect(slot.time)}
            disabled={!slot.available}
            className={cn(
              'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              'border border-gray-300',
              slot.available
                ? 'hover:border-amber-500 hover:bg-amber-50 text-gray-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed',
              selectedTime === slot.time && slot.available &&
                'bg-amber-600 text-white border-amber-600 shadow-md'
            )}
          >
            {slot.time}
          </button>
        ))}
      </div>
      
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-amber-600 rounded"></div>
          <span>Seleccionado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-white border border-gray-300 rounded"></div>
          <span>Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-100 rounded"></div>
          <span>No disponible</span>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotSelector; 