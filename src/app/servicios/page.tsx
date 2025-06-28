import type { Metadata } from 'next';
import { ServicesTemplate } from '@/components/templates';

export const metadata: Metadata = {
  title: 'Servicios - BarberWeb',
  description: 'Descubre nuestra amplia gama de servicios profesionales de barbería y grooming. Desde cortes clásicos hasta tratamientos premium.',
  keywords: [
    'barbería',
    'corte de cabello',
    'arreglo de barba',
    'tratamientos faciales',
    'paquetes',
    'grooming'
  ],
  openGraph: {
    title: 'Servicios - BarberWeb',
    description: 'Servicios profesionales de barbería: cortes, barbas, faciales y más.',
    type: 'website',
  }
};

export default function ServiciosPage() {
  return <ServicesTemplate />;
} 