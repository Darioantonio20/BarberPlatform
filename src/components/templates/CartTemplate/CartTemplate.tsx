'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/atoms';
import { useCart } from '@/context';
import { useLocationValidation } from '@/hooks';
import { ROUTES, BARBERSHOPS_MOCK } from '@/constants';

const CartTemplate: React.FC = () => {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();

  // Validación de ubicación - requiere barbería seleccionada para acceder al carrito
  useLocationValidation({
    requireBarbershop: true,
    requireCartItems: false, // En carrito puede estar vacío
    customAlertMessage: 'Para acceder al carrito, primero debes seleccionar una barbería.'
  });

  const barbershop = BARBERSHOPS_MOCK.find(b => b.id === cart.barbershopId);

  const proceedToBooking = () => {
    if (!cart.barbershopId) {
      alert('Primero debes seleccionar una barbería para continuar.');
      router.push('/');
      return;
    }
    
    if (cart.items.length === 0) {
      alert('Tu carrito está vacío. Agrega algunos servicios o productos antes de reservar.');
      return;
    }
    
    router.push(ROUTES.BOOKING);
  };

  if (cart.items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Tu Carrito</h1>
            <div className="bg-white rounded-lg shadow-md p-12">
              <svg className="w-24 h-24 mx-auto text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l1.5-6m4.5 6h6" />
              </svg>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tu carrito está vacío</h2>
              <p className="text-gray-600 mb-8">Agrega algunos servicios o productos para comenzar</p>
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => router.push('/')}
              >
                Explorar Barberías
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tu Carrito</h1>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={clearCart}
            className="text-red-600 hover:text-red-800"
          >
            Limpiar Carrito
          </Button>
        </div>

        {barbershop && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {barbershop.name}
            </h2>
            <p className="text-gray-600">{barbershop.address}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Items en tu carrito</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {cart.items.map((item) => (
              <div key={item.id} className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {item.image && (
                    <div className="relative w-16 h-16">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = '/images/default.svg';
                        }}
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{item.name}</h4>
                    <p className="text-gray-600 capitalize">{item.type}</p>
                    <p className="text-lg font-semibold text-red-600">${item.price}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-12 text-center text-lg font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Resumen del Pedido</h3>
          </div>
          
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-gray-900">${getCartTotal()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Impuestos:</span>
              <span className="text-gray-900">$0</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between">
                <span className="text-xl font-semibold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-red-600">${getCartTotal()}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={proceedToBooking}
            >
              Proceder a Reservar
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => router.push(`/barberia/${cart.barbershopId}`)}
            >
              Continuar Comprando
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartTemplate; 