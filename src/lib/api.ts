// ============================================
// API UTILITIES AND CONFIGURATIONS
// ============================================

import { config } from './index';

// Base API configuration
const API_BASE_URL = config.api.baseUrl;

// Generic API error class
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Generic fetch wrapper with error handling
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new APIError(
        `HTTP error! status: ${response.status}`,
        response.status,
        response.statusText
      );
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    throw new APIError(
      'Network error occurred',
      0,
      'Network Error'
    );
  }
}

// Specific API functions for barbershop data
export const barberAPI = {
  // Services
  getServices: () => apiRequest('/services'),
  getService: (id: string) => apiRequest(`/services/${id}`),
  
  // Barbers
  getBarbers: () => apiRequest('/barbers'),
  getBarber: (id: string) => apiRequest(`/barbers/${id}`),
  
  // Appointments
  createAppointment: (data: any) => apiRequest('/appointments', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getAppointments: () => apiRequest('/appointments'),
  
  // Contact
  sendContactMessage: (data: any) => apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
}; 