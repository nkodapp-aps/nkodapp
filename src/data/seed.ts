import type { Project, TeamMember, Testimonial, CompanyProfile, AppConfig } from "@/lib/types";

export const SEED_COMPANY: CompanyProfile = {
  nombre: "NKODAPP",
  tagline: "Ideas que se convierten en activos digitales.",
  subtitulo_hero:
    "Somos especialistas en Flutter, FlutterFlow y AppHive. Llevamos tu idea al App Store y Google Play.",
  descripcion:
    "NKODAPP es una empresa especializada exclusivamente en desarrollo de aplicaciones móviles para Android e iOS.",
  stats_hero: [
    { label: "Apps publicadas", valor: "54" },
    { label: "Descargas", valor: "180k+" },
    { label: "Países", valor: "12" },
    { label: "Años", valor: "6" },
  ],
  disponibilidad: "available",
  disponibilidad_texto: "Aceptando proyectos",
  email: "nkodapp@gmail.com",
  whatsapp: "https://wa.me/573005514200",
  linkedin: "https://linkedin.com/company/NKODAPP",
  github: "https://github.com/NKODAPP",
  behance: "",
};

export const SEED_CONFIG: AppConfig = {
  password: "NKODAPP2025",
  nombre_sitio: "NKODAPP — Ideas que se convierten en activos digitales",
  meta_descripcion:
    "Especialistas en desarrollo de apps móviles Android e iOS con Flutter, FlutterFlow, AppHive y React Native.",
};

const u = (q: string) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=900&q=80`;

export const SEED_PROJECTS: Project[] = [
  {
    id: "p1",
    nombre: "PayFlow",
    slug: "payflow",
    estado: "published",
    destacado: true,
    tecnologia: "flutter",
    plataformas: ["android", "ios"],
    industria: "Fintech",
    anio: 2025,
    cliente: "PayFlow Inc.",
    duracion: "10 semanas",
    rol_NKODAPP: "Diseño + Desarrollo completo",
    descripcion_corta:
      "App de pagos P2P con cobros instantáneos y carteras digitales.",
    reto:
      "PayFlow necesitaba una app de pagos persona a persona que compitiera con los gigantes del sector, con onboarding rápido y cobros instantáneos en menos de 3 segundos.",
    solucion:
      "Construimos una app Flutter de alto rendimiento con autenticación biométrica, integración de Stripe Connect y notificaciones push en tiempo real. Lanzada simultáneamente en Android e iOS.",
    screenshot_principal: u("photo-1563013544-824ae1b704d3"),
    galeria: [
      u("photo-1563013544-824ae1b704d3"),
      u("photo-1556742502-ec7c0e9f34b1"),
      u("photo-1601597111158-2fceff292cdc"),
      u("photo-1551288049-bebda4e38f71"),
    ],
    stack: ["Flutter", "Dart", "Firebase", "Stripe", "Google Maps"],
    apis: [
      { nombre: "Stripe", descripcion: "Cobros y transferencias P2P" },
      { nombre: "Firebase Auth", descripcion: "Login con teléfono y biometría" },
      { nombre: "Google Maps", descripcion: "Localización de cajeros aliados" },
      { nombre: "OneSignal", descripcion: "Notificaciones push transaccionales" },
    ],
    metricas: [
      { label: "Descargas", valor: "12,000+" },
      { label: "Calificación", valor: "4.8 ★" },
      { label: "Tiempo de cobro", valor: "<3s" },
    ],
    url_play: "https://play.google.com",
    url_store: "https://apps.apple.com",
    orden: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "p2",
    nombre: "MediTrack",
    slug: "meditrack",
    estado: "published",
    destacado: false,
    tecnologia: "flutterflow",
    plataformas: ["ios"],
    industria: "Salud",
    anio: 2024,
    cliente: "Clínica Vital",
    duracion: "6 semanas",
    rol_NKODAPP: "Desarrollo FlutterFlow + integraciones",
    descripcion_corta:
      "Gestión de citas médicas con recordatorios por WhatsApp.",
    reto:
      "Reducir el ausentismo en consultas médicas mediante recordatorios automáticos y reagendado fácil desde el celular del paciente.",
    solucion:
      "App FlutterFlow conectada a Supabase y Calendly, con notificaciones por WhatsApp Business API. MVP funcional en 6 semanas.",
    screenshot_principal: u("photo-1505751172876-fa1923c5c528"),
    galeria: [
      u("photo-1505751172876-fa1923c5c528"),
      u("photo-1576091160550-2173dba999ef"),
      u("photo-1579684385127-1ef15d508118"),
    ],
    stack: ["FlutterFlow", "Supabase", "WhatsApp API"],
    apis: [
      { nombre: "Supabase", descripcion: "Base de datos de pacientes y citas" },
      { nombre: "Calendly", descripcion: "Disponibilidad de médicos" },
      { nombre: "WhatsApp Business", descripcion: "Recordatorios automáticos" },
    ],
    metricas: [
      { label: "Reducción ausentismo", valor: "42%" },
      { label: "Pacientes activos", valor: "3,400" },
      { label: "Calificación", valor: "4.7 ★" },
    ],
    url_store: "https://apps.apple.com",
    orden: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "p3",
    nombre: "ShopLocal MX",
    slug: "shoplocal-mx",
    estado: "published",
    destacado: false,
    tecnologia: "apphive",
    plataformas: ["android", "ios"],
    industria: "E-commerce",
    anio: 2024,
    cliente: "ShopLocal",
    duracion: "8 semanas",
    rol_NKODAPP: "Desarrollo no-code + APIs",
    descripcion_corta:
      "Marketplace local que conecta comercios de barrio con sus vecinos.",
    reto:
      "Lanzar un marketplace hiperlocal en menos de 2 meses para validar tracción en 3 colonias de CDMX.",
    solucion:
      "App AppHive con MercadoPago, geolocalización y SMS de confirmación. MVP listo para captar inversión seed.",
    screenshot_principal: u("photo-1563013544-824ae1b704d3"),
    galeria: [
      u("photo-1563013544-824ae1b704d3"),
      u("photo-1556742502-ec7c0e9f34b1"),
      u("photo-1607082348824-0a96f2a4b9da"),
    ],
    stack: ["AppHive", "Firebase", "MercadoPago"],
    apis: [
      { nombre: "MercadoPago", descripcion: "Pagos en MXN con cuotas" },
      { nombre: "Firebase", descripcion: "Catálogo en tiempo real" },
      { nombre: "Google Maps", descripcion: "Comercios cercanos" },
      { nombre: "Twilio SMS", descripcion: "Confirmación de pedidos" },
    ],
    metricas: [
      { label: "Comercios", valor: "260" },
      { label: "Pedidos/mes", valor: "1,800" },
      { label: "Calificación", valor: "4.6 ★" },
    ],
    url_play: "https://play.google.com",
    url_store: "https://apps.apple.com",
    orden: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: "p4",
    nombre: "TrackBox",
    slug: "trackbox",
    estado: "published",
    destacado: false,
    tecnologia: "flutter",
    plataformas: ["android"],
    industria: "Logística",
    anio: 2023,
    cliente: "Logística Norte",
    duracion: "12 semanas",
    rol_NKODAPP: "App + integración con ERP",
    descripcion_corta:
      "Rastreo de envíos en tiempo real para flotas de última milla.",
    reto:
      "Operadores de última milla necesitaban una app rápida, offline-first, que se sincronizara con su ERP propietario.",
    solucion:
      "App Flutter con sincronización offline, Google Maps y Firebase Realtime DB. Conectada al ERP por REST.",
    screenshot_principal: u("photo-1601597111158-2fceff292cdc"),
    galeria: [
      u("photo-1601597111158-2fceff292cdc"),
      u("photo-1556761175-5973dc0f32e7"),
    ],
    stack: ["Flutter", "Firebase Realtime DB", "REST"],
    apis: [
      { nombre: "ERP cliente", descripcion: "Sincronización de rutas y guías" },
      { nombre: "Google Maps", descripcion: "Navegación y ETA" },
      { nombre: "Firebase Realtime DB", descripcion: "Estado offline-first" },
    ],
    metricas: [
      { label: "Envíos/día", valor: "5,400" },
      { label: "Reducción tiempo ruta", valor: "18%" },
      { label: "Operadores", valor: "320" },
    ],
    url_play: "https://play.google.com",
    orden: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: "p5",
    nombre: "LearnUp",
    slug: "learnup",
    estado: "published",
    destacado: false,
    tecnologia: "react_native",
    plataformas: ["ios"],
    industria: "Educación",
    anio: 2024,
    cliente: "LearnUp Academy",
    duracion: "9 semanas",
    rol_NKODAPP: "Desarrollo React Native + pagos",
    descripcion_corta:
      "Plataforma de e-learning con video on-demand y suscripciones.",
    reto:
      "Migrar una academia online a una experiencia móvil premium con video, pagos recurrentes y comunidad.",
    solucion:
      "App React Native con Vimeo, Stripe Subscriptions y Supabase. Foros y notificaciones de nuevas clases.",
    screenshot_principal: u("photo-1522202176988-66273c2fd55f"),
    galeria: [
      u("photo-1522202176988-66273c2fd55f"),
      u("photo-1503676260728-1c00da094a0b"),
    ],
    stack: ["React Native", "Supabase", "Stripe", "Vimeo"],
    apis: [
      { nombre: "Vimeo", descripcion: "Streaming protegido de clases" },
      { nombre: "Stripe", descripcion: "Suscripciones mensuales" },
      { nombre: "Supabase", descripcion: "Auth y base de datos" },
    ],
    metricas: [
      { label: "Suscriptores", valor: "2,100" },
      { label: "Calificación", valor: "4.9 ★" },
      { label: "Horas vistas", valor: "48k" },
    ],
    url_store: "https://apps.apple.com",
    orden: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: "p6",
    nombre: "ServiApp",
    slug: "serviapp",
    estado: "published",
    destacado: false,
    tecnologia: "flutterflow",
    plataformas: ["android", "ios"],
    industria: "Servicios",
    anio: 2025,
    cliente: "ServiApp",
    duracion: "7 semanas",
    rol_NKODAPP: "Diseño + FlutterFlow",
    descripcion_corta:
      "Marketplace de servicios del hogar: plomería, electricidad y más.",
    reto:
      "Conectar prestadores de servicios verificados con clientes en CDMX y Monterrey, con cobros y agenda integrada.",
    solucion:
      "App FlutterFlow con Stripe, Google Maps y push notifications. Doble app: cliente y prestador.",
    screenshot_principal: u("photo-1556742502-ec7c0e9f34b1"),
    galeria: [
      u("photo-1556742502-ec7c0e9f34b1"),
      u("photo-1581092918056-0c4c3acd3789"),
    ],
    stack: ["FlutterFlow", "Firebase", "Stripe"],
    apis: [
      { nombre: "Stripe", descripcion: "Cobros y split de comisión" },
      { nombre: "Firebase", descripcion: "Auth y mensajería" },
      { nombre: "Google Maps", descripcion: "Match por proximidad" },
      { nombre: "OneSignal", descripcion: "Push de nuevos servicios" },
    ],
    metricas: [
      { label: "Prestadores", valor: "480" },
      { label: "Servicios/mes", valor: "2,400" },
      { label: "Calificación", valor: "4.7 ★" },
    ],
    url_play: "https://play.google.com",
    url_store: "https://apps.apple.com",
    orden: 6,
    created_at: new Date().toISOString(),
  },
];

const portrait = (q: string) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=400&q=80`;

export const SEED_TEAM: TeamMember[] = [
  {
    id: "t1",
    nombre: "Diego Solano",
    rol: "CEO / Product Manager",
    especialidad: "Estrategia de producto y cliente",
    foto_url: portrait("photo-1500648767791-00dcc994a43e"),
    linkedin_url: "https://linkedin.com",
    orden: 1,
  },
  {
    id: "t2",
    nombre: "Karla Méndez",
    rol: "Lead Flutter Developer",
    especialidad: "Flutter · Dart · Firebase",
    foto_url: portrait("photo-1494790108377-be9c29b29330"),
    linkedin_url: "https://linkedin.com",
    orden: 2,
  },
  {
    id: "t3",
    nombre: "Luis Vega",
    rol: "FlutterFlow & AppHive Specialist",
    especialidad: "No-code / Low-code · MVPs rápidos",
    foto_url: portrait("photo-1531427186611-ecfd6d936c79"),
    linkedin_url: "https://linkedin.com",
    orden: 3,
  },
  {
    id: "t4",
    nombre: "Ana Torres",
    rol: "UI/UX Designer",
    especialidad: "Figma · Mobile UX · Design Systems",
    foto_url: portrait("photo-1438761681033-6461ffad8d80"),
    linkedin_url: "https://linkedin.com",
    orden: 4,
  },
  {
    id: "t5",
    nombre: "Marco Ruiz",
    rol: "Backend & APIs Developer",
    especialidad: "Node.js · Supabase · Integraciones",
    foto_url: portrait("photo-1472099645785-5658abf4ff4e"),
    linkedin_url: "https://linkedin.com",
    orden: 5,
  },
];

export const SEED_TESTIMONIALS: Testimonial[] = [
  {
    id: "ts1",
    nombre: "Carlos Reyes",
    empresa: "PayFlow Inc.",
    industria: "Fintech",
    foto_url: portrait("photo-1507003211169-0a1dd7228f2d"),
    texto:
      "El equipo de NKODAPP nos llevó de un Figma a una app en App Store y Google Play en menos de 3 meses. Excelente comunicación y código de calidad.",
    rating: 5,
    orden: 1,
  },
  {
    id: "ts2",
    nombre: "Mariana López",
    empresa: "ShopLocal",
    industria: "E-commerce",
    foto_url: portrait("photo-1573497019940-1c28c88b4f3e"),
    texto:
      "Necesitábamos un MVP rápido para validar nuestra hipótesis. AppHive + NKODAPP nos dio exactamente eso. Ya cerramos ronda seed.",
    rating: 5,
    orden: 2,
  },
  {
    id: "ts3",
    nombre: "Roberto Cárdenas",
    empresa: "Logística Norte",
    industria: "Logística",
    foto_url: portrait("photo-1519085360753-af0119f7cbe7"),
    texto:
      "La app sincroniza con nuestro ERP sin problemas. Nuestros operadores la adoptaron desde el primer día. Recomendados al 100%.",
    rating: 5,
    orden: 3,
  },
];