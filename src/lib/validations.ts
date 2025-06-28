// ============================================
// VALIDATION FUNCTIONS FOR BARBERWEB
// ============================================

export interface ValidationError {
  field: string;
  message: string;
}

export interface AppointmentFormData {
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check if it's a valid Mexican phone number (10 or 12 digits)
  return cleanPhone.length === 10 || cleanPhone.length === 12;
}

export function validateName(name: string): boolean {
  // Name should be at least 2 characters and contain only letters and spaces
  const nameRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]{2,}$/;
  return nameRegex.test(name.trim());
}

export function validateDate(date: string): boolean {
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Date should not be in the past
  return selectedDate >= today;
}

export function validateTime(time: string): boolean {
  // Basic time format validation (HH:MM)
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
}

export function validateAppointmentForm(data: AppointmentFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  // Service validation
  if (!data.serviceId || data.serviceId.trim() === '') {
    errors.push({
      field: 'serviceId',
      message: 'Por favor selecciona un servicio'
    });
  }

  // Barber validation
  if (!data.barberId || data.barberId.trim() === '') {
    errors.push({
      field: 'barberId',
      message: 'Por favor selecciona un barbero'
    });
  }

  // Date validation
  if (!data.date || data.date.trim() === '') {
    errors.push({
      field: 'date',
      message: 'Por favor selecciona una fecha'
    });
  } else if (!validateDate(data.date)) {
    errors.push({
      field: 'date',
      message: 'La fecha seleccionada no es válida'
    });
  }

  // Time validation
  if (!data.time || data.time.trim() === '') {
    errors.push({
      field: 'time',
      message: 'Por favor selecciona un horario'
    });
  } else if (!validateTime(data.time)) {
    errors.push({
      field: 'time',
      message: 'El horario seleccionado no es válido'
    });
  }

  // Client name validation
  if (!data.clientName || data.clientName.trim() === '') {
    errors.push({
      field: 'clientName',
      message: 'El nombre es requerido'
    });
  } else if (!validateName(data.clientName)) {
    errors.push({
      field: 'clientName',
      message: 'Por favor ingresa un nombre válido'
    });
  }

  // Client email validation
  if (!data.clientEmail || data.clientEmail.trim() === '') {
    errors.push({
      field: 'clientEmail',
      message: 'El correo electrónico es requerido'
    });
  } else if (!validateEmail(data.clientEmail)) {
    errors.push({
      field: 'clientEmail',
      message: 'Por favor ingresa un correo electrónico válido'
    });
  }

  // Client phone validation
  if (!data.clientPhone || data.clientPhone.trim() === '') {
    errors.push({
      field: 'clientPhone',
      message: 'El teléfono es requerido'
    });
  } else if (!validatePhone(data.clientPhone)) {
    errors.push({
      field: 'clientPhone',
      message: 'Por favor ingresa un número de teléfono válido'
    });
  }

  return errors;
}

export function validateContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name || data.name.trim() === '') {
    errors.push({
      field: 'name',
      message: 'El nombre es requerido'
    });
  } else if (!validateName(data.name)) {
    errors.push({
      field: 'name',
      message: 'Por favor ingresa un nombre válido'
    });
  }

  if (!data.email || data.email.trim() === '') {
    errors.push({
      field: 'email',
      message: 'El correo electrónico es requerido'
    });
  } else if (!validateEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Por favor ingresa un correo electrónico válido'
    });
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.push({
      field: 'phone',
      message: 'Por favor ingresa un número de teléfono válido'
    });
  }

  if (!data.message || data.message.trim() === '') {
    errors.push({
      field: 'message',
      message: 'El mensaje es requerido'
    });
  } else if (data.message.trim().length < 10) {
    errors.push({
      field: 'message',
      message: 'El mensaje debe tener al menos 10 caracteres'
    });
  }

  return errors;
} 