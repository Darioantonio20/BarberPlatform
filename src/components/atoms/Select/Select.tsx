'use client';

import React from 'react';
import { cn } from '@/utils';
import type { SelectProps } from '@/types';

const Select: React.FC<SelectProps> = ({
  label,
  placeholder,
  required = false,
  disabled = false,
  error,
  value,
  onChange,
  children,
  className,
  ...props
}) => {
  const selectId = React.useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <select
        id={selectId}
        required={required}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={cn(
          'w-full px-4 py-2.5 border rounded-lg transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent',
          'bg-white',
          // Estilo para placeholder cuando no hay valor seleccionado
          !value && 'text-gray-500',
          value && 'text-gray-600',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 hover:border-gray-400',
          disabled && 'bg-gray-100 cursor-not-allowed opacity-60',
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <svg
            className="w-4 h-4 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default Select; 