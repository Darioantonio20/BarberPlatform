'use client';

import React, { useState } from 'react';
import { Button, Input, Select, Textarea } from '@/components/atoms';
import { TimeSlotSelector } from '@/components/molecules';
import { cn, formatPrice, formatDuration } from '@/utils';
import { validateAppointmentForm } from '@/lib/validations';
import { SERVICES_MOCK, BARBERS_MOCK, BUSINESS_HOURS } from '@/constants';
import type { BookingFormData, ValidationError } from '@/types';

interface BookingFormProps {
  selectedServiceId?: string;
  onSubmit: (data: BookingFormData) => void;
  className?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({
  selectedServiceId,
  onSubmit,
  className
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    serviceId: selectedServiceId || '',
    barberId: '',
    date: '',
    time: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    notes: '',
  });

  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedService = SERVICES_MOCK.find(s => s.id === formData.serviceId);
  const selectedBarber = BARBERS_MOCK.find(b => b.id === formData.barberId);

  const handleInputChange = (field: keyof BookingFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear specific field error
    setErrors(prev => prev.filter(error => error.field !== field));
  };

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({ ...prev, time }));
    setErrors(prev => prev.filter(error => error.field !== 'time'));
  };

  const getBusinessHoursForDate = (date: string) => {
    const dayName = new Date(date).toLocaleDateString('es-MX', { weekday: 'long' });
    const normalizedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);
    
    const daySchedule = BUSINESS_HOURS.find(h => h.day === normalizedDay);
    return daySchedule 
      ? { open: daySchedule.open, close: daySchedule.close }
      : { open: '09:30', close: '20:00' };
  };

  const getFieldError = (fieldName: string) => {
    return errors.find(error => error.field === fieldName)?.message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validateAppointmentForm({
      ...formData,
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
    });

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error al enviar reserva:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.serviceId && formData.barberId && formData.date && 
                     formData.time && formData.clientName && formData.clientEmail && 
                     formData.clientPhone;

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      {/* Service Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Selecciona tu Servicio</h3>
        <Select
          label="Servicio"
          value={formData.serviceId}
          onChange={handleInputChange('serviceId')}
          error={getFieldError('serviceId')}
          required
        >
          <option value="">Selecciona un servicio</option>
          {SERVICES_MOCK.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name} - {formatPrice(service.price)} ({formatDuration(service.duration)})
            </option>
          ))}
        </Select>

        {selectedService && (
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h4 className="font-semibold text-amber-800">{selectedService.name}</h4>
            <p className="text-amber-700 text-sm mt-1">{selectedService.description}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-amber-800 font-medium">
                {formatPrice(selectedService.price)}
              </span>
              <span className="text-amber-700 text-sm">
                Duración: {formatDuration(selectedService.duration)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Barber Selection */}
      {formData.serviceId && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Selecciona tu Barbero</h3>
          <Select
            label="Barbero"
            value={formData.barberId}
            onChange={handleInputChange('barberId')}
            error={getFieldError('barberId')}
            required
          >
            <option value="">Selecciona un barbero</option>
            {BARBERS_MOCK.map((barber) => (
              <option key={barber.id} value={barber.id}>
                {barber.name} - ⭐ {barber.rating}
              </option>
            ))}
          </Select>

          {selectedBarber && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-semibold">
                    {selectedBarber.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedBarber.name}</h4>
                  <p className="text-gray-600 text-sm">
                    {selectedBarber.experience} años de experiencia
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm text-gray-600">{selectedBarber.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Date Selection */}
      {formData.barberId && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Selecciona Fecha y Hora</h3>
          <Input
            label="Fecha"
            type="date"
            value={formData.date}
            onChange={handleInputChange('date')}
            error={getFieldError('date')}
            min={new Date().toISOString().split('T')[0]}
            required
          />

          {formData.date && selectedService && (
            <TimeSlotSelector
              date={formData.date}
              selectedTime={formData.time}
              onTimeSelect={handleTimeSelect}
              businessHours={getBusinessHoursForDate(formData.date)}
              serviceDuration={selectedService.duration}
              bookedSlots={[]} // TODO: Implement real booked slots
            />
          )}
        </div>
      )}

      {/* Client Information */}
      {formData.time && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Información de Contacto</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre Completo"
              value={formData.clientName}
              onChange={handleInputChange('clientName')}
              error={getFieldError('clientName')}
              placeholder="Tu nombre completo"
              required
            />
            
            <Input
              label="Teléfono"
              type="tel"
              value={formData.clientPhone}
              onChange={handleInputChange('clientPhone')}
              error={getFieldError('clientPhone')}
              placeholder="+52 55 1234 5678"
              required
            />
          </div>

          <Input
            label="Correo Electrónico"
            type="email"
            value={formData.clientEmail}
            onChange={handleInputChange('clientEmail')}
            error={getFieldError('clientEmail')}
            placeholder="tu@email.com"
            required
          />

          <Textarea
            label="Notas Adicionales (Opcional)"
            value={formData.notes}
            onChange={handleInputChange('notes')}
            placeholder="Menciona cualquier preferencia especial o requerimiento..."
            rows={3}
          />
        </div>
      )}

      {/* Summary and Submit */}
      {isFormValid && (
        <div className="space-y-4">
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen de tu Cita</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Servicio:</span>
                <span className="font-medium">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Barbero:</span>
                <span className="font-medium">{selectedBarber?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fecha:</span>
                <span className="font-medium">
                  {new Date(formData.date).toLocaleDateString('es-MX', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hora:</span>
                <span className="font-medium">{formData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duración:</span>
                <span className="font-medium">{formatDuration(selectedService?.duration || 0)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t pt-3">
                <span>Total:</span>
                <span className="text-amber-600">{formatPrice(selectedService?.price || 0)}</span>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Procesando...' : 'Confirmar Reserva'}
          </Button>
        </div>
      )}
    </form>
  );
};

export default BookingForm; 