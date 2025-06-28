'use client';

import React from 'react';
import { cn } from '@/utils';
import type { TextareaProps } from '@/types';

const Textarea: React.FC<TextareaProps> = ({
  label,
  placeholder,
  required = false,
  disabled = false,
  error,
  value,
  onChange,
  rows = 4,
  className,
  ...props
}) => {
  const textareaId = React.useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        id={textareaId}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        value={value}
        onChange={onChange}
        rows={rows}
        className={cn(
          'w-full px-4 py-2.5 border rounded-lg transition-colors duration-200 resize-vertical',
          'focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent',
          'placeholder-gray-400',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 hover:border-gray-400',
          disabled && 'bg-gray-100 cursor-not-allowed opacity-60',
          className
        )}
        {...props}
      />
      
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

export default Textarea; 