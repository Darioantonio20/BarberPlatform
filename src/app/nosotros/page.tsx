import React from 'react';
import type { Metadata } from 'next';
import { AboutTemplate } from '@/components/templates';

export const metadata: Metadata = {
  title: 'Nosotros - BarberWeb',
  description: 'Conoce la historia de BarberWeb Studio, nuestros valores y el compromiso con la excelencia en cada servicio de barbería.',
  keywords: 'historia barbería, valores, tradición, modernidad, experiencia, BarberWeb Studio',
  openGraph: {
    title: 'Nuestra Historia - BarberWeb Studio',
    description: 'Más que una barbería, somos una tradición que combina experiencia artesanal con técnicas modernas.',
    images: ['/images/og-about.jpg'],
  },
};

export default function AboutPage() {
  return <AboutTemplate />;
} 