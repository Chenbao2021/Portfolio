export interface Project {
  name: string;
  tagline: string;
  why: string;
  description?: string[];
  lesson: string;
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
    name: "Inspectare",
    tagline:
      "A PWA used by Vetting teams to manage and edit vessel audit reports, with offline access and data synchronization.",
    why: "A project developed within the TotalEnergies group at the request of the Vetting team to replace paper-based maritime inspection reports with a digital solution.",
    description: [
      "Développement d'une PWA pour la getion et l'édition des rapports d'audit de navires avec mode hors ligne et proposer un format standards pour les requêtes de worker.",
      "Implémentation de la synchronisation des données entre plusieurs promesses et intégration de Service Workers pour un usage hors ligne.",
      "Gestion des états complexes côté front)end avec IndexedDB, accélérant l'accès aux données.",
      "Automisation des déploiements et gestion des ressources Azure via Terraform, réduisant les tâches manuelles de 90%.",
      "Collaboration étroite avec l'équipe DevOps pour la mise en place des pipelines CI/CD et la sécurisation des accès cloud.",
    ],
    lesson:
      "Learned more about PWA, Azure Cloud, React, LESS and teamwork — and I’m honestly glad I did.",
    tech: ["React", "PWA", "Azure Cloud", "Terraform", "LESS", "CICD"],
    role: "Solo — designed, built, wrote the docs (all three lines of them)",
    // github: "#",
    colorKey: "yellow",
    emoji: "🗂️",
    professional: true,
  },
  {
    name: "Kitchen Display System",
    tagline:
      "A digital screen system used in restaurants to manage kitchen orders",
    why: "A project I worked on during my apprenticeship year, which was commercialized before the end",
    description: [
      "Development of a real-time mobile application for restaurant order management.",
      "Implementation of data synchronization via Firebase and real-time communication via TCP sockets.",
      "Design of the user interface with Figma and compliance with ESLint standards.",
      "Participation in the commercialization phase and delivery of two stable versions.",
      "Independent work: code writing, testing, and debugging.",
    ],
    lesson:
      "Learned more about React Native, teamwork, and how to build a project from A to Z — and I’m honestly glad I did.",
    tech: ["React Native", "TypeScript", "Firebase"],
    role: "Solo — designed, built, wrote the docs (all three lines of them)",
    // github: "#",
    colorKey: "yellow",
    emoji: "🗂️",
    professional: true,
  },

  {
    name: "Narrio",
    tagline: "A small web application to support story progression",
    why: "",
    description: ["Test."],
    lesson:
      "Learned more about React Native, teamwork, and how to build a project from A to Z — and I’m honestly glad I did.",
    tech: ["React Native", "TypeScript", "Firebase"],
    role: "Solo — designed, built, wrote the docs (all three lines of them)",
    github: "#",
    colorKey: "green",
    emoji: "🗂️",
    professional: false,
  },
];
