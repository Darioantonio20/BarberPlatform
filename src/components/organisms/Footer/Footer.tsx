'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/atoms';
import { BUSINESS_INFO, BUSINESS_HOURS, ROUTES, SITE_CONFIG } from '@/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Business Info */}
          <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
            <Logo size="md" variant="light" />
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {/* Social Media Links */}
              <a
                href={`https://instagram.com/${BUSINESS_INFO.social.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
                aria-label="Síguenos en Instagram"
              >
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.72 13.758 3.72 12.473s.478-2.422 1.406-3.228c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.806 1.406 1.943 1.406 3.228s-.478 2.422-1.406 3.218c-.875.807-2.026 1.297-3.323 1.297zm7.074 0c-1.297 0-2.448-.49-3.323-1.297c-.928-.796-1.406-1.933-1.406-3.218s.478-2.422 1.406-3.228c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.806 1.406 1.943 1.406 3.228s-.478 2.422-1.406 3.218c-.875.807-2.026 1.297-3.323 1.297z"/>
                </svg>
              </a>
              <a
                href={`https://facebook.com/${BUSINESS_INFO.social.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
                aria-label="Síguenos en Facebook"
              >
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669c1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2">
              <li>
                <Link href={ROUTES.HOME} className="text-gray-300 hover:text-amber-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href={ROUTES.SERVICES} className="text-gray-300 hover:text-amber-400 transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href={ROUTES.BOOKING} className="text-gray-300 hover:text-amber-400 transition-colors">
                  Reservar
                </Link>
              </li>
              <li>
                <Link href={ROUTES.CART} className="text-gray-300 hover:text-amber-400 transition-colors">
                  Carrito
                </Link>
              </li>
              <li>
                <Link href={ROUTES.ADMIN} className="text-gray-300 hover:text-amber-400 transition-colors">
                  Administración
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-start">
                <svg className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {BUSINESS_INFO.address}
              </p>
              <p className="flex items-center">
                <svg className="h-5 w-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                {BUSINESS_INFO.phone}
              </p>
              <p className="flex items-center">
                <svg className="h-5 w-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                {BUSINESS_INFO.email}
              </p>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Horarios</h3>
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
              {BUSINESS_HOURS.map((schedule) => (
                <div key={schedule.day} className="flex justify-between items-center">
                  <span className="font-medium">{schedule.day}</span>
                  <span className={schedule.closed ? 'text-red-400' : 'text-green-400'}>
                    {schedule.closed ? 'Cerrado' : `${schedule.open} - ${schedule.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800 text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            &copy; {currentYear} {BUSINESS_INFO.name}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-500 mt-2 sm:hidden">
            Diseñado con ❤️ para una mejor experiencia móvil
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 