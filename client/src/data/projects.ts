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
  tagline: { en: string; fr: string };
  why: { en: string; fr: string };
  lesson: { en: string; fr: string };
  description: { en: string[]; fr: string[] };
}
