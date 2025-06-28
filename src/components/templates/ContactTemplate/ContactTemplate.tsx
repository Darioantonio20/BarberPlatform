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
                    className="flex items-center justify-center px-4 py-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    WhatsApp
                  </a>
                  
                  <a 
                    href={`https://instagram.com/${BUSINESS_INFO.social.instagram.replace('@', '')}`}
                    className="flex items-center justify-center px-4 py-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.52.204 5.013.389a6.006 6.006 0 00-2.174 1.413A6.017 6.017 0 00.389 5.024C.204 5.53.082 6.104.048 7.05.013 7.999 0 8.396 0 12.017c0 3.624.013 4.021.048 4.967.034.951.156 1.521.341 2.026a6.003 6.003 0 001.413 2.174 6.003 6.003 0 002.174 1.414c.5.184 1.074.306 2.02.34.951.035 1.35.048 4.973.048 3.624 0 4.021-.013 4.967-.048.951-.034 1.521-.156 2.026-.34a6.003 6.003 0 002.174-1.414 6.003 6.003 0 001.414-2.174c.184-.5.306-1.074.34-2.02.035-.951.048-1.35.048-4.973 0-3.624-.013-4.021-.048-4.967-.034-.951-.156-1.521-.34-2.026a6.003 6.003 0 00-1.414-2.174A6.003 6.003 0 0018.994.389c-.5-.184-1.074-.306-2.02-.34C16.025.013 15.628 0 12.017 0zm-.017 5.818c-3.426 0-6.2 2.774-6.2 6.2 0 3.426 2.774 6.2 6.2 6.2 3.426 0 6.2-2.774 6.2-6.2 0-3.426-2.774-6.2-6.2-6.2zm0 10.229c-2.224 0-4.029-1.805-4.029-4.029 0-2.224 1.805-4.029 4.029-4.029 2.224 0 4.029 1.805 4.029 4.029 0 2.224-1.805 4.029-4.029 4.029zm7.876-10.524c-.8 0-1.448-.648-1.448-1.448 0-.8.648-1.448 1.448-1.448.8 0 1.448.648 1.448 1.448 0 .8-.648 1.448-1.448 1.448z"/>
                    </svg>
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
                className="w-full sm:w-auto bg-white text-red-600 hover:bg-gray-100 border-white hover:border-gray-100"
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
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-green-600"
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