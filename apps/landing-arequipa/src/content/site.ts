export interface NavLink {
  label: string;
  href: string;
  /** Submenú del header; cada entrada abre uno de los modales de programas. */
  menu?: { label: string; modalId: "pregrado" | "posgrado" }[];
}

export interface SiteSettings {
  logoSrc: string;
  logoAlt: string;
  navLinks: NavLink[];
  ctaLabel: string;
  ctaHref: string;
  footer: {
    addressLabel: string;
    address: string;
    phoneLabel: string;
    phone: string;
    emailLabel: string;
    email: string;
    mapsUrl: string;
  };
}

export const site: SiteSettings = {
  logoSrc: "/assets/figma/arequipa/logo/logo.svg",
  logoAlt: "Universidad Autónoma del Perú",
  navLinks: [
    {
      label: "Programas",
      href: "#oferta",
      menu: [
        { label: "Pregrado 100% Virtual", modalId: "pregrado" },
        { label: "Posgrado 100% Virtual", modalId: "posgrado" },
      ],
    },
    { label: "¿Por qué estudiar en la Autónoma?", href: "#virtual" },
    { label: "Espacios", href: "#espacios" },
    { label: "Ubicación", href: "#oficina" },
  ],
  ctaLabel: "Reserva una visita",
  ctaHref: "#contacto",
  footer: {
    addressLabel: "Campus Arequipa",
    address: "Av. Ejército 1059B, Cayma, Arequipa.",
    phoneLabel: "Teléfono",
    phone: "933 003 073",
    emailLabel: "Escríbenos",
    email: "informes@autonoma.pe",
    mapsUrl: "https://maps.google.com/?q=Av.+Ejercito+1059B,+Cayma,+Arequipa",
  },
};
