'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, DatePicker, Input, TimePicker } from '@/components/atoms';
import { useCart, useAlert } from '@/context';
import { BARBERSHOPS_MOCK, BARBERS_MOCK } from '@/constants';
import { ExtendedBookingFormData } from '@/types';

const BookingTemplate: React.FC = () => {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { showAlert } = useAlert();
  const [currentStep, setCurrentStep] = useState<'cart' | 'calendar' | 'personal' | 'confirmation'>('cart');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedBarber, setSelectedBarber] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Validación inicial - solo redirige si no hay barbería o carrito vacío
  useEffect(() => {
    if (!cart.barbershopId || cart.items.length === 0) {
      router.push('/');
    }
  }, [cart.barbershopId, cart.items.length, router]);

  const barbershop = BARBERSHOPS_MOCK.find(b => b.id === cart.barbershopId);
  const availableBarbers = BARBERS_MOCK.filter(barber => {
    if (!barbershop) return false;
    return barbershop.barbers.includes(barber.id);
  });

  // Ya no necesitamos generar fechas y horarios manualmente
  // Los nuevos componentes DatePicker y TimePicker manejan esto automáticamente

  const handleNextStep = () => {
    if (currentStep === 'cart') {
      setCurrentStep('calendar');
    } else if (currentStep === 'calendar') {
      if (!selectedDate || !selectedTime || !selectedBarber) {
        showAlert({
          title: '📅 Datos Incompletos',
          message: 'Por favor, selecciona fecha, hora y barbero para continuar.',
          type: 'warning',
          confirmText: 'Entendido'
        });
        return;
      }
      setCurrentStep('personal');
    } else if (currentStep === 'personal') {
      if (!personalInfo.name || !personalInfo.phone || !personalInfo.email) {
        showAlert({
          title: '📝 Información Requerida',
          message: 'Por favor, completa todos los campos requeridos (nombre, teléfono y email).',
          type: 'warning',
          confirmText: 'Entendido'
        });
        return;
      }
      setCurrentStep('confirmation');
    }
  };

  const handleBookingConfirmation = async () => {
    try {
      const bookingData: ExtendedBookingFormData = {
        serviceId: cart.items[0]?.id || '',
        barberId: selectedBarber,
        date: selectedDate,
        time: selectedTime,
        clientName: personalInfo.name,
        clientEmail: personalInfo.email,
        clientPhone: personalInfo.phone,
        notes: personalInfo.notes,
        cartItems: cart.items,
        paymentMethod,
        totalAmount: cart.total,
      };

      // Simular envío de datos
      console.log('Booking confirmed:', bookingData);
      
      // Aquí normalmente enviarías los datos al backend
      
      setBookingConfirmed(true);
      clearCart();
      
      // Mostrar mensaje de éxito
      showAlert({
        title: '✅ ¡Reserva Confirmada!',
        message: 'Tu cita ha sido confirmada exitosamente. Te enviaremos un correo con todos los detalles.',
        type: 'success',
        confirmText: 'Perfecto'
      });
      
    } catch (error) {
      console.error('Error confirming booking:', error);
      showAlert({
        title: '❌ Error al Confirmar',
        message: 'Hubo un problema al confirmar tu reserva. Por favor, intenta de nuevo.',
        type: 'error',
        confirmText: 'Intentar de nuevo'
      });
    }
  };

  if (bookingConfirmed) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Reserva Confirmada!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Tu cita ha sido confirmada. Te enviaremos un correo con todos los detalles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" onClick={() => router.push('/')}>
                Volver al Inicio
              </Button>
              <Button variant="outline" size="lg" onClick={() => router.push('/admin')}>
                Ver Panel Admin
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (cart.items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No hay items en el carrito</h1>
            <p className="text-lg text-gray-600 mb-8">
              Selecciona una barbería y agrega servicios para continuar.
            </p>
            <Button variant="primary" size="lg" onClick={() => router.push('/')}>
              Explorar Barberías
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8 space-x-4">
      <div className={`flex items-center ${currentStep === 'cart' ? 'text-red-600' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'cart' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}>1</div>
        <span className="ml-2">Carrito</span>
      </div>
      <div className="w-8 h-0.5 bg-gray-300"></div>
      <div className={`flex items-center ${currentStep === 'calendar' ? 'text-red-600' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'calendar' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}>2</div>
        <span className="ml-2">Fecha & Hora</span>
      </div>
      <div className="w-8 h-0.5 bg-gray-300"></div>
      <div className={`flex items-center ${currentStep === 'personal' ? 'text-red-600' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'personal' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}>3</div>
        <span className="ml-2">Datos</span>
      </div>
      <div className="w-8 h-0.5 bg-gray-300"></div>
      <div className={`flex items-center ${currentStep === 'confirmation' ? 'text-red-600' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'confirmation' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}>4</div>
        <span className="ml-2">Confirmar</span>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Reservar Cita</h1>
          
          <StepIndicator />

          {/* Paso 1: Resumen del Carrito */}
          {currentStep === 'cart' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Resumen de tu Pedido</h2>
              
              {barbershop && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-900">{barbershop.name}</h3>
                  <p className="text-gray-600">{barbershop.address}</p>
                </div>
              )}

              <div className="space-y-4 mb-6">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600 capitalize">{item.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-xl font-bold text-gray-900 border-t pt-4 mb-6">
                <span>Total:</span>
                <span>${cart.total}</span>
              </div>

              <div className="flex justify-end">
                <Button variant="primary" size="lg" onClick={handleNextStep}>
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {/* Paso 2: Selección de Fecha, Hora y Barbero */}
          {currentStep === 'calendar' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Selecciona Fecha, Hora y Barbero</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Date Picker */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📅 Selecciona la Fecha</h3>
                  <DatePicker
                    value={selectedDate}
                    onChange={setSelectedDate}
                    minDate={new Date().toISOString().split('T')[0]}
                  />
                </div>

                {/* Time Picker */}
                {selectedDate && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🕐 Selecciona la Hora</h3>
                    <TimePicker
                      date={selectedDate}
                      selectedTime={selectedTime}
                      onTimeSelect={setSelectedTime}
                      businessHours={{ open: '09:00', close: '20:00' }}
                      serviceDuration={60} // Duration placeholder
                      bookedSlots={[]} // TODO: Implement real booked slots
                    />
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Barbero</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableBarbers.map((barber) => (
                    <div
                      key={barber.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedBarber === barber.id
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setSelectedBarber(barber.id)}
                    >
                      <h4 className="font-medium text-gray-900">{barber.name}</h4>
                      <p className="text-sm text-gray-600">{barber.experience} años de experiencia</p>
                      <p className="text-sm text-gray-600">
                        Especialidades: {barber.specialties.slice(0, 2).join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" size="lg" onClick={() => setCurrentStep('cart')}>
                  Anterior
                </Button>
                <Button variant="primary" size="lg" onClick={handleNextStep}>
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {/* Paso 3: Datos Personales */}
          {currentStep === 'personal' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Datos Personales</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Input
                  label="Nombre Completo *"
                  value={personalInfo.name}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Tu nombre completo"
                  required
                />
                <Input
                  label="Teléfono *"
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Tu número de teléfono"
                  required
                />
              </div>

              <div className="mb-6">
                <Input
                  label="Email *"
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Tu correo electrónico"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Método de Pago</label>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'cash'
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setPaymentMethod('cash')}
                  >
                    <h4 className="font-medium text-gray-900">Efectivo</h4>
                    <p className="text-sm text-gray-600">Pagar en la barbería</p>
                  </div>
                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <h4 className="font-medium text-gray-900">Tarjeta</h4>
                    <p className="text-sm text-gray-600">Pagar con tarjeta en la barbería</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Notas Adicionales</label>
                <textarea
                  value={personalInfo.notes}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Alguna preferencia o nota especial..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" size="lg" onClick={() => setCurrentStep('calendar')}>
                  Anterior
                </Button>
                <Button variant="primary" size="lg" onClick={handleNextStep}>
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {/* Paso 4: Confirmación */}
          {currentStep === 'confirmation' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Confirmar Reserva</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen de tu Cita</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Barbería:</span>
                    <span className="font-medium">{barbershop?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fecha:</span>
                    <span className="font-medium">
                      {new Date(selectedDate).toLocaleDateString('es-MX', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hora:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Barbero:</span>
                    <span className="font-medium">
                      {availableBarbers.find(b => b.id === selectedBarber)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cliente:</span>
                    <span className="font-medium">{personalInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Teléfono:</span>
                    <span className="font-medium">{personalInfo.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Método de Pago:</span>
                    <span className="font-medium capitalize">{paymentMethod === 'cash' ? 'Efectivo' : 'Tarjeta'}</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-red-600">${cart.total}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" size="lg" onClick={() => setCurrentStep('personal')}>
                  Anterior
                </Button>
                <Button variant="primary" size="lg" onClick={handleBookingConfirmation}>
                  Confirmar Reserva
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default BookingTemplate; 