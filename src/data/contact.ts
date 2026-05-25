export interface ContactLink {
  key: string;
  handle: string;
  href: string;
  icon: string;
  colorKey: "yellow" | "gray" | "blue";
}

export const links: ContactLink[] = [
  {
    key: "email",
    handle: "yuchenbao2015@gmail.com",
    href: "mailto:yuchenbao2015@gmail.com",
    icon: "✉️",
    colorKey: "yellow",
  },
  {
    key: "github",
    handle: "@yuchenbao",
    href: "https://github.com/Chenbao2021",
    icon: "🐙",
    colorKey: "gray",
  },
  {
    key: "linkedin",
    handle: "in/yuchenbao",
    href: "https://www.linkedin.com/in/yuchenbao/",
    icon: "💼",
    colorKey: "blue",
  },
];
