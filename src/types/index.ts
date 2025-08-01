// ============================================
// TYPES FOR BARBERWEB APPLICATION
// ============================================

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: ServiceCategory;
  image?: string;
}

export interface Barber {
  id: string;
  name: string;
  specialties: readonly string[];
  experience: number; // years
  avatar: string;
  rating: number;
  bio?: string;
}

export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  barberId: string;
  date: Date;
  time: string;
  status: AppointmentStatus;
  notes?: string;
  totalPrice: number;
  duration: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  appointments: Appointment[];
  preferences?: string[];
}

export enum ServiceCategory {
  HAIRCUT = 'haircut',
  BEARD = 'beard',
  STYLING = 'styling',
  TREATMENT = 'treatment',
  COMBO = 'combo'
}

export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface BusinessHours {
  readonly day: string;
  readonly open: string;
  readonly close: string;
  readonly closed: boolean;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  social: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

// Validation Types
export interface ValidationError {
  field: string;
  message: string;
}

// Booking System Types
export interface TimeSlot {
  time: string;
  available: boolean;
  barberId?: string;
}

export interface BookingFormData {
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
}

export interface AvailableSlot {
  date: string;
  time: string;
  barberId: string;
  barberName: string;
  available: boolean;
}

// Component Props Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'date' | 'time';
  required?: boolean;
  disabled?: boolean;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
  min?: string;
  max?: string;
}

export interface SelectProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  className?: string;
}

export interface TextareaProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  className?: string;
  name?: string;
}

// Barbershop Types
export interface Barbershop {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly address: string;
  readonly coordinates: {
    readonly lat: number;
    readonly lng: number;
  };
  readonly phone: string;
  readonly hours: readonly BusinessHours[];
  readonly image: string;
  readonly services: readonly string[];
  readonly barbers: readonly string[];
  readonly products: readonly Product[];
  readonly packages: readonly string[];
}

export interface Product {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly image: string;
  readonly description?: string;
}

// Cart Types
export interface CartItem {
  id: string;
  type: 'service' | 'product' | 'package';
  name: string;
  price: number;
  quantity: number;
  image?: string;
  barbershopId: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  barbershopId: string;
}

// Booking Types Extended
export interface ExtendedBookingFormData extends BookingFormData {
  cartItems: CartItem[];
  paymentMethod: 'cash' | 'card';
  totalAmount: number;
}

// Admin Types
export interface AdminBooking {
  id: string;
  barbershopId: string;
  barbershopName: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  date: string;
  time: string;
  services: string[];
  products: string[];
  barberName: string;
  total: number;
  paymentMethod: 'cash' | 'card';
  status: AppointmentStatus;
  createdAt: Date;
} 