export interface Card {
  title: string
  icon: string
  body: string
  bg: string
  rotation: string
  accentBorder: string
}

export const cards: Card[] = [
  {
    title: 'What I do',
    icon: '🔨',
    body: "Full-stack developer at TotalEnergies in France. Mostly frontend with React and TypeScript, some backend with C# and SQL Server, and increasingly cloud work with Azure and Terraform. I build things that are usable, maintainable, and don't make future-me miserable.",
    bg: '#fef9c3',
    rotation: '-1.5deg',
    accentBorder: '#fde047',
  },
  {
    title: "What I'm learning",
    icon: '📚',
    body: "Deliberately expanding from frontend toward cloud and system-level thinking. Currently digging into React/TypeScript architecture, Azure and Terraform, Node.js basics, and system design fundamentals. I'm still learning — and that's the point.",
    bg: '#dbeafe',
    rotation: '1.2deg',
    accentBorder: '#93c5fd',
  },
  {
    title: 'What I care about',
    icon: '❤️',
    body: "Clarity and maintainability. After every task, I write a recap — what the problem was, what I changed, and where to start reading next time. Code that future-me (and teammates) can understand without a phone call.",
    bg: '#dcfce7',
    rotation: '-0.8deg',
    accentBorder: '#86efac',
  },
  {
    title: 'How I think',
    icon: '🧠',
    body: "Break the problem down, write things down, ask better questions. I use AI tools to move faster — but I still care about understanding the problem, checking the trade-offs, and knowing why the solution works. AI as thinking partner, not autopilot.",
    bg: '#fce7f3',
    rotation: '1.5deg',
    accentBorder: '#f9a8d4',
  },
]
