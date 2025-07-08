import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart, useAlert } from '@/context';

interface UseLocationValidationOptions {
  requireBarbershop?: boolean;
  requireCartItems?: boolean;
  redirectTo?: string;
  showAlert?: boolean;
  customAlertMessage?: string;
}

export const useLocationValidation = (options: UseLocationValidationOptions = {}) => {
  const {
    requireBarbershop = false,
    requireCartItems = false,
    redirectTo = '/',
    showAlert = true,
    customAlertMessage
  } = options;

  const router = useRouter();
  const { cart } = useCart();
  const { showLocationAlert, showAlert: showCustomAlert } = useAlert();

  useEffect(() => {
    let shouldRedirect = false;
    let alertMessage = '';

    // Validar si se requiere barbería seleccionada
    if (requireBarbershop && !cart.barbershopId) {
      shouldRedirect = true;
      alertMessage = customAlertMessage || 'Primero debes seleccionar una ubicación (barbería) para continuar.';
    }

    // Validar si se requieren items en el carrito
    if (requireCartItems && cart.items.length === 0) {
      shouldRedirect = true;
      alertMessage = customAlertMessage || 'Tu carrito está vacío. Selecciona una barbería y agrega servicios para continuar.';
    }

    // Validar combinación: si hay items pero no barbería
    if (cart.items.length > 0 && !cart.barbershopId) {
      shouldRedirect = true;
      alertMessage = 'Ha ocurrido un error con la selección de barbería. Por favor, vuelve a seleccionar una ubicación.';
    }

    if (shouldRedirect && showAlert) {
      if (requireBarbershop && !cart.barbershopId) {
        showLocationAlert(alertMessage);
      } else if (requireCartItems && cart.items.length === 0) {
        showCustomAlert({
          title: '🛒 Carrito Vacío',
          message: alertMessage,
          type: 'warning',
          confirmText: 'Ver Barberías',
          onConfirm: () => {
            router.push(redirectTo);
          }
        });
      } else {
        showLocationAlert(alertMessage);
      }
    } else if (shouldRedirect) {
      router.push(redirectTo);
    }
  }, [cart.barbershopId, cart.items.length, requireBarbershop, requireCartItems, redirectTo, showAlert, customAlertMessage, router, showLocationAlert, showCustomAlert]);

  return {
    hasValidLocation: !!cart.barbershopId,
    hasCartItems: cart.items.length > 0,
    isValid: cart.barbershopId && (requireCartItems ? cart.items.length > 0 : true)
  };
};

export default useLocationValidation; 