import React from 'react';
import type { Metadata } from 'next';
import { BarbersTemplate } from '@/components/templates';

export const metadata: Metadata = {
  title: 'Nuestro Equipo - BarberWeb',
  description: 'Conoce a nuestros barberos profesionales especializados en cortes modernos, arreglo de barba y tratamientos faciales. Más de 20 años de experiencia combinada.',
  keywords: 'barberos profesionales, cortes de cabello, arreglo de barba, tratamientos faciales, barbería, BarberWeb',
  openGraph: {
    title: 'Nuestro Equipo de Barberos Profesionales',
    description: 'Conoce a nuestros expertos barberos especializados en técnicas tradicionales y modernas.',
    images: ['/images/og-barbers.jpg'],
  },
};

export default function BarbersPage() {
  return <BarbersTemplate />;
} 