'use client';

import React, { useState } from 'react';
import { cn } from '@/utils';

interface DatePickerProps {
  value?: string;
  onChange: (date: string) => void;
  minDate?: string;
  maxDate?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  error,
  className
}) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const date = value ? new Date(value) : new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  });

  const today = new Date();
  const selectedDate = value ? new Date(value) : null;
  const minDateObj = minDate ? new Date(minDate) : today;
  const maxDateObj = maxDate ? new Date(maxDate) : null;

  // Obtener días del mes
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Días vacíos al inicio
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const selectDate = (date: Date) => {
    if (disabled) return;
    
    const dateString = date.toISOString().split('T')[0];
    
    // Validar restricciones de fecha
    if (minDateObj && date < minDateObj) return;
    if (maxDateObj && date > maxDateObj) return;
    
    onChange(dateString);
  };

  const isDateDisabled = (date: Date) => {
    if (minDateObj && date < minDateObj) return true;
    if (maxDateObj && date > maxDateObj) return true;
    return false;
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className={cn('w-full max-w-md', className)}>
      <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
        {/* Header del calendario */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigateMonth('prev')}
              disabled={disabled}
              className="p-2 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <h2 className="text-lg font-semibold">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            
            <button
              type="button"
              onClick={() => navigateMonth('next')}
              disabled={disabled}
              className="p-2 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 bg-gray-50 border-b">
          {dayNames.map((day) => (
            <div key={day} className="p-3 text-center text-xs font-medium text-gray-600 uppercase">
              {day}
            </div>
          ))}
        </div>

        {/* Días del mes */}
        <div className="grid grid-cols-7">
          {days.map((date, index) => (
            <div key={index} className="relative">
              {date ? (
                <button
                  type="button"
                  onClick={() => selectDate(date)}
                  disabled={disabled || isDateDisabled(date)}
                  className={cn(
                    'w-full h-12 flex items-center justify-center text-sm font-medium transition-all duration-200',
                    'hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-inset',
                    isDateSelected(date) && 'bg-amber-600 text-white shadow-md',
                    isToday(date) && !isDateSelected(date) && 'bg-amber-100 text-amber-800 font-bold',
                    isDateDisabled(date) && 'text-gray-300 cursor-not-allowed hover:bg-transparent',
                    !isDateSelected(date) && !isToday(date) && !isDateDisabled(date) && 'text-gray-700'
                  )}
                >
                  {date.getDate()}
                  {isToday(date) && !isDateSelected(date) && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-600 rounded-full"></div>
                  )}
                </button>
              ) : (
                <div className="w-full h-12"></div>
              )}
            </div>
          ))}
        </div>

        {/* Fecha seleccionada */}
        {selectedDate && (
          <div className="bg-gray-50 px-4 py-3 border-t">
            <p className="text-sm text-gray-600">
              Fecha seleccionada: <span className="font-medium text-gray-900">
                {selectedDate.toLocaleDateString('es-MX', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default DatePicker; 