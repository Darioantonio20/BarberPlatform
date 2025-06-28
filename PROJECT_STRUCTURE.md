# 📁 Estructura Completa del Proyecto BarberWeb

## 🌳 Árbol de Directorios

```
barberweb/
├── 📄 README.md                          # Documentación principal
├── 📄 PROJECT_STRUCTURE.md               # Este archivo
├── 📄 package.json                       # Dependencias y scripts
├── 📄 package-lock.json                  # Lock de dependencias
├── 📄 tsconfig.json                      # Configuración TypeScript
├── 📄 next.config.ts                     # Configuración Next.js
├── 📄 postcss.config.mjs                 # Configuración PostCSS
├── 📄 eslint.config.mjs                  # Configuración ESLint
├── 📄 .gitignore                         # Archivos ignorados por Git
│
├── 📁 public/                            # Archivos estáticos
│   ├── 📁 images/                        # Imágenes del proyecto
│   ├── 📄 file.svg
│   ├── 📄 globe.svg
│   ├── 📄 next.svg
│   ├── 📄 vercel.svg
│   └── 📄 window.svg
│
└── 📁 src/                               # Código fuente
    ├── 📁 app/                           # Next.js App Router
    │   ├── 📄 favicon.ico                # Favicon
    │   ├── 📄 globals.css               # Estilos globales
    │   ├── 📄 layout.tsx                # Layout principal
    │   └── 📄 page.tsx                  # Página de inicio
    │
    ├── 📁 components/                    # Componentes Atomic Design
    │   ├── 📄 index.ts                  # Exportaciones principales
    │   │
    │   ├── 📁 atoms/                    # Elementos básicos
    │   │   ├── 📄 index.ts
    │   │   ├── 📁 Button/
    │   │   │   ├── 📄 Button.tsx
    │   │   │   └── 📄 index.ts
    │   │   ├── 📁 Input/
    │   │   │   ├── 📄 Input.tsx
    │   │   │   └── 📄 index.ts
    │   │   └── 📁 Logo/
    │   │       ├── 📄 Logo.tsx
    │   │       └── 📄 index.ts
    │   │
    │   ├── 📁 molecules/                # Combinaciones de átomos
    │   │   ├── 📄 index.ts
    │   │   ├── 📁 ServiceCard/
    │   │   │   ├── 📄 ServiceCard.tsx
    │   │   │   └── 📄 index.ts
    │   │   └── 📁 BarberCard/
    │   │       ├── 📄 BarberCard.tsx
    │   │       └── 📄 index.ts
    │   │
    │   ├── 📁 organisms/                # Componentes complejos
    │   │   ├── 📄 index.ts
    │   │   ├── 📁 Header/
    │   │   │   ├── 📄 Header.tsx
    │   │   │   └── 📄 index.ts
    │   │   └── 📁 Footer/
    │   │       ├── 📄 Footer.tsx
    │   │       └── 📄 index.ts
    │   │
    │   └── 📁 templates/                # Layouts de páginas
    │       ├── 📄 index.ts
    │       └── 📁 HomeTemplate/
    │           ├── 📄 HomeTemplate.tsx
    │           └── 📄 index.ts
    │
    ├── 📁 constants/                    # Constantes de la aplicación
    │   └── 📄 index.ts                  # Configuración del negocio, rutas, etc.
    │
    ├── 📁 types/                        # Definiciones TypeScript
    │   └── 📄 index.ts                  # Interfaces y tipos personalizados
    │
    ├── 📁 utils/                        # Funciones utilitarias
    │   └── 📄 index.ts                  # Utilidades para formateo, validación, etc.
    │
    ├── 📁 lib/                          # Configuraciones y bibliotecas
    │   ├── 📄 index.ts                  # Configuraciones principales
    │   ├── 📄 api.ts                    # Utilidades para API
    │   ├── 📄 auth.ts                   # Autenticación (placeholder)
    │   └── 📄 validations.ts            # Validaciones de formularios
    │
    ├── 📁 hooks/                        # Custom React hooks
    ├── 📁 context/                      # Context providers
    └── 📁 styles/                       # Estilos adicionales
```

## 🎨 Componentes Implementados

### 🔸 Atoms (3 componentes)
- **Button**: Botón reutilizable con múltiples variantes (primary, secondary, outline, ghost)
- **Input**: Campo de entrada con validación y estados de error
- **Logo**: Logo de la marca con diferentes tamaños y variantes

### 🔸 Molecules (2 componentes)
- **ServiceCard**: Tarjeta para mostrar servicios con imagen, precio y descripción
- **BarberCard**: Tarjeta para mostrar información de barberos con foto y especialidades

### 🔸 Organisms (2 componentes)
- **Header**: Navegación principal con menú responsive y logo
- **Footer**: Pie de página con información de contacto, horarios y redes sociales

### 🔸 Templates (1 componente)
- **HomeTemplate**: Plantilla completa de la página principal con hero, características y CTA

## 📊 Archivos de Configuración

### TypeScript (`types/index.ts`)
- Interfaces para Service, Barber, Appointment, Client
- Enums para ServiceCategory y AppointmentStatus
- Props types para componentes

### Constantes (`constants/index.ts`)
- Configuración del sitio (SITE_CONFIG)
- Información del negocio (BUSINESS_INFO)
- Horarios de atención (BUSINESS_HOURS)
- Servicios mock (SERVICES_MOCK)
- Barberos mock (BARBERS_MOCK)
- Rutas de la aplicación (ROUTES)

### Utilidades (`utils/index.ts`)
- Función `cn()` para merge de clases CSS
- Formateo de precios, fechas y tiempo
- Validación de email y teléfono
- Funciones para slots de tiempo
- Debounce para búsquedas

### API (`lib/api.ts`)
- Clase APIError personalizada
- Función apiRequest genérica
- Funciones específicas para barbershop API

## 🎨 Estilos y Tema

### Colores Principales
- **Amber 600** (#d97706) - Color principal
- **Amber 700** (#b45309) - Estados hover
- **Gray 900** (#111827) - Texto principal
- **White** (#ffffff) - Fondo principal

### Fuentes
- **Inter** - Fuente principal (Google Fonts)

### Animaciones Custom
- fadeInUp - Animación de entrada desde abajo
- slideInLeft - Animación de entrada desde la izquierda
- Hover effects para botones y tarjetas
- Scrollbar personalizada

## 🚀 Características Implementadas

### ✅ Responsive Design
- Mobile-first approach
- Breakpoints optimizados
- Menú hamburguesa para móviles

### ✅ Accessibility (A11Y)
- Focus states visibles
- Screen reader support
- Semantic HTML
- ARIA labels

### ✅ Performance
- Optimización de imágenes con Next.js
- Lazy loading
- Code splitting automático
- Prefetch de enlaces

### ✅ SEO
- Metadata completo
- Open Graph tags
- Structured data ready
- Semantic HTML

## 🔧 Scripts Disponibles

```bash
npm run dev      # Desarrollo con Turbopack
npm run build    # Build para producción
npm run start    # Servidor de producción
npm run lint     # Linter ESLint
```

## 📦 Dependencias Clave

- **Next.js 15.3.4** - Framework React
- **React 19** - Biblioteca UI
- **TypeScript 5** - Tipado estático
- **Tailwind CSS 4** - Framework CSS
- **clsx** - Utilidad para clases CSS

## 🌟 Próximos Pasos

1. **Páginas adicionales**: Servicios, Barberos, Contacto, Reservas
2. **Sistema de reservas**: Calendario interactivo y gestión de citas
3. **Panel administrativo**: Gestión de barberos, servicios y citas
4. **Base de datos**: Integración con Prisma/MongoDB
5. **Autenticación**: Sistema de usuarios y roles
6. **Pagos**: Integración con Stripe/PayPal
7. **Notificaciones**: Emails y SMS para confirmaciones

---

**✨ Estructura creada siguiendo las mejores prácticas de Atomic Design y Next.js** 