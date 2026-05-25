export interface Category {
  name: string;
  icon: string;
  colorKey: "blue" | "green" | "pink" | "yellow" | "purple" | "orange";
  skills: string[];
}

export const categories: Category[] = [
  {
    name: "Frontend",
    icon: "🎨",
    colorKey: "blue",
    skills: ["React", "TypeScript", "CSS", "PWA", "HTML / CSS", "LESS"],
  },
  {
    name: "Backend",
    icon: "⚙️",
    colorKey: "green",
    skills: ["C#", "SQL Server", "Node.js"],
  },
  {
    name: "Cloud / Infra",
    icon: "☁️",
    colorKey: "pink",
    skills: ["Azure", "Terraform", "CI/CD"],
  },
  {
    name: "AI Tools",
    icon: "🤖",
    colorKey: "yellow",
    skills: ["CLAUDE CODE", "Prompt thinking", "SKILLS", "CHATGPT API"],
  },
  {
    name: "Design / Thinking",
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
    name: "Writing & Clarity",
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
