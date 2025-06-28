# 💈 BarberWeb - Sistema Completo de Reservas para Barbería

Una aplicación web moderna desarrollada con **Next.js 15**, **TypeScript**, **Tailwind CSS 4** y **Atomic Design** para barbersías que buscan una presencia digital profesional con sistema de reservas completo.

## 🚀 Características Principales

- ✅ **Next.js 15** con App Router
- ✅ **TypeScript** para type safety
- ✅ **Tailwind CSS 4** para estilos modernos  
- ✅ **Atomic Design** para arquitectura escalable
- ✅ **Sistema de Reservas Completo** con validaciones
- ✅ **Gestión de Horarios** con disponibilidad en tiempo real
- ✅ **Catálogo de Servicios** con filtros por categoría
- ✅ **Responsive Design** para todos los dispositivos
- ✅ **SEO Optimized** con metadata completo
- ✅ **Accessibility (A11Y)** siguiendo mejores prácticas
- ✅ **Performance Optimized** con Next.js optimizations

## 🎯 Sistema de Reservas Implementado

### 📅 Funcionalidades del Booking System

- **Selección de Servicios**: Catálogo completo con precios y duraciones
- **Filtros por Categoría**: Cortes, Barba, Faciales, Paquetes Especiales
- **Selector de Barberos**: Perfiles con especialidades y ratings
- **Calendario Inteligente**: Horarios disponibles basados en duración del servicio
- **Validación de Formularios**: Validaciones completas en tiempo real
- **Confirmación de Reserva**: Resumen detallado y estados de éxito/error
- **Responsive Design**: Optimizado para móviles y desktop

### 🛎️ Servicios Disponibles

#### Cortes de Cabello
- **Corte Desvanecido** - $150 MXN (55 min)
- **Corte Normal** - $120 MXN (25 min)  
- **Corte a Tijera** - $150 MXN (40 min)

#### Servicios de Barba
- **Arreglo y Delineado** - $100 MXN (20 min)
- **Barba + Pigmentación** - $150 MXN (25 min)
- **Rasurado Completo** - $100 MXN (10 min)
- **Ritual Premium** - $200 MXN (30 min)

#### Tratamientos Faciales
- **Facial Premium** - $200 MXN (20 min)
- **Facial Básico** - $100 MXN (15 min)
- **Delineado de Cejas** - $30 MXN (5 min)

#### Paquetes Especiales
- **Paquete Ejecutivo** - $320-$350 MXN (60-90 min)
- **Paquete Buchón** - $270-$300 MXN (90 min)
- **Paquete Lion King** - $420 MXN (90 min)

## 🏗️ Arquitectura del Proyecto

### Atomic Design Structure Completa

```
src/
├── app/                          # Next.js App Router
│   ├── globals.css              # Estilos globales + booking styles
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Página de inicio
│   ├── servicios/               # Página de servicios
│   │   └── page.tsx
│   └── reservar/                # Sistema de reservas
│       └── page.tsx
├── components/                   # Componentes Atomic Design
│   ├── atoms/                   # Elementos básicos
│   │   ├── Button/              # Botón con múltiples variantes
│   │   ├── Input/               # Input con validación
│   │   ├── Select/              # Dropdown selector
│   │   ├── Textarea/            # Área de texto
│   │   ├── Logo/                # Logo responsivo
│   │   └── index.ts
│   ├── molecules/               # Combinaciones funcionales
│   │   ├── ServiceCard/         # Tarjeta de servicios
│   │   ├── BarberCard/          # Perfil de barberos
│   │   ├── TimeSlotSelector/    # Selector de horarios
│   │   ├── BookingForm/         # Formulario de reserva
│   │   └── index.ts
│   ├── organisms/               # Componentes complejos
│   │   ├── Header/              # Navegación principal
│   │   ├── Footer/              # Pie de página
│   │   └── index.ts
│   ├── templates/               # Layouts de páginas
│   │   ├── HomeTemplate/        # Página principal
│   │   ├── ServicesTemplate/    # Catálogo de servicios
│   │   ├── BookingTemplate/     # Sistema de reservas
│   │   └── index.ts
│   └── index.ts
├── constants/                   # Constantes y datos mock
│   └── index.ts
├── types/                       # Definiciones TypeScript
│   └── index.ts
├── utils/                       # Funciones utilitarias
│   └── index.ts
├── lib/                         # Configuraciones y validaciones
│   ├── api.ts                   # Utilities para API
│   ├── auth.ts                  # Sistema de autenticación
│   ├── validations.ts           # Validaciones de formularios
│   └── index.ts
├── hooks/                       # Custom React hooks
├── context/                     # Context providers
└── styles/                      # Estilos adicionales
```

## 📱 Guía de Uso

### Para Clientes

#### 1. Explorar Servicios (`/servicios`)
- Navega por todos los servicios disponibles
- Filtra por categoría: Cortes, Barba, Faciales, Paquetes
- Ve precios, duración y descripciones detalladas
- Haz clic en "Reservar" para iniciar el proceso

#### 2. Sistema de Reservas (`/reservar`)

**Paso 1: Selecciona tu Servicio**
- Dropdown con todos los servicios disponibles
- Muestra precio y duración de cada servicio
- Vista previa con descripción detallada

**Paso 2: Elige tu Barbero**
- Leon Rivera Jr. - Especialista en cortes desvanecidos
- Pablo Gómez - Experto en cortes a tijera y faciales
- Juan José - Especialista en barbas y pigmentación

**Paso 3: Fecha y Horario**
- Selector de fecha (no permite fechas pasadas)
- Horarios disponibles cada 30 minutos
- Considera duración del servicio y horarios ocupados
- **Horarios**: Lun-Sáb 9:30-20:00, Dom 11:30-15:00

**Paso 4: Información de Contacto**
- Nombre completo (validación de caracteres)
- Email (validación de formato)
- Teléfono (validación México)
- Notas adicionales (opcional)

**Paso 5: Confirmación**
- Resumen completo de la cita
- Total a pagar
- Información de contacto del negocio

#### 3. Estados del Sistema
- **Éxito**: Confirmación con detalles completos
- **Error**: Manejo de errores con opciones de contacto
- **Loading**: Estados de carga durante el proceso

### Para Desarrolladores

#### Componentes Clave

**TimeSlotSelector**
```typescript
<TimeSlotSelector
  date="2024-01-15"
  selectedTime="14:00"
  onTimeSelect={handleTimeSelect}
  businessHours={{ open: "09:30", close: "20:00" }}
  serviceDuration={60}
  bookedSlots={["10:00", "14:30"]}
/>
```

**BookingForm**
```typescript
<BookingForm
  selectedServiceId="corte-desvanecido"
  onSubmit={handleBookingSubmit}
/>
```

**ServicesTemplate con Filtros**
```typescript
// Automáticamente filtra por categorías
// Maneja estado de servicios seleccionados
// Redirecciona a booking con servicio preseleccionado
```

#### Validaciones Implementadas

```typescript
// Validación de email
validateEmail(email: string): boolean

// Validación de teléfono mexicano  
validatePhone(phone: string): boolean

// Validación de nombres
validateName(name: string): boolean

// Validación de fechas
validateDate(date: string): boolean

// Formulario completo de reserva
validateAppointmentForm(data: BookingFormData): ValidationError[]
```

## 🎨 Diseño y UX

### Tema Visual
- **Color Primario**: Amber 600 (#d97706)
- **Fuente**: Inter (Google Fonts)
- **Estilo**: Moderno y profesional
- **Responsive**: Mobile-first approach

### Animaciones
- **Fade In Up**: Entrada de elementos
- **Scale In**: Selección de horarios
- **Shimmer**: Estados de carga
- **Success Scale**: Confirmación de reserva
- **Card Hover**: Efectos de interacción

### Accesibilidad
- Labels apropiados en formularios
- Estados de focus visibles
- Validación en tiempo real
- Mensajes de error claros
- Navegación por teclado

## 🛠️ Scripts Disponibles

```bash
# Desarrollo con Turbopack
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm run start

# Linter
npm run lint
```

## 📦 Dependencias

```json
{
  "next": "15.3.4",
  "react": "^19.0.0",
  "typescript": "^5",
  "tailwindcss": "^4",
  "clsx": "^2.0.0"
}
```

## 🚀 Próximas Funcionalidades

### Backend Integration
- [ ] Base de datos (PostgreSQL/MongoDB)
- [ ] API REST para reservas
- [ ] Sistema de autenticación
- [ ] Gestión de usuarios

### Notificaciones
- [ ] Email de confirmación
- [ ] SMS recordatorios
- [ ] Notificaciones push

### Pagos
- [ ] Integración con Stripe
- [ ] Pagos con tarjeta
- [ ] OXXO Pay
- [ ] Transferencias bancarias

### Panel Administrativo
- [ ] Dashboard de reservas
- [ ] Gestión de barberos
- [ ] Calendario de citas
- [ ] Reportes y métricas
- [ ] Gestión de servicios

### Funcionalidades Premium
- [ ] Programa de lealtad
- [ ] Sistema de reseñas
- [ ] Galería de trabajos
- [ ] Blog/Promociones
- [ ] App móvil

## 🔧 Configuración Avanzada

### Variables de Entorno (Futuro)
```env
NEXT_PUBLIC_API_URL=https://api.barberweb.com
DATABASE_URL=postgresql://...
STRIPE_PUBLIC_KEY=pk_...
SENDGRID_API_KEY=SG...
```

### Despliegue
- **Vercel**: Deployments automáticos
- **Netlify**: Hosting estático
- **Railway**: Backend + Base de datos

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 👥 Contacto

Para más información sobre el desarrollo de este proyecto, contacta con el equipo de desarrollo.

---

**Desarrollado con ❤️ usando Next.js, TypeScript y Atomic Design**

*Sistema de reservas inspirado en las mejores prácticas de la industria de servicios y optimizado para la experiencia del usuario mexicano.*
