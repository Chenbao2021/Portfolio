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
