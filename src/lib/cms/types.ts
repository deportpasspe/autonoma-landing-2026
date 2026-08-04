export interface NavLink {
  label: string;
  href: string;
}

export interface SiteSettings {
  siteName: string;
  logoAlt: string;
  logoSrc: string;
  navLinks: NavLink[];
  footer: {
    campuses: { name: string; address: string }[];
    phone: { label: string; value: string };
    email: { label: string; value: string };
  };
}

export interface HeroSection {
  _type: "hero";
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  imageSrc: string;
  imageAlt: string;
  formTitle: string;
  formSubtitle?: string;
  formSubmitLabel: string;
  modalities: string[];
  campuses: string[];
  careers: string[];
}

export interface DesafiarSection {
  _type: "desafiar";
  eyebrow: string;
  title: string;
  videoSrc: string;
  videoAlt: string;
  youtubeUrl: string;
  overlayLine1: string;
  overlayLine2: string;
  overlayLine3: string;
  overlayLine4: string;
}

export interface StatCard {
  value: string;
  label: string;
  description: string;
  source: string;
  tone: "yellow" | "mint" | "lavender" | "sky";
  iconSrc: string;
}

export interface ResultadosSection {
  _type: "resultados";
  eyebrow: string;
  title: string;
  stats: StatCard[];
}

export interface CareerGroup {
  name: string;
  items?: string[];
}

export interface CarrerasSection {
  _type: "carreras";
  eyebrow: string;
  title: string;
  subtitle: string;
  groups: CareerGroup[];
}

export interface ModalidadCard {
  name: string;
  description: string;
  schedule: string;
  imageSrc: string;
  imageAlt: string;
}

export interface ModalidadesSection {
  _type: "modalidades";
  eyebrow: string;
  title: string;
  subtitle: string;
  items: ModalidadCard[];
}

export interface FeatureItem {
  title: string;
  lead: string;
  description: string;
  tone: "sky" | "mint" | "lavender";
  iconSrc: string;
}

export interface PropioCaminoSection {
  _type: "propioCamino";
  eyebrow: string;
  title: string;
  features: FeatureItem[];
  imageSrc: string;
  imageAlt: string;
}

export interface TestimonioItem {
  quote: string;
  author: string;
  role: string;
  videoSrc: string;
  videoAlt: string;
  youtubeUrl: string;
}

export interface TestimoniosSection {
  _type: "testimonios";
  eyebrow: string;
  title: string;
  items: TestimonioItem[];
}

export interface CampusImage {
  src: string;
  alt: string;
}

export interface CampusItem {
  name: string;
  images: CampusImage[];
}

export interface CampusSection {
  _type: "campus";
  eyebrow: string;
  title: string;
  subtitle: string;
  campuses: CampusItem[];
}

export type PageSection =
  | HeroSection
  | DesafiarSection
  | ResultadosSection
  | CarrerasSection
  | ModalidadesSection
  | PropioCaminoSection
  | TestimoniosSection
  | CampusSection;

export interface Page {
  slug: string;
  title: string;
  description: string;
  sections: PageSection[];
}
