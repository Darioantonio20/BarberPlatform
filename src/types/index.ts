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
  day: string;
  open: string;
  close: string;
  closed: boolean;
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