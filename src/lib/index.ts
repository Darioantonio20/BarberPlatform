// ============================================
// LIBRARY CONFIGURATIONS AND UTILITIES
// ============================================

// This file will contain shared configurations and library setups
// Examples: API clients, database connections, authentication configs, etc.

export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
  },
  app: {
    name: 'BarberWeb',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  },
} as const;

// API helper functions will be added here as the project grows
export * from './api';
export * from './auth';
export * from './validations'; 