import type { Page, SiteSettings } from "../types";

const campuses = ["Lima Sur", "Lima Norte"];
const careers = [
  "Educación Inicial",
  "Educación Primaria",
  "Administración",
  "Contabilidad",
  "Marketing",
  "Enfermería",
  "Obstetricia",
  "Derecho",
  "Ingeniería de Sistemas",
  "Arquitectura",
];

export const settings: SiteSettings = {
  siteName: "Universidad Autónoma del Perú",
  logoAlt: "Universidad Autónoma del Perú",
  logoSrc: "/assets/figma/logo/logo.svg",
  navLinks: [
    { label: "Cifras", href: "#cifras" },
    { label: "Carreras", href: "#carreras" },
    { label: "Modalidades", href: "#modalidades" },
    { label: "Testimonios", href: "#testimonios" },
    { label: "Campus", href: "#campus" },
  ],
  footer: {
    campuses: [
      {
        name: "Campus Lima sur",
        address: "Panamericana Sur Km. 16.3 Villa El Salvador",
      },
      {
        name: "Campus Lima Norte",
        address: "Panamericana Norte Km. 30, Puente Piedra",
      },
    ],
    phone: { label: "Teléfono", value: "942569424" },
    email: { label: "Escríbenos", value: "informes@autonoma.pe" },
  },
};

export const homePage: Page = {
  slug: "home",
  title: "Universidad Autónoma del Perú — Aquí no somos hijitos de papá",
  description:
    "Una universidad para los que se la ganan solos. 26 carreras, 3 modalidades y dos campus en Lima. Regístrate y recibe más información.",
  sections: [
    {
      _type: "hero",
      line1: "Aquí",
      line2: "no somos",
      line3: "hijitos de",
      line4: "papá",
      imageSrc: "/assets/figma/hero/workshop.png",
      imageAlt: "Estudiante en taller práctico",
      formTitle: "¡Regístrate y recibe más información!",
      formSubtitle: "Escoge la modalidad que prefieras",
      formSubmitLabel: "Quiero ser parte",
      modalities: ["Presencial", "Semipresencial", "100% virtual"],
      campuses,
      careers,
    },
    {
      _type: "desafiar",
      eyebrow: "Una universidad",
      title: "que te prepara para desafiar lo establecido",
      videoSrc: "/assets/figma/video/desafiar.png",
      videoAlt: "Video institucional Universidad Autónoma",
      youtubeUrl: "https://www.youtube.com/watch?v=krLopi1Zb3k",
      overlayLine1: "Aquí",
      overlayLine2: "no somos",
      overlayLine3: "hijitos de",
      overlayLine4: "papá",
    },
    {
      _type: "resultados",
      eyebrow: "Cifras reales de",
      title: "peruanos reales",
      stats: [
        {
          value: "32%",
          label: "Trabajan y estudian al mismo tiempo",
          description: "No esperan oportunidades, las crean.",
          source: "ENAHO INEI Perú 2022",
          tone: "yellow",
          iconSrc: "/assets/figma/icons/suitcase.svg",
        },
        {
          value: "6/10",
          label: "Jóvenes aportan económicamente a su hogar",
          description: "Crecen mientras ayudan a los suyos.",
          source: "INEI, Perú 2023",
          tone: "mint",
          iconSrc: "/assets/figma/icons/money.svg",
        },
        {
          value: "73%",
          label: "Primera generación universitaria de su familia",
          description: "Los primeros en llegar más lejos.",
          source: "ENAHO, INEI, Perú 2013",
          tone: "lavender",
          iconSrc: "/assets/figma/icons/graduate.svg",
        },
        {
          value: "36%",
          label: "Autofinancian sus propios estudios",
          description: "Apuestan por su futuro cada día.",
          source: "POS & Arellano Marketing, 2023",
          tone: "sky",
          iconSrc: "/assets/figma/icons/donation.svg",
        },
      ],
    },
    {
      _type: "carreras",
      eyebrow: "Este es el comienzo",
      title: "de algo grande",
      subtitle: "26 carreras para quienes saben exactamente lo que quieren",
      groups: [
        {
          name: "Educación",
          items: ["Educación Inicial", "Educación Primaria"],
        },
        {
          name: "Ciencia en Gestión y Comunicaciones",
          items: [
            "Administración de Empresas",
            "Administración y Marketing",
            "Administración y Negocios Internacionales",
            "Ciencias de la Comunicación",
            "Diseño Gráfico Digital y Publicitario",
            "Contabilidad",
            "Administración y Finanzas",
          ],
        },
        {
          name: "Ciencia de la Salud",
          items: [
            "Medicina Humana",
            "Farmacia y Bioquímica",
            "Obstetricia",
            "Nutrición y Dietética",
            "Enfermería",
            "Psicología",
            "Terapia Física y Rehabilitación",
            "Laboratorio Clínico y Anatomía Patológica",
          ],
        },
        {
          name: "Derecho",
          items: ["Derecho"],
        },
        {
          name: "Ingeniería y Arquitectura",
          items: [
            "Arquitectura",
            "Ingeniería Ambiental",
            "Ingeniería Biomédica",
            "Ingeniería Civil",
            "Ingeniería de Sistemas",
            "Ingeniería Industrial",
            "Ingeniería de Software",
          ],
        },
      ],
    },
    {
      _type: "modalidades",
      eyebrow: "Tú eliges cómo",
      title: "Llegar más lejos",
      subtitle: "3 modalidades diseñadas para adaptarse a tu ritmo de vida.",
      items: [
        {
          name: "Presencial",
          description: "Vive la experiencia universitaria",
          schedule: "Lunes a sábado · Lima Sur y Lima Norte",
          imageSrc: "/assets/figma/modalidades/presencial.png",
          imageAlt: "Estudiante en modalidad presencial",
        },
        {
          name: "Semipresencial",
          description: "Flexibilidad sin perder conexión",
          schedule: "Viernes y Sábados · Lima Sur y Lima Norte",
          imageSrc: "/assets/figma/modalidades/semi.png",
          imageAlt: "Estudiante en modalidad semipresencial",
        },
        {
          name: "100% Virtual",
          description: "Estudia online desde donde estés",
          schedule: "Plataforma 24/7 · A tu ritmo",
          imageSrc: "/assets/figma/modalidades/virtual.png",
          imageAlt: "Estudiante en modalidad virtual",
        },
      ],
    },
    {
      _type: "propioCamino",
      eyebrow: "Una universidad",
      title: "Para los que buscan su propio camino",
      features: [
        {
          title: "Accesibilidad",
          lead: "Tu futuro sí está a tu alcance",
          description:
            "Tarifas accesibles y dos campus cerca de ti para que nada detenga tus ganas de crecer.",
          tone: "sky",
          iconSrc: "/assets/figma/icons/coins.svg",
        },
        {
          title: "Flexibilidad",
          lead: "Tu carrera se adapta a tu vida",
          description:
            "Elige entre 26 carreras profesionales. Tú decides cómo y cuándo avanzar.",
          tone: "mint",
          iconSrc: "/assets/figma/icons/map.svg",
        },
        {
          title: "Trayectoria",
          lead: "18 años impulsando historias de éxito",
          description:
            "Convenios internacionales y alianzas de empleabilidad que te conectan con nuevas oportunidades.",
          tone: "lavender",
          iconSrc: "/assets/figma/icons/medal.svg",
        },
      ],
      imageSrc: "/assets/figma/camino/student.png",
      imageAlt: "Estudiante autónomo",
    },
    {
      _type: "testimonios",
      eyebrow: "Historias de quienes",
      title: "apostaron por sí mismos",
      items: [
        {
          quote:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          author: "María Fernández",
          role: "Ciencias en Gestión — 5to ciclo · Campus Lima Sur",
          videoSrc: "/assets/figma/testimonios/maria.png",
          videoAlt: "Testimonio de María Fernández",
          youtubeUrl: "https://www.youtube.com/watch?v=krLopi1Zb3k",
        },
        {
          quote:
            "Estudiar y trabajar al mismo tiempo no fue fácil, pero aquí encontré el ritmo y el apoyo para no detenerme.",
          author: "Luis Ramírez",
          role: "Ingeniería de Sistemas — 7mo ciclo · Campus Lima Norte",
          videoSrc: "/assets/figma/testimonios/maria.png",
          videoAlt: "Testimonio de Luis Ramírez",
          youtubeUrl: "https://www.youtube.com/watch?v=krLopi1Zb3k",
        },
        {
          quote:
            "Soy la primera de mi familia en llegar a la universidad. Cada ciclo reafirma que valió la pena apostar por mí.",
          author: "Andrea Quispe",
          role: "Derecho — 4to ciclo · Campus Lima Sur",
          videoSrc: "/assets/figma/testimonios/maria.png",
          videoAlt: "Testimonio de Andrea Quispe",
          youtubeUrl: "https://www.youtube.com/watch?v=krLopi1Zb3k",
        },
      ],
    },
    {
      _type: "campus",
      eyebrow: "Ahora estamos más cerca",
      title: "Dos campus, más oportunidades",
      subtitle: "Elige el campus que te acerca a la carrera y al futuro que quieres.",
      campuses: [
        {
          name: "Lima Sur",
          images: [
            { src: "/assets/figma/campus/lima-sur.png", alt: "Campus Lima Sur — vista 1" },
            { src: "/assets/figma/campus/lima-sur.png", alt: "Campus Lima Sur — vista 2" },
            { src: "/assets/figma/campus/lima-sur.png", alt: "Campus Lima Sur — vista 3" },
          ],
        },
        {
          name: "Lima Norte",
          images: [
            { src: "/assets/figma/campus/lima-norte.png", alt: "Campus Lima Norte — vista 1" },
            { src: "/assets/figma/campus/lima-norte.png", alt: "Campus Lima Norte — vista 2" },
            { src: "/assets/figma/campus/lima-norte.png", alt: "Campus Lima Norte — vista 3" },
          ],
        },
      ],
    },
  ],
};

export function getFixtureSettings(): SiteSettings {
  return settings;
}

export function getFixturePage(slug: string): Page | undefined {
  if (slug === "home") return homePage;
  return undefined;
}
