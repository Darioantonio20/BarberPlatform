'use client';

import React from 'react';
import { cn } from '@/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'dark',
  className
}) => {
  const sizes = {
    sm: 'h-8 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const colors = {
    light: 'text-white',
    dark: 'text-gray-900'
  };

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      {/* SVG Icon */}
      <svg
        className={cn(sizes[size], colors[variant])}
        viewBox="0 0 40 40"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Scissors Icon */}
        <path d="M15.5 8C13.567 8 12 9.567 12 11.5S13.567 15 15.5 15 19 13.433 19 11.5 17.433 8 15.5 8zm0 5C14.672 13 14 12.328 14 11.5S14.672 10 15.5 10 17 10.672 17 11.5 16.328 13 15.5 13z"/>
        <path d="M15.5 25C13.567 25 12 26.567 12 28.5S13.567 32 15.5 32 19 30.433 19 28.5 17.433 25 15.5 25zm0 5C14.672 30 14 29.328 14 28.5S14.672 27 15.5 27 17 27.672 17 28.5 16.328 30 15.5 30z"/>
        <path d="M25 8L19 14L25 20L27 18L23 14L27 10L25 8z"/>
        <path d="M25 20L19 26L25 32L27 30L23 26L27 22L25 20z"/>
        <path d="M19 18L21 20L19 22L17 20L19 18z"/>
      </svg>
      
      {/* Text Logo */}
      <span className={cn(
        'font-bold tracking-tight',
        textSizes[size],
        colors[variant]
      )}>
        BarberWeb
      </span>
    </div>
  );
};

export default Logo; 