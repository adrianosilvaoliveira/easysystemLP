import type { ContactChannel } from "./types";
import { site } from "./site";

export const contactChannels: ContactChannel[] = [
  {
    label: "E-mail",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    label: "Site",
    value: site.websiteDisplay,
    href: site.websiteUrl,
    external: true,
  },
  {
    label: "Instagram",
    value: site.instagramHandle,
    href: site.instagramUrl,
    external: true,
  },
  {
    label: "WhatsApp",
    value: site.whatsappDisplay,
    href: site.whatsappUrl,
    external: true,
  },
];
