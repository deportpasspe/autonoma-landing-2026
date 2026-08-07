export interface FaqItem {
  question: string;
  answer: string;
}

export interface StatItem {
  value: string;
  label: string;
  iconSrc: string;
}

export interface ProgramCategory {
  id: string;
  title: string;
  iconSrc: string;
  programs: string[];
}

export interface PosgradoTab {
  id: string;
  /** Uppercase label with the count, used by the modal tabs. */
  label: string;
  /** Plain name, used by the lead form category selector. */
  name: string;
  count: number;
  /** A single group renders its programs across the full grid; several groups render one column each. */
  groups: ProgramCategory[];
}

export interface AccordionItem {
  title: string;
  body: string;
}

export interface EspaciosItem {
  id: string;
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
}

export interface OfficeFeature {
  id: string;
  title: string;
  description: string;
  iconSrc: string;
  imageSrc: string;
  imageAlt: string;
}

export interface Ally {
  name: string;
  logoSrc: string;
}

export interface Testimonial {
  name: string;
  description: string;
  program: string;
  imageSrc: string;
  videoUrl: string;
}

export interface BlogCard {
  title: string;
  excerpt: string;
  day: string;
  month: string;
  href: string;
  imageSrc: string;
}

export interface PageContent {
  title: string;
  description: string;
  hero: {
    title: string;
    titleAccent: string;
    subtitle: string;
    badge: string;
    imageSrc: string;
    mapCard: {
      title: string;
      address: string;
      phone: string;
    };
  };
  form: {
    title: string;
    submitLabel: string;
    /** First step of the cascade: picking one of these reveals the rest of the fields. */
    levels: { id: "pregrado" | "posgrado"; label: string }[];
    campuses: string[];
  };
  oferta: {
    title: string;
    titleAccent: string;
    subtitle: string;
    banner: string;
    cards: { title: string; description: string; imageSrc: string; href: string }[];
    statsTitle: string;
    statsSubtitle: string;
    stats: StatItem[];
  };
  oficina: {
    title: string;
    titleAccent: string;
    subtitle: string;
    imageSrc: string;
    features: OfficeFeature[];
  };
  virtual: {
    title: string;
    titleAccent: string;
    titleTail: string;
    partnerLabel: string;
    partnerLogoSrc: string;
    items: AccordionItem[];
    imageSrc: string;
  };
  espacios: {
    title: string;
    highlights: string[];
    ctaLabel: string;
    panelTitle: string;
    panelIntro: string;
    items: EspaciosItem[];
    reserve: { text: string; ctaLabel: string; href: string };
  };
  aliados: {
    title: string;
    subtitle: string;
    items: Ally[];
  };
  contacto: {
    title: string;
    address: string;
    phoneLabel: string;
    phone: string;
    hoursLabel: string;
    hours: string;
    mapsLabel: string;
    mapsUrl: string;
    /** Google Maps embed URL clipped by the Figma map-frame SVG. */
    mapEmbedSrc: string;
  };
  testimonios: {
    title: string;
    subtitle: string;
    items: Testimonial[];
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  blog: {
    title: string;
    tabs: string[];
    featured: BlogCard;
    cards: BlogCard[];
  };
  pregradoCategories: ProgramCategory[];
  posgradoTabs: PosgradoTab[];
}

export const page: PageContent = {
  title: "Nueva sede Arequipa | Universidad Autónoma del Perú",
  description:
    "Visita la Oficina Autónoma Virtual en Arequipa y recibe asesoría personalizada sobre nuestra oferta académica 100% virtual.",
  hero: {
    title: "Visita la Oficina",
    titleAccent: "Autónoma Virtual",
    subtitle: "y recibe asesoría personalizada sobre nuestra oferta académica.",
    badge: "100% Virtual",
    imageSrc: "/assets/figma/arequipa/hero/hero-cover.webp",
    mapCard: {
      title: "¡Conócela hoy!",
      address: "Av. Ejército 1059B, Arequipa",
      phone: "Escríbenos al 933 003 073",
    },
  },
  form: {
    title: "Da el siguiente paso",
    submitLabel: "Quiero ser parte",
    levels: [
      { id: "pregrado", label: "Pregrado 100% Virtual" },
      { id: "posgrado", label: "Posgrado 100% Virtual" },
    ],
    campuses: ["Arequipa", "Lima Sur", "Lima Norte"],
  },
  oferta: {
    title: "Oferta Académica",
    titleAccent: "100% Virtual",
    subtitle:
      "Explora nuestras opciones de estudio diseñadas para responder a las exigencias del mercado. Pregrado 100% Virtual y Posgrado 100% Virtual.",
    banner: "Modalidad virtual disponible en todos los programas",
    cards: [
      {
        title: "Pregrado 100% Virtual",
        description:
          "Explora nuestras carreras profesionales y encuentra la opción ideal para impulsar tu desarrollo académico y profesional.",
        imageSrc: "/assets/figma/arequipa/oferta/pregrado.webp",
        href: "#modal-pregrado",
      },
      {
        title: "Posgrado 100% Virtual",
        description:
          "Descubre nuestras maestrías, segundas especialidades y programas especializados para fortalecer tus competencias y potenciar tu crecimiento profesional.",
        imageSrc: "/assets/figma/arequipa/oferta/posgrado.webp",
        href: "#modal-posgrado",
      },
    ],
    statsTitle: "Nuestra comunidad en cifras",
    statsSubtitle: "Descubre los indicadores que reflejan nuestro compromiso con la calidad académica.",
    stats: [
      {
        value: "+18",
        label: "años de experiencia",
        iconSrc: "/assets/figma/arequipa/icons/stat-1.svg",
      },
      {
        value: "+28 mil",
        label: "egresados",
        iconSrc: "/assets/figma/arequipa/icons/stat-2.svg",
      },
      {
        value: "70%",
        label: "de empleabilidad en los primeros meses",
        iconSrc: "/assets/figma/arequipa/icons/stat-3.svg",
      },
      {
        value: "+420",
        label: "convenios con empresas",
        iconSrc: "/assets/figma/arequipa/icons/stat-4.svg",
      },
    ],
  },
  oficina: {
    title: "Conoce nuestra nueva",
    titleAccent: "oficina en Arequipa",
    subtitle:
      "Recibe asesoría personalizada, orientación académica, acompañamiento al estudiante, counter de informes y accede a salas de coworking y espacios colaborativos.",
    imageSrc: "/assets/figma/arequipa/oficina/atencion.webp",
    features: [
      {
        id: "atencion",
        title: "Atención personalizada",
        description:
          "Recibe orientación para elegir el programa que mejor se adapte a tus objetivos profesionales.",
        iconSrc: "/assets/figma/arequipa/icons/atencion.svg",
        imageSrc: "/assets/figma/arequipa/oficina/atencion.webp",
        imageAlt: "Asesoría personalizada en el counter de la oficina Autónoma Virtual en Arequipa",
      },
      {
        id: "admision",
        title: "Admisión Guiada",
        description:
          "Te acompañamos durante tu proceso de admisión y matrícula para que inicies tus estudios con confianza.",
        iconSrc: "/assets/figma/arequipa/icons/admision.svg",
        imageSrc: "/assets/figma/arequipa/oficina/admision.webp",
        imageAlt: "Admisión guiada: asesora orienta a una estudiante en la oficina de Arequipa",
      },
      {
        id: "espacios",
        title: "Espacios Colaborativos",
        description:
          "Accede a 4 salas de coworking y 1 sala gerencial, equipadas con Wi-Fi de alta velocidad y café ilimitado, ideales para estudiar, trabajar o reunirte.",
        iconSrc: "/assets/figma/arequipa/icons/espacios.svg",
        imageSrc: "/assets/figma/arequipa/oficina/espacios.webp",
        imageAlt: "Espacios colaborativos con Wi-Fi en la oficina Autónoma Virtual",
      },
      {
        id: "comunidad",
        title: "Comunidad Autónoma",
        description:
          "Participa en webinars, conferencias y eventos exclusivos para fortalecer tus conocimientos y ampliar tu red de contactos.",
        iconSrc: "/assets/figma/arequipa/icons/comunidad.svg",
        imageSrc: "/assets/figma/arequipa/oficina/comunidad.webp",
        imageAlt: "Estudiante en clase virtual desde la oficina de Arequipa",
      },
    ],
  },
  virtual: {
    title: "¿Por qué estudiar",
    titleAccent: "100% Virtual en la Autónoma?",
    titleTail: "",
    partnerLabel: "Somos parte del",
    partnerLogoSrc: "/assets/figma/arequipa/virtual/qs-rankings.svg",
    imageSrc: "/assets/figma/arequipa/virtual/porque-estudiar.webp",
    items: [
      {
        title: "Estudia a tu ritmo",
        body: "Organiza tus horarios y aprende desde donde estés, sin dejar de lado tu trabajo ni tus responsabilidades.",
      },
      {
        title: "Impulsa tu crecimiento profesional",
        body: "Accede a programas diseñados para fortalecer tus competencias y abrir nuevas oportunidades laborales.",
      },
      {
        title: "Calidad académica",
        body: "Estudia con docentes especializados y una oferta académica actualizada que responde a las necesidades del mercado.",
      },
      {
        title: "Te acompañamos en cada paso",
        body: "Recibe asesoría personalizada desde tu admisión hasta el inicio de clases y durante toda tu experiencia académica.",
      },
    ],
  },
  espacios: {
    title: "Conoce nuestros espacios",
    highlights: [
      "4 salas de coworking + 1 sala gerencial",
      "Wi-Fi de alta velocidad",
      "Café ilimitado",
    ],
    ctaLabel: "Ver más",
    panelTitle: "El espacio ideal para cada momento",
    panelIntro: "Selecciona el ambiente que mejor se adapte a tus necesidades.",
    items: [
      {
        id: "overview",
        title: "Conoce nuestros espacios",
        body: "Descubre el espacio ideal para estudiar, trabajar o reunirte.",
        imageSrc: "/assets/figma/arequipa/espacios/overview.webp",
        imageAlt: "Área de atención y espacios de la oficina Autónoma Virtual en Arequipa",
      },
      {
        id: "gerencial",
        title: "Sala Gerencial",
        body: "Espacio privado para reuniones y asesorías.",
        imageSrc: "/assets/figma/arequipa/espacios/gerencial.webp",
        imageAlt: "Sala gerencial con mesa de reuniones en la oficina Autónoma Virtual",
      },
      {
        id: "coworking",
        title: "Salas de Coworking",
        body: "4 salas para estudiar, trabajar o reunirte con comodidad.",
        imageSrc: "/assets/figma/arequipa/espacios/coworking.webp",
        imageAlt: "Sala de coworking con mesas de estudio y café en la oficina Autónoma Virtual",
      },
    ],
    reserve: {
      text: "Si eres estudiante reserva tu espacio",
      ctaLabel: "Reserva aquí",
      href: "#contacto",
    },
  },
  aliados: {
    title: "Alianzas Estratégicas",
    subtitle:
      "Trabajamos junto a instituciones y organizaciones que fortalecen nuestra propuesta académica.",
    items: [
      { name: "G&T Grupo Empresarial", logoSrc: "/assets/figma/arequipa/aliados/logo-gt.webp" },
      {
        name: "Colegio de Enfermeros del Perú",
        logoSrc: "/assets/figma/arequipa/aliados/logo-enfermeros.webp",
      },
      {
        name: "Colegio de Abogados de Arequipa",
        logoSrc: "/assets/figma/arequipa/aliados/logo-abogados.webp",
      },
    ],
  },
  contacto: {
    title: "Visítanos en",
    address: "Av. Ejército 1059B, Cayma, Arequipa.",
    phoneLabel: "Teléfono",
    phone: "933 003 073",
    hoursLabel: "Atención",
    hours: "Lunes a viernes 9:00 a. m. a 6:00 p. m. Sábados de 9:00 a. m. a 1:00 p. m.",
    mapsLabel: "Ver en google maps",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Universidad+Aut%C3%B3noma+del+Per%C3%BA+Oficina+de+Atenci%C3%B3n+Arequipa+Av.+Ej%C3%A9rcito+1059B+Cayma",
    mapEmbedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.7159663412895!2d-71.55142479999999!3d-16.3884251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424bdb69c5b6cd%3A0x476095a889dcaf6e!2sUniversidad%20Aut%C3%B3noma%20del%20Per%C3%BA%20-%20Oficina%20de%20Atenci%C3%B3n%20Arequipa!5e0!3m2!1ses-419!2spe!4v1786041256669!5m2!1ses-419!2spe",
  },
  testimonios: {
    title: "Testimonios",
    subtitle:
      "Conoce las experiencias de nuestros estudiantes y egresados, y descubre cómo transformaron su futuro con nosotros",
    items: [
      {
        name: "Anderson Fuentes",
        description: "Misión académica con la Konrad Lorenz",
        program: "Ingeniería de Sistemas",
        imageSrc: "/assets/figma/arequipa/testimonios/testimonio-1.webp",
        videoUrl: "#",
      },
      {
        name: "Erika Córdova",
        description: "Pasantía Internacional con la UNAM Universidad Nacional Autónoma de México",
        program: "Psicología",
        imageSrc: "/assets/figma/arequipa/testimonios/testimonio-2.webp",
        videoUrl: "#",
      },
      {
        name: "Sharon Magallanez",
        description: "Beca Summer School 2023, de la Universidad Internacional SEK de Ecuador (UISEK)",
        program: "Psicología",
        imageSrc: "/assets/figma/arequipa/testimonios/testimonio-3.webp",
        videoUrl: "#",
      },
    ],
  },
  faq: {
    title: "Preguntas Frecuentes",
    items: [
      {
        question: "¿Cómo puedo estudiar una carrera a distancia desde Arequipa?",
        answer:
          "Puedes estudiar una carrera a distancia desde Arequipa mediante la modalidad 100% virtual de la Universidad Autónoma. Además de la flexibilidad para estudiar desde donde te encuentres, la oficina de Arequipa brinda orientación durante el proceso de admisión y acceso a espacios de estudio para los estudiantes.",
      },
      {
        question: "¿La oficina de Arequipa de la Autónoma cuenta con espacios de estudio?",
        answer:
          "Sí. La oficina cuenta con espacios de estudio y coworking para que los estudiantes de la Universidad Autónoma, especialmente quienes cursan programas virtuales, dispongan de un lugar donde desarrollar sus actividades académicas. También pueden recibir orientación cuando la necesiten.",
      },
      {
        question: "¿Puedo estudiar una maestría a distancia desde Arequipa?",
        answer:
          "Sí. Puedes estudiar una maestría a distancia desde Arequipa en la modalidad 100% virtual. Además, la oficina de Arequipa brinda orientación durante el proceso de admisión y pone a disposición espacios de estudio y coworking para los estudiantes.",
      },
      {
        question: "¿Qué servicios ofrece la Oficina de la Universidad Autónoma en Arequipa?",
        answer:
          "La oficina brinda orientación sobre carreras y maestrías virtuales, apoyo durante los procesos de admisión y matrícula, además de espacios de estudio y coworking para los estudiantes de la Universidad Autónoma.",
      },
      {
        question: "¿Cómo estudiar en una universidad a distancia desde Arequipa?",
        answer:
          "Puedes estudiar en la Universidad Autónoma desde Arequipa a través de sus carreras y maestrías en modalidad virtual. Además, la oficina de Arequipa ofrece orientación durante el proceso de admisión y acceso a espacios de estudio y coworking para los estudiantes.",
      },
    ],
  },
  blog: {
    title: "Eventos y blog",
    tabs: ["Eventos", "Blog"],
    featured: {
      title: "Bienvenida de Educación 2026-I",
      excerpt:
        "El ecosistema emprendedor peruano crece con fuerza, impulsando soluciones digitales en diversos sectores...",
      day: "30",
      month: "de enero",
      href: "#",
      imageSrc: "/assets/figma/arequipa/blog/destacado.webp",
    },
    cards: [
      {
        title: "Bienvenida de Ingeniería y Arquitectura 2026-i",
        excerpt:
          "Especialistas destacan la importancia de atender el bienestar emocional en estudiantes y profesionales...",
        day: "30",
        month: "de enero",
        href: "#",
        imageSrc: "/assets/figma/arequipa/blog/blog-2.webp",
      },
      {
        title: "Bienvenida de Ciencias de Gestión y Comunicación 2026-i",
        excerpt:
          "Especialistas destacan la importancia de atender el bienestar emocional en estudiantes y profesionales...",
        day: "30",
        month: "de enero",
        href: "#",
        imageSrc: "/assets/figma/arequipa/blog/blog-3.webp",
      },
    ],
  },
  pregradoCategories: [
    {
      id: "educacion",
      title: "Educación",
      iconSrc: "/assets/figma/arequipa/icons/educacion.svg",
      programs: ["Educación Primaria (Nueva)", "Educación Inicial"],
    },
    {
      id: "gestion",
      title: "Ciencias de Gestión y Comunicaciones",
      iconSrc: "/assets/figma/arequipa/icons/gestion.svg",
      programs: [
        "Administración de Empresas",
        "Administración y Marketing",
        "Administración y Negocios Internacionales",
        "Contabilidad",
        "Administración y Finanzas",
      ],
    },
    {
      id: "salud",
      title: "Ciencias de la Salud",
      iconSrc: "/assets/figma/arequipa/icons/salud.svg",
      programs: ["Psicología"],
    },
    {
      id: "derecho",
      title: "Derecho",
      iconSrc: "/assets/figma/arequipa/icons/derecho.svg",
      programs: ["Derecho"],
    },
    {
      id: "ingenieria",
      title: "Ingeniería y Arquitectura",
      iconSrc: "/assets/figma/arequipa/icons/ingenieria.svg",
      programs: ["Ingeniería de Sistemas", "Ingeniería Industrial", "Ingeniería de Software"],
    },
  ],
  posgradoTabs: [
    {
      id: "maestrias",
      label: "MAESTRÍAS (16)",
      name: "Maestrías",
      count: 16,
      groups: [
        {
          id: "maestrias",
          title: "Maestrías",
          iconSrc: "/assets/figma/arequipa/icons/graduate.svg",
          programs: [
            "Maestría en Administración de Empresas - MBA",
            "Maestría en Ciberseguridad",
            "Maestría en Ciencia de Datos",
            "Maestría en Contrataciones del Estado",
            "Maestría en Derecho Penal y Procesal Penal",
            "Maestría en Educación",
            "Maestría en Gestión de la Construcción y BIM",
            "Maestría en Gestión de los Servicios de Salud",
            "Maestría en Gestión e Innovación Educativa",
            "Maestría en Gestión Pública",
            "Maestría en Inteligencia Artificial",
            "Maestría en Marketing Digital",
            "Maestría en Psicología Clínica",
            "Maestría en Psicología Educativa",
            "Maestría en Seguridad y Salud en el Trabajo",
            "Maestría en Tributación",
          ],
        },
      ],
    },
    {
      id: "segundas",
      label: "SEGUNDAS ESPECIALIDADES (18)",
      name: "Segundas Especialidades",
      count: 18,
      groups: [
        {
          id: "enfermeria",
          title: "Segundas Especialidades en Enfermería",
          iconSrc: "/assets/figma/arequipa/icons/enfermeria.svg",
          programs: [
            "Salud Pública Comunitaria",
            "Oncología",
            "Nefrología",
            "Emergencias y Desastres",
            "Centro Quirúrgico",
          ],
        },
        {
          id: "educacion",
          title: "Segundas Especialidades en Educación",
          iconSrc: "/assets/figma/arequipa/icons/educacion-posgrado.svg",
          programs: [
            "Neuroeducación y Diseño Universal para el Aprendizaje",
            "Políticas Educativas y Gestión de Instituciones Públicas",
            "Atención a la Diversidad e Inclusión Educativa",
            "Educación en Lenguaje Infantil: Evaluación e Intervención",
            "Educación Digital para el Aprendizaje",
          ],
        },
        {
          id: "psicologia",
          title: "Segundas Especialidades en Psicología",
          iconSrc: "/assets/figma/arequipa/icons/psicologia.svg",
          programs: [
            "Psicología Clínica",
            "Psicología Jurídica Forense",
            "Segundas Especialidades en Obstetricia",
            "Alto Riesgo y Emergencias Obstétricas",
            "Monitoreo Fetal y Ecografía Obstétrica",
          ],
        },
        {
          id: "derecho",
          title: "Segundas Especialidades en Derecho",
          iconSrc: "/assets/figma/arequipa/icons/derecho.svg",
          programs: ["Derecho de Protección al Consumidor", "Derecho Registral"],
        },
      ],
    },
    {
      id: "especializados",
      label: "PROGRAMAS ESPECIALIZADOS (11)",
      name: "Programas Especializados",
      count: 11,
      groups: [
        {
          id: "especializados",
          title: "Programas Especializados",
          iconSrc: "/assets/figma/arequipa/icons/graduate.svg",
          programs: [
            "Análisis de Datos con Power BI para la Toma de Decisiones",
            "Clima y Cultura Organizacional",
            "Gestión de Contrataciones Públicas",
            "Gestión del Talento Humano",
            "Gestión Deportiva",
            "Gestión Estratégica de Ventas",
            "Inteligencia Artificial Generativa",
            "Inteligencia Artificial Generativa Aplicada a la Educación",
            "Marketing Digital & Ecommerce",
            "Gestión de Clínicas y Centros de Salud",
            "Peritaje en Criminalística",
          ],
        },
      ],
    },
  ],
};
