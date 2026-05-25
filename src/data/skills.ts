export interface Category {
  key: string;
  icon: string;
  colorKey: "blue" | "green" | "pink" | "yellow" | "purple" | "orange";
  skills: string[];
}

export const categories: Category[] = [
  {
    key: "frontend",
    icon: "🎨",
    colorKey: "blue",
    skills: ["React", "TypeScript", "CSS", "PWA", "HTML / CSS", "LESS"],
  },
  {
    key: "backend",
    icon: "⚙️",
    colorKey: "green",
    skills: ["C#", "SQL Server", "Node.js"],
  },
  {
    key: "cloud",
    icon: "☁️",
    colorKey: "pink",
    skills: ["Azure", "Terraform", "CI/CD"],
  },
  {
    key: "ai",
    icon: "🤖",
    colorKey: "yellow",
    skills: ["CLAUDE CODE", "Prompt thinking", "SKILLS", "CHATGPT API"],
  },
  {
    key: "design",
    icon: "✏️",
    colorKey: "purple",
    skills: [
      "UX Thinking",
      "Component Design",
      "Info Architecture",
      "System Design (learning)",
    ],
  },
  {
    key: "writing",
    icon: "📝",
    colorKey: "orange",
    skills: [
      "Technical Writing",
      "Task Recaps",
      "Documentation",
      "Code Review",
    ],
  },
];
