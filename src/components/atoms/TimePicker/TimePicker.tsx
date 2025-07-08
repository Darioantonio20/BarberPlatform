'use client';

import React from 'react';
import { cn } from '@/utils';
import type { TimeSlot } from '@/types';

interface TimePickerProps {
  date: string;
  selectedTime?: string;
  onTimeSelect: (time: string) => void;
  businessHours: { open: string; close: string };
  serviceDuration: number;
  bookedSlots?: string[];
  className?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
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
  
  // Organizar slots por periodos del día
  const organizeSlotsByPeriod = (slots: TimeSlot[]) => {
    const morning = slots.filter(slot => {
      const hour = parseInt(slot.time.split(':')[0]);
      return hour >= 9 && hour < 12;
    });
    
    const afternoon = slots.filter(slot => {
      const hour = parseInt(slot.time.split(':')[0]);
      return hour >= 12 && hour < 17;
    });
    
    const evening = slots.filter(slot => {
      const hour = parseInt(slot.time.split(':')[0]);
      return hour >= 17;
    });
    
    return { morning, afternoon, evening };
  };

  const { morning, afternoon, evening } = organizeSlotsByPeriod(timeSlots);
  
  if (timeSlots.length === 0) {
    return (
      <div className={cn('p-8 text-center', className)}>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay horarios disponibles</h3>
          <p className="text-gray-500">Selecciona otra fecha para ver más opciones</p>
        </div>
      </div>
    );
  }

  const renderTimeSlots = (slots: TimeSlot[], title: string, icon: React.ReactNode) => {
    if (slots.length === 0) return null;
    
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-700">
          {icon}
          <h4 className="font-semibold text-sm uppercase tracking-wide">{title}</h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {slots.map((slot) => (
            <button
              key={slot.time}
              onClick={() => slot.available && onTimeSelect(slot.time)}
              disabled={!slot.available}
              className={cn(
                'relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                'border-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2',
                slot.available
                  ? 'border-gray-200 bg-white text-gray-700 hover:border-amber-300 hover:bg-amber-50 hover:shadow-sm'
                  : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed',
                selectedTime === slot.time && slot.available &&
                  'border-amber-500 bg-amber-500 text-white shadow-lg transform scale-105'
              )}
            >
              <div className="flex flex-col items-center">
                <span className="font-bold text-gray-500">{slot.time}</span>
                {selectedTime === slot.time && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
                {!slot.available && (
                  <span className="text-xs mt-1 text-gray-500">No disponible</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-amber-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold">Selecciona tu Horario</h3>
        </div>
        <p className="text-gray-600">
          Fecha: <span className="font-semibold">
            {new Date(date).toLocaleDateString('es-MX', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
          </span>
        </p>
      </div>

      {/* Time Slots by Period */}
      <div className="space-y-6">
        {renderTimeSlots(morning, 'Mañana', 
          <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
        
        {renderTimeSlots(afternoon, 'Tarde', 
          <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
        
        {renderTimeSlots(evening, 'Noche', 
          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </div>

      {/* Legend */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h5 className="text-sm font-semibold text-gray-700 mb-3">Leyenda:</h5>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-500 rounded border-2 border-amber-500"></div>
            <span className="text-gray-600">Seleccionado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border-2 border-gray-200 rounded"></div>
            <span className="text-gray-600">Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-50 border-2 border-gray-100 rounded"></div>
            <span className="text-gray-600">No disponible</span>
          </div>
        </div>
      </div>

      {/* Selected Time Summary */}
      {selectedTime && (
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-amber-800">¡Horario Seleccionado!</h4>
              <p className="text-amber-700">
                Tu cita está programada para las <span className="font-bold">{selectedTime}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker; 