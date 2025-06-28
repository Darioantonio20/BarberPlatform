'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/atoms';
import { BookingForm } from '@/components/molecules';
import { cn } from '@/utils';
import { BUSINESS_INFO, ROUTES } from '@/constants';
import type { BookingFormData } from '@/types';

const BookingTemplate: React.FC = () => {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get('service');
  
  const [bookingStatus, setBookingStatus] = useState<'form' | 'success' | 'error'>('form');
  const [bookingDetails, setBookingDetails] = useState<BookingFormData | null>(null);

  const handleBookingSubmit = async (data: BookingFormData) => {
    try {
      // Here you would typically send the data to your API
      console.log('Booking data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setBookingDetails(data);
      setBookingStatus('success');
    } catch (error) {
      console.error('Error creating booking:', error);
      setBookingStatus('error');
    }
  };

  const handleNewBooking = () => {
    setBookingStatus('form');
    setBookingDetails(null);
  };

  if (bookingStatus === 'success') {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              ¡Reserva Confirmada! 🎉
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Tu cita ha sido reservada exitosamente. Te enviaremos un correo de confirmación con todos los detalles.
            </p>

            {/* Booking Summary */}
            {bookingDetails && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalles de tu Cita</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cliente:</span>
                    <span className="font-medium">{bookingDetails.clientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{bookingDetails.clientEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Teléfono:</span>
                    <span className="font-medium">{bookingDetails.clientPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fecha:</span>
                    <span className="font-medium">
                      {new Date(bookingDetails.date).toLocaleDateString('es-MX', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hora:</span>
                    <span className="font-medium">{bookingDetails.time}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Info */}
            <div className="bg-amber-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-amber-800 mb-4">Información de Contacto</h3>
              <div className="space-y-2 text-amber-700">
                <p className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {BUSINESS_INFO.phone}
                </p>
                <p className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {BUSINESS_INFO.address}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" onClick={handleNewBooking}>
                Hacer Otra Reserva
              </Button>
              <Link href={ROUTES.HOME}>
                <Button variant="outline" size="lg">
                  Volver al Inicio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (bookingStatus === 'error') {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            {/* Error Icon */}
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Error en la Reserva
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Ha ocurrido un error al procesar tu reserva. Por favor, inténtalo de nuevo o contáctanos directamente.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" onClick={handleNewBooking}>
                Intentar de Nuevo
              </Button>
              <a href={`tel:${BUSINESS_INFO.phone}`}>
                <Button variant="outline" size="lg">
                  Llamar Ahora
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-600 to-amber-800 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Reserva tu Cita
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Selecciona tu servicio, barbero y horario preferido. 
            Te confirmaremos tu cita en menos de 24 horas.
          </p>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Progress Indicator */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Paso a paso:</span>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                    Servicio
                  </span>
                  <span className="text-gray-300">→</span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                    Barbero
                  </span>
                  <span className="text-gray-300">→</span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                    Fecha/Hora
                  </span>
                  <span className="text-gray-300">→</span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                    Confirmar
                  </span>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="p-6">
              <BookingForm
                selectedServiceId={preselectedService || undefined}
                onSubmit={handleBookingSubmit}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Necesitas Ayuda?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Si tienes alguna pregunta o necesitas asistencia con tu reserva, no dudes en contactarnos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Llámanos</h3>
              <p className="text-gray-600 text-sm mb-3">Habla directamente con nosotros</p>
              <a href={`tel:${BUSINESS_INFO.phone}`} className="text-amber-600 hover:text-amber-700 font-medium">
                {BUSINESS_INFO.phone}
              </a>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 text-sm mb-3">Envíanos un mensaje</p>
              <a href={`mailto:${BUSINESS_INFO.email}`} className="text-amber-600 hover:text-amber-700 font-medium">
                {BUSINESS_INFO.email}
              </a>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Visítanos</h3>
              <p className="text-gray-600 text-sm mb-3">Conoce nuestro local</p>
              <p className="text-amber-600 font-medium text-sm">
                {BUSINESS_INFO.address}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BookingTemplate; 