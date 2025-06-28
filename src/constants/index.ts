// ============================================
// CONSTANTS FOR BARBERWEB APPLICATION
// ============================================

import { ServiceCategory } from '@/types';

export const SITE_CONFIG = {
  name: 'BarberWeb',
  title: 'BarberWeb - Barbería Profesional',
  description: 'La mejor barbería de la ciudad. Cortes modernos, servicios de calidad y profesionales expertos.',
  url: 'https://barberweb.com',
  locale: 'es-MX',
} as const;

export const BUSINESS_INFO = {
  name: 'BarberWeb Studio',
  address: 'Av. Principal 123, Col. Centro, Ciudad, CP 12345',
  phone: '+52 55 1234 5678',
  email: 'info@barberweb.com',
  social: {
    instagram: '@barberweb',
    facebook: 'BarberWebStudio',
    whatsapp: '+5255123456789',
  },
} as const;

export const BUSINESS_HOURS = [
  { day: 'Lunes', open: '09:30', close: '20:00', closed: false },
  { day: 'Martes', open: '09:30', close: '20:00', closed: false },
  { day: 'Miércoles', open: '09:30', close: '20:00', closed: false },
  { day: 'Jueves', open: '09:30', close: '20:00', closed: false },
  { day: 'Viernes', open: '09:30', close: '20:00', closed: false },
  { day: 'Sábado', open: '09:30', close: '20:00', closed: false },
  { day: 'Domingo', open: '11:30', close: '15:00', closed: false },
] as const;

export const SERVICES_MOCK = [
  // Cortes de Cabello
  {
    id: 'corte-desvanecido',
    name: 'Corte Desvanecido',
    description: 'Lavado de cabello + Asesoría en tu corte',
    price: 150,
    duration: 55,
    category: ServiceCategory.HAIRCUT,
    image: '/images/services/corte-desvanecido.jpg',
  },
  {
    id: 'corte-normal',
    name: 'Corte de Cabello Normal',
    description: 'Lavado de cabello + Asesoría en su corte',
    price: 120,
    duration: 25,
    category: ServiceCategory.HAIRCUT,
    image: '/images/services/corte-normal.jpg',
  },
  {
    id: 'corte-tijera',
    name: 'Corte a Pura Tijera ✂️',
    description: 'Incluye lavado con shampoo de keratina y acondicionador para cabellos largos',
    price: 150,
    duration: 40,
    category: ServiceCategory.HAIRCUT,
    image: '/images/services/corte-tijera.jpg',
  },
  
  // Servicios de Barba
  {
    id: 'arreglo-barba',
    name: 'Arreglo de Barba y Delineado',
    description: 'Rebajada de barba al nivel que gustes y delineado conforme a tu rostro',
    price: 100,
    duration: 20,
    category: ServiceCategory.BEARD,
    image: '/images/services/arreglo-barba.jpg',
  },
  {
    id: 'barba-pigmento',
    name: 'Arreglo de Barba + Pigmento Semipermanente',
    description: 'Realza más tu barba con delineado perfecto + pigmentación que dura 5 días',
    price: 150,
    duration: 25,
    category: ServiceCategory.BEARD,
    image: '/images/services/barba-pigmento.jpg',
  },
  {
    id: 'rasurado-barba',
    name: 'Rasurado de Barba',
    description: 'Rasurado completo con navaja o máquina shaver',
    price: 100,
    duration: 10,
    category: ServiceCategory.BEARD,
    image: '/images/services/rasurado.jpg',
  },
  {
    id: 'ritual-barba-premium',
    name: 'Ritual de Barba Premium 💎',
    description: 'Vapor caliente, exfoliación, mascarilla de carbón activado, pigmentación',
    price: 200,
    duration: 30,
    category: ServiceCategory.BEARD,
    image: '/images/services/ritual-premium.jpg',
  },
  
  // Servicios Faciales
  {
    id: 'facial-premium',
    name: 'Facial Premium 💎',
    description: '4 productos de calidad: exfoliante, mascarilla, arcilla, peeling gel',
    price: 200,
    duration: 20,
    category: ServiceCategory.TREATMENT,
    image: '/images/services/facial-premium.jpg',
  },
  {
    id: 'facial-basico',
    name: 'Facial Básico',
    description: 'Exfoliante para imperfecciones + mascarilla para puntos negros',
    price: 100,
    duration: 15,
    category: ServiceCategory.TREATMENT,
    image: '/images/services/facial-basico.jpg',
  },
  {
    id: 'delineado-ceja',
    name: 'Delineado de Ceja',
    description: 'Delineado profesional de cejas',
    price: 30,
    duration: 5,
    category: ServiceCategory.STYLING,
    image: '/images/services/cejas.jpg',
  },
  
  // Paquetes Especiales
  {
    id: 'paquete-ejecutivo-1',
    name: 'Paquete "Ejecutivo" 👔 - Opción 1',
    description: 'Lavado + Corte normal + Facial Premium + Delineado de ceja + Bebida cortesía',
    price: 320,
    duration: 60,
    category: ServiceCategory.COMBO,
    image: '/images/services/ejecutivo.jpg',
  },
  {
    id: 'paquete-ejecutivo-2',
    name: 'Paquete "Ejecutivo" 👔 - Opción 2',
    description: 'Lavado + Corte desvanecido/tijera + Facial Premium + Delineado ceja + Bebida',
    price: 350,
    duration: 90,
    category: ServiceCategory.COMBO,
    image: '/images/services/ejecutivo-premium.jpg',
  },
  {
    id: 'paquete-buchon-1',
    name: 'Paquete "Buchón" 🤠 - Opción 1',
    description: 'Corte normal + Delineado barba + Pigmentación + Delineado ceja + Bebida',
    price: 270,
    duration: 90,
    category: ServiceCategory.COMBO,
    image: '/images/services/buchon.jpg',
  },
  {
    id: 'paquete-lion-king',
    name: 'Paquete "Lion King" 🦁',
    description: 'Corte + Arreglo barba + Facial Premium + Delineado ceja + Bebida cortesía',
    price: 420,
    duration: 90,
    category: ServiceCategory.COMBO,
    image: '/images/services/lion-king.jpg',
  },
] as const;

export const BARBERS_MOCK = [
  {
    id: 'leon-rivera-jr',
    name: 'Leon Rivera Jr.',
    specialties: ['Cortes desvanecidos', 'Ritual de barba', 'Paquetes premium'],
    experience: 10,
    avatar: '/images/barbers/leon-rivera.jpg',
    rating: 5.0,
    bio: 'Fundador y barbero principal. Especialista en cortes modernos y rituales de barba premium.',
  },
  {
    id: 'pablo-gomez',
    name: 'Pablo Gómez',
    specialties: ['Cortes a tijera', 'Faciales', 'Delineado de cejas'],
    experience: 7,
    avatar: '/images/barbers/pablo-gomez.jpg',
    rating: 5.0,
    bio: 'Experto en técnicas de corte a tijera y tratamientos faciales para caballeros.',
  },
  {
    id: 'juan-jose',
    name: 'Juan José',
    specialties: ['Arreglo de barba', 'Pigmentación', 'Tintes'],
    experience: 6,
    avatar: '/images/barbers/juan-jose.jpg',
    rating: 5.0,
    bio: 'Especialista en arreglo y estilizado de barba, pigmentación y aplicación de tintes.',
  },
] as const;

export const ROUTES = {
  HOME: '/',
  SERVICES: '/servicios',
  BARBERS: '/barberos',
  BOOKING: '/reservar',
  CONTACT: '/contacto',
  ABOUT: '/nosotros',
} as const;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const ANIMATIONS = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
} as const; 