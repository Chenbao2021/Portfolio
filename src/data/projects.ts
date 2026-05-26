export interface Project {
  key: string;
  name: string;
  tech: string[];
  role: string;
  github?: string;
  demo?: string;
  colorKey: "yellow" | "blue" | "green" | "pink";
  emoji: string;
  professional: boolean;
}

export const projects: Project[] = [
  {
    key: "inspectare",
    name: "Inspectare",
    tech: ["React", "PWA", "Azure Cloud", "Terraform", "LESS", "CICD"],
    role: "Solo — designed, built, wrote the docs (all three lines of them)",
    colorKey: "yellow",
    emoji: "🗂️",
    professional: true,
  },
  {
    key: "kds",
    name: "Kitchen Display System",
    tech: ["React Native", "TypeScript", "Firebase"],
    role: "Solo — designed, built, wrote the docs (all three lines of them)",
    colorKey: "pink",
    emoji: "🗂️",
    professional: true,
  },
  {
    key: "narrio",
    name: "Narrio",
    tech: ["CLAUDE CODE", "SKILL", "React", "Firebase"],
    role: "Solo — designed, built, wrote the docs (all three lines of them)",
    github: "https://github.com/Chenbao2021/NARRIO",
    demo: "https://narrio-ff4d7.web.app",
    colorKey: "green",
    emoji: "🗂️",
    professional: false,
  },
];
