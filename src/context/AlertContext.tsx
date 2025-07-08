'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Alert } from '@/components/atoms';

interface AlertData {
  id: string;
  title: string;
  message: string;
  type?: 'info' | 'warning' | 'error' | 'success';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  showCancel?: boolean;
}

interface AlertContextType {
  showAlert: (alert: Omit<AlertData, 'id'>) => void;
  showLocationAlert: (message?: string) => void;
  closeAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [currentAlert, setCurrentAlert] = useState<AlertData | null>(null);

  const showAlert = (alert: Omit<AlertData, 'id'>) => {
    const newAlert: AlertData = {
      ...alert,
      id: Date.now().toString()
    };
    setCurrentAlert(newAlert);
  };

  const showLocationAlert = (message?: string) => {
    showAlert({
      title: '🏪 Selecciona una Barbería',
      message: message || 'Primero debes seleccionar una ubicación (barbería) para continuar.',
      type: 'warning',
      confirmText: 'Ver Barberías',
      onConfirm: () => {
        closeAlert();
        window.location.href = '/';
      }
    });
  };

  const closeAlert = () => {
    setCurrentAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert, showLocationAlert, closeAlert }}>
      {children}
      {currentAlert && (
        <Alert
          isOpen={true}
          onClose={closeAlert}
          title={currentAlert.title}
          message={currentAlert.message}
          type={currentAlert.type}
          confirmText={currentAlert.confirmText}
          cancelText={currentAlert.cancelText}
          onConfirm={currentAlert.onConfirm}
          showCancel={currentAlert.showCancel}
        />
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export default AlertProvider; 