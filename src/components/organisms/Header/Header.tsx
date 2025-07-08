'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/utils';
import { Logo, Button } from '@/components/atoms';
import { ROUTES } from '@/constants';
import { useCart, useAlert } from '@/context';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { cart, getCartItemsCount } = useCart();
  const { showLocationAlert, showAlert } = useAlert();

  const navigationItems = [
    { label: 'Inicio', href: ROUTES.HOME, requiresValidation: false },
    { label: 'Servicios', href: ROUTES.SERVICES, requiresValidation: false },
    { label: 'Reservar', href: ROUTES.BOOKING, requiresValidation: true },
    { label: 'Admin', href: ROUTES.ADMIN, requiresValidation: false },
  ];

  const handleNavClick = (item: { href: string; requiresValidation?: boolean }, e: React.MouseEvent) => {
    if (item.requiresValidation && item.href === ROUTES.BOOKING) {
      e.preventDefault();
      handleBookingClick(e);
    }
  };

  const isActiveRoute = (href: string) => pathname === href;

  // Validaciones para enlaces que requieren barbería seleccionada
  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!cart.barbershopId) {
      showLocationAlert('Primero debes seleccionar una barbería para acceder al carrito.');
      return;
    }
    router.push(ROUTES.CART);
  };

  const handleBookingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!cart.barbershopId) {
      showLocationAlert('Primero debes seleccionar una barbería para reservar una cita.');
      return;
    }
    if (cart.items.length === 0) {
      showAlert({
        title: '🛒 Carrito Vacío',
        message: 'Para reservar una cita, primero agrega servicios a tu carrito.',
        type: 'warning',
        confirmText: 'Ver Barberías',
        onConfirm: () => {
          router.push('/');
        }
      });
      return;
    }
    router.push(ROUTES.BOOKING);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={ROUTES.HOME}>
              <Logo size="md" variant="dark" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(item, e)}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                    isActiveRoute(item.href)
                      ? 'bg-red-100 text-red-800'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Cart and CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#" onClick={handleCartClick} className="relative">
              <Button variant="ghost" size="md" className="relative">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l1.5-6m4.5 6h6" />
                </svg>
                Carrito
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartItemsCount()}
                  </span>
                )}
              </Button>
            </a>
            <a href="#" onClick={handleBookingClick}>
              <Button variant="primary" size="md">
                Reservar Cita
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            >
              <span className="sr-only">Abrir menú principal</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
                  isActiveRoute(item.href)
                    ? 'bg-red-100 text-red-800'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                )}
                onClick={(e) => {
                  handleNavClick(item, e);
                  setIsMenuOpen(false);
                }}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-3 py-2 space-y-2">
              <a href="#" onClick={(e) => { handleCartClick(e); setIsMenuOpen(false); }}>
                <Button variant="ghost" size="md" className="w-full relative">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l1.5-6m4.5 6h6" />
                  </svg>
                  Carrito
                  {getCartItemsCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getCartItemsCount()}
                    </span>
                  )}
                </Button>
              </a>
              <a href="#" onClick={(e) => { handleBookingClick(e); setIsMenuOpen(false); }}>
                <Button variant="primary" size="md" className="w-full">
                  Reservar Cita
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 