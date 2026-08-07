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
  whatsappHref: string;
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
  whatsappHref:
    "https://api.whatsapp.com/send?phone=+933003073&text=Hola,%20deseo%20informaci%C3%B3n%20sobre%20la%20Universidad%20Aut%C3%B3noma%20del%20Per%C3%BA%20(Oficina%20Arequipa)",
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
