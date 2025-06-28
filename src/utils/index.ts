// ============================================
// UTILITY FUNCTIONS FOR BARBERWEB
// ============================================

import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function to merge CSS classes with clsx
 * Used with Tailwind CSS for conditional styling
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format price to Mexican Peso currency
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(price);
}

/**
 * Format date to Spanish format
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Format time to 24-hour format
 */
export function formatTime(time: string): string {
  return new Intl.DateTimeFormat('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(`2000-01-01T${time}`));
}

/**
 * Convert minutes to hours and minutes format
 */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins} min`;
  }
  
  if (mins === 0) {
    return `${hours} hr`;
  }
  
  return `${hours} hr ${mins} min`;
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Mexican phone number
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^(\+52\s?)?[\d\s\-()]{10,14}$/;
  return phoneRegex.test(phone);
}

/**
 * Generate a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Check if time slot is available
 */
export function isTimeSlotAvailable(
  date: Date,
  startTime: string,
  duration: number,
  bookedSlots: Array<{ date: Date; startTime: string; duration: number }>
): boolean {
  const requestedStart = new Date(`${date.toDateString()} ${startTime}`);
  const requestedEnd = new Date(requestedStart.getTime() + duration * 60000);

  return !bookedSlots.some(slot => {
    const bookedStart = new Date(`${slot.date.toDateString()} ${slot.startTime}`);
    const bookedEnd = new Date(bookedStart.getTime() + slot.duration * 60000);

    return (
      (requestedStart >= bookedStart && requestedStart < bookedEnd) ||
      (requestedEnd > bookedStart && requestedEnd <= bookedEnd) ||
      (requestedStart <= bookedStart && requestedEnd >= bookedEnd)
    );
  });
}

/**
 * Generate time slots for a day
 */
export function generateTimeSlots(
  startTime: string,
  endTime: string,
  duration: number = 30
): string[] {
  const slots: string[] = [];
  const start = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);

  let current = new Date(start);

  while (current < end) {
    slots.push(
      current.toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    );
    current.setMinutes(current.getMinutes() + duration);
  }

  return slots;
}

/**
 * Calculate total price with discount
 */
export function calculateDiscountedPrice(
  originalPrice: number,
  discountPercentage: number
): number {
  return originalPrice * (1 - discountPercentage / 100);
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
} 