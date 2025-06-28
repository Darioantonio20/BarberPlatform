import React from 'react';
import type { Metadata } from 'next';
import { ContactTemplate } from '@/components/templates';

export const metadata: Metadata = {
  title: 'Contacto - BarberWeb',
  description: 'Ponte en contacto con BarberWeb Studio. Encuentra nuestra ubicación, horarios de atención y reserva tu cita por WhatsApp.',
  keywords: 'contacto barbería, ubicación, horarios, WhatsApp, reservar cita, BarberWeb Studio',
  openGraph: {
    title: 'Contacto - BarberWeb Studio',
    description: 'Estamos aquí para atenderte. Encuentra toda nuestra información de contacto y reserva tu cita.',
    images: ['/images/og-contact.jpg'],
  },
};

export default function ContactPage() {
  return <ContactTemplate />;
} 