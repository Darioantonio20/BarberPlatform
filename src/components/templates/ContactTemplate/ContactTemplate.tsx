'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Input, Textarea } from '@/components/atoms';
import { BUSINESS_INFO, BUSINESS_HOURS, ROUTES } from '@/constants';

interface ContactTemplateProps {
  className?: string;
}

const ContactTemplate: React.FC<ContactTemplateProps> = ({ className }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se implementaría el envío del formulario
    console.log('Formulario enviado:', formData);
  };

  return (
    <main className={`min-h-screen bg-gradient-to-b from-white to-gray-50 ${className || ''}`}>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-50 via-white to-blue-50 opacity-60"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Contáctanos</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Estamos aquí para responder tus preguntas y ayudarte a reservar 
            la cita perfecta para tu próxima transformación.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Envíanos un Mensaje</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Nombre completo"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre"
                    required
                  />
                  <Input
                    label="Teléfono"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+52 55 1234 5678"
                    required
                  />
                </div>
                
                <Input
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="tu@email.com"
                  required
                />
                
                <Input
                  label="Asunto"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="¿En qué podemos ayudarte?"
                  required
                />
                
                <Textarea
                  label="Mensaje"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Cuéntanos más detalles sobre tu consulta..."
                  rows={5}
                  required
                />
                
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="w-full barbershop-gradient hover:opacity-90"
                >
                  Enviar Mensaje
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Business Info Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Dirección</h4>
                      <p className="text-gray-600">{BUSINESS_INFO.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Teléfono</h4>
                      <p className="text-gray-600">{BUSINESS_INFO.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <p className="text-gray-600">{BUSINESS_INFO.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Horarios de Atención</h3>
                <div className="space-y-3">
                  {BUSINESS_HOURS.map((day) => (
                    <div key={day.day} className="flex justify-between items-center py-2">
                      <span className="font-medium text-gray-800">{day.day}</span>
                      <span className="text-gray-600">
                        {day.closed ? 'Cerrado' : `${day.open} - ${day.close}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media & Quick Actions */}
              <div className="bg-gradient-to-br from-red-600 to-blue-600 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Síguenos y Conecta</h3>
                <p className="mb-6 opacity-90">
                  Mantente al día con nuestras últimas tendencias y promociones especiales.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href={`https://wa.me/${BUSINESS_INFO.social.whatsapp.replace(/[^\d]/g, '')}`}
                    className="flex items-center justify-center px-4 py-3 bg-black bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >                    
                    WhatsApp
                  </a>
                  
                  <a 
                    href={`https://instagram.com/${BUSINESS_INFO.social.instagram.replace('@', '')}`}
                    className="flex items-center justify-center px-4 py-3 bg-black bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Encuéntranos
            </h2>
            <p className="text-xl text-gray-600">
              Ubicados en el corazón de la ciudad, fácil acceso y estacionamiento disponible.
            </p>
          </div>
          
          {/* Placeholder para mapa */}
          <div className="w-full h-96 bg-gradient-to-br from-red-100 to-blue-100 rounded-2xl flex items-center justify-center border border-gray-200">
            <div className="text-center text-gray-600">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="font-medium">Mapa Interactivo</p>
              <p className="text-sm text-gray-500">{BUSINESS_INFO.address}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 barbershop-gradient">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para Visitarnos?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            No esperes más para vivir la experiencia BarberWeb. 
            Reserva tu cita ahora y descubre la diferencia.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link href={ROUTES.BOOKING}>
              <Button 
                variant="secondary" 
                size="lg"
                className="w-full sm:w-auto bg-black text-red-600 hover:bg-black-100 border-white hover:border-gray-100"
              >
                Reservar Cita Ahora
              </Button>
            </Link>
            <a 
              href={`https://wa.me/${BUSINESS_INFO.social.whatsapp.replace(/[^\d]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-white text-white hover:bg-black hover:text-green-600"
              >
                Chatear por WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactTemplate; 