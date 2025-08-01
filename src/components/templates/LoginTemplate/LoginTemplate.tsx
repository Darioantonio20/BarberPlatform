'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/atoms';
import { ROUTES } from '@/constants';

const LoginTemplate: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simular autenticación básica
      if (formData.email && formData.password) {
        // Para demostración, cualquier email/password válido permite el acceso
        console.log('Login attempt:', formData);
        
        // Simular delay de autenticación
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Redirigir al panel de admin
        router.push(ROUTES.ADMIN);
      } else {
        alert('Por favor, completa todos los campos');
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      alert('Error durante el login. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm sm:max-w-md w-full space-y-6 sm:space-y-8">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-full bg-red-100">
            <svg className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
            Acceso de Barbería
          </h2>
          <p className="mt-2 text-center text-sm sm:text-base text-gray-600">
            Ingresa tus credenciales para acceder al panel administrativo
          </p>
        </div>
        
        <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
            <div className="space-y-4 sm:space-y-6">
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="tu-barberia@email.com"
                required
              />
              
              <Input
                label="Contraseña"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Tu contraseña"
                required
              />
            </div>

            <div className="mt-4 sm:mt-6">
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full sm:size-lg"
                loading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </div>

            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                <strong>Nota:</strong> Esta es una demostración. 
                Cualquier email y contraseña válidos te permitirán acceder.
              </p>
            </div>
          </div>
        </form>

        {/* Credenciales de ejemplo */}
        <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
          <h3 className="text-xs sm:text-sm font-medium text-blue-800 mb-2">
            Credenciales de Ejemplo:
          </h3>
          <div className="text-xs sm:text-sm text-blue-700 space-y-1">
            <p><strong>Email:</strong> admin@barberia.com</p>
            <p><strong>Contraseña:</strong> password123</p>
          </div>
        </div>

        {/* Enlaces adicionales */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => router.push(ROUTES.HOME)}
            className="text-red-600 hover:text-red-500 text-xs sm:text-sm font-medium transition-colors duration-200 inline-flex items-center"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </button>
        </div>
      </div>
    </main>
  );
};

export default LoginTemplate; 