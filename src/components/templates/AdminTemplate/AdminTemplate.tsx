'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/atoms';
import { BARBERSHOPS_MOCK } from '@/constants';
import { AdminBooking, AppointmentStatus } from '@/types';

// Datos de ejemplo para las reservas (movido fuera del componente)
const MOCK_BOOKINGS: AdminBooking[] = [
    {
      id: 'booking-1',
      barbershopId: 'centro-barberia',
      barbershopName: 'Centro Barbería',
      clientName: 'Juan Pérez',
      clientPhone: '+52 55 1234 5678',
      clientEmail: 'juan.perez@email.com',
      date: '2024-01-15',
      time: '10:00',
      services: ['Corte Desvanecido', 'Arreglo de Barba'],
      products: ['Pomada Clásica'],
      barberName: 'Leon Rivera Jr.',
      total: 270,
      paymentMethod: 'cash',
      status: AppointmentStatus.CONFIRMED,
      createdAt: new Date('2024-01-10'),
    },
    {
      id: 'booking-2',
      barbershopId: 'plaza-barberia',
      barbershopName: 'Plaza Barbería',
      clientName: 'María García',
      clientPhone: '+52 55 9876 5432',
      clientEmail: 'maria.garcia@email.com',
      date: '2024-01-16',
      time: '14:30',
      services: ['Paquete Ejecutivo - Opción 1'],
      products: [],
      barberName: 'Juan José',
      total: 320,
      paymentMethod: 'card',
      status: AppointmentStatus.PENDING,
      createdAt: new Date('2024-01-11'),
    },
    {
      id: 'booking-3',
      barbershopId: 'centro-barberia',
      barbershopName: 'Centro Barbería',
      clientName: 'Carlos Rodríguez',
      clientPhone: '+52 55 2468 1357',
      clientEmail: 'carlos.rodriguez@email.com',
      date: '2024-01-17',
      time: '16:00',
      services: ['Corte Normal', 'Facial Premium'],
      products: ['Shampoo de Keratina'],
      barberName: 'Pablo Gómez',
      total: 470,
      paymentMethod: 'cash',
      status: AppointmentStatus.COMPLETED,
      createdAt: new Date('2024-01-12'),
    },
  ];

const AdminTemplate: React.FC = () => {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [selectedBarbershop, setSelectedBarbershop] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simular carga de datos
    setBookings(MOCK_BOOKINGS);
  }, []);

  const updateBookingStatus = (bookingId: string, newStatus: AppointmentStatus) => {
    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: newStatus }
          : booking
      )
    );
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesBarbershop = selectedBarbershop === 'all' || booking.barbershopId === selectedBarbershop;
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
    const matchesSearch = booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.clientPhone.includes(searchTerm) ||
                         booking.clientEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesBarbershop && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case AppointmentStatus.CONFIRMED:
        return 'bg-blue-100 text-blue-800';
      case AppointmentStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      case AppointmentStatus.CANCELLED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.PENDING:
        return 'Pendiente';
      case AppointmentStatus.CONFIRMED:
        return 'Confirmada';
      case AppointmentStatus.COMPLETED:
        return 'Completada';
      case AppointmentStatus.CANCELLED:
        return 'Cancelada';
      default:
        return 'Desconocido';
    }
  };

  const getTotalRevenue = () => {
    return filteredBookings
      .filter(booking => booking.status === AppointmentStatus.COMPLETED)
      .reduce((total, booking) => total + booking.total, 0);
  };

  const getTotalBookings = () => {
    return filteredBookings.length;
  };

  const getTodayBookings = () => {
    const today = new Date().toISOString().split('T')[0];
    return filteredBookings.filter(booking => booking.date === today).length;
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Panel Administrativo</h1>
          <p className="text-gray-600">Gestiona todas las reservas de tus barberías</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total de Reservas</h3>
            <p className="text-3xl font-bold text-blue-600">{getTotalBookings()}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reservas Hoy</h3>
            <p className="text-3xl font-bold text-green-600">{getTodayBookings()}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ingresos Completados</h3>
            <p className="text-3xl font-bold text-purple-600">${getTotalRevenue()}</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nombre, teléfono o email..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Barbería</label>
              <select
                value={selectedBarbershop}
                onChange={(e) => setSelectedBarbershop(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">Todas las barberías</option>
                {BARBERSHOPS_MOCK.map(barbershop => (
                  <option key={barbershop.id} value={barbershop.id}>
                    {barbershop.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">Todos los estados</option>
                <option value={AppointmentStatus.PENDING}>Pendiente</option>
                <option value={AppointmentStatus.CONFIRMED}>Confirmada</option>
                <option value={AppointmentStatus.COMPLETED}>Completada</option>
                <option value={AppointmentStatus.CANCELLED}>Cancelada</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedBarbershop('all');
                  setSelectedStatus('all');
                }}
              >
                Limpiar Filtros
              </Button>
            </div>
          </div>
        </div>

        {/* Tabla de Reservas */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              Reservas ({filteredBookings.length})
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Barbería
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha & Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Servicios
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Barbero
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.clientName}</div>
                        <div className="text-sm text-gray-500">{booking.clientPhone}</div>
                        <div className="text-sm text-gray-500">{booking.clientEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.barbershopName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(booking.date).toLocaleDateString('es-MX')}
                      </div>
                      <div className="text-sm text-gray-500">{booking.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {booking.services.join(', ')}
                      </div>
                      {booking.products.length > 0 && (
                        <div className="text-sm text-gray-500">
                          Productos: {booking.products.join(', ')}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.barberName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${booking.total}</div>
                      <div className="text-sm text-gray-500 capitalize">{booking.paymentMethod}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {booking.status === AppointmentStatus.PENDING && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, AppointmentStatus.CONFIRMED)}
                          >
                            Confirmar
                          </Button>
                        )}
                        {booking.status === AppointmentStatus.CONFIRMED && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, AppointmentStatus.COMPLETED)}
                          >
                            Completar
                          </Button>
                        )}
                        {(booking.status === AppointmentStatus.PENDING || booking.status === AppointmentStatus.CONFIRMED) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, AppointmentStatus.CANCELLED)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Cancelar
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay reservas</h3>
              <p className="text-gray-500">No se encontraron reservas con los filtros aplicados.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminTemplate; 