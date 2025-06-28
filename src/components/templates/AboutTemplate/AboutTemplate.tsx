import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/atoms';
import { BUSINESS_INFO, ROUTES, BUSINESS_HOURS } from '@/constants';

interface AboutTemplateProps {
  className?: string;
}

const AboutTemplate: React.FC<AboutTemplateProps> = ({ className }) => {
  return (
    <main className={`min-h-screen bg-gradient-to-b from-white to-gray-50 ${className || ''}`}>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-50 via-white to-blue-50 opacity-60"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Nuestra Historia</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Más que una barbería, somos una tradición que combina la experiencia 
              artesanal con las técnicas más modernas del cuidado masculino.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Tradición y Modernidad
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                BarberWeb Studio nació de la pasión por el arte tradicional de la barbería. 
                Fundada por Leon Rivera Jr., nuestra barbería ha evolucionado desde un 
                pequeño local hasta convertirse en el referente de calidad y estilo en la ciudad.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Combinamos técnicas centenarias con las últimas tendencias, utilizando 
                productos de la más alta calidad para garantizar que cada cliente salga 
                no solo con un corte perfecto, sino con una experiencia memorable.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nuestro compromiso es simple: tratar a cada cliente como familia y 
                asegurar que su visita sea una experiencia única e irrepetible.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-red-100 to-blue-100 rounded-2xl flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p className="font-medium">Imagen de nuestra barbería</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-600 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-600 rounded-full opacity-80"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Nuestros Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Los principios que guían cada servicio que ofrecemos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-800">Excelencia</h3>
              <p className="text-gray-600 text-sm">
                Buscamos la perfección en cada detalle de nuestro trabajo.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-800">Respeto</h3>
              <p className="text-gray-600 text-sm">
                Tratamos a cada cliente con dignidad y consideración.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-gray-700 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-800">Innovación</h3>
              <p className="text-gray-600 text-sm">
                Incorporamos las últimas técnicas y tendencias constantemente.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-red-600 to-blue-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-800">Pasión</h3>
              <p className="text-gray-600 text-sm">
                Amamos lo que hacemos y eso se refleja en cada servicio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Horarios de Atención
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Estamos aquí para atenderte cuando más nos necesites. 
                Nuestros horarios están diseñados para adaptarse a tu rutina.
              </p>
              <div className="space-y-4">
                {BUSINESS_HOURS.map((day) => (
                  <div key={day.day} className="flex justify-between items-center py-3 px-4 bg-white rounded-lg shadow-sm border border-gray-100">
                    <span className="font-medium text-gray-800">{day.day}</span>
                    <span className="text-gray-600">
                      {day.closed ? 'Cerrado' : `${day.open} - ${day.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center lg:text-left">
              <div className="bg-gradient-to-br from-red-600 to-blue-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">¿Necesitas una cita urgente?</h3>
                <p className="mb-6 opacity-90">
                  Contáctanos directamente por WhatsApp para consultar disponibilidad 
                  inmediata o citas fuera de horario.
                </p>
                <div className="space-y-3">
                  <a 
                    href={`https://wa.me/${BUSINESS_INFO.social.whatsapp.replace(/[^\d]/g, '')}`}
                    className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    WhatsApp
                  </a>
                  <p className="text-sm opacity-75">
                    {BUSINESS_INFO.social.whatsapp}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 barbershop-gradient">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Únete a Nuestra Familia
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Experimenta la diferencia de un servicio personalizado y profesional. 
            Tu transformación comienza aquí.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link href={ROUTES.BOOKING}>
              <Button 
                variant="secondary" 
                size="lg"
                className="w-full sm:w-auto bg-black text-red-600 hover:bg-blue-100 border-white hover:border-blue-100"
              >
                Reservar Mi Primera Cita
              </Button>
            </Link>
            <Link href={ROUTES.CONTACT}>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-white text-white hover:bg-red hover:text-red-600"
              >
                Contáctanos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutTemplate; 