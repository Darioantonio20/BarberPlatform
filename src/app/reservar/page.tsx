import type { Metadata } from 'next';
import { Suspense } from 'react';
import { BookingTemplate } from '@/components/templates';

export const metadata: Metadata = {
  title: 'Reservar Cita - BarberWeb',
  description: 'Reserva tu cita en línea. Selecciona tu servicio, barbero y horario preferido. Te confirmaremos tu cita en menos de 24 horas.',
  keywords: [
    'reservar cita',
    'agendar',
    'barbería online',
    'booking',
    'cita barbería',
    'horarios disponibles'
  ],
  openGraph: {
    title: 'Reservar Cita - BarberWeb',
    description: 'Reserva tu cita en línea fácil y rápido.',
    type: 'website',
  }
};

function BookingPageContent() {
  return <BookingTemplate />;
}

export default function ReservarPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando sistema de reservas...</p>
        </div>
      </div>
    }>
      <BookingPageContent />
    </Suspense>
  );
} 