export interface Project {
  name: string
  tagline: string
  why: string
  lesson: string
  tech: string[]
  role: string
  github?: string
  demo?: string
  accent: string
  emoji: string
  rotation: string
}

export const projects: Project[] = [
  {
    name: 'Batch Renamer CLI',
    tagline: "File renaming that doesn't make you want to rage-quit",
    why: 'Had 300 files to rename manually. Refused to do it the boring way.',
    lesson: "Learned more about Node.js streams and regex edge cases than I expected — and honestly, I'm glad I did.",
    tech: ['Node.js', 'TypeScript', 'CLI', 'Regex'],
    role: 'Solo — designed, built, wrote the docs (all three lines of them)',
    github: '#',
    accent: '#fef9c3',
    emoji: '🗂️',
    rotation: '-1.2deg',
  },
  {
    name: 'DevNotes Dashboard',
    tagline: 'A personal Notion-lite for organizing learning notes',
    why: 'My notes lived across 6 different apps. That was genuinely chaotic.',
    lesson: 'UI state management is harder than business logic. Every single time.',
    tech: ['React', 'TypeScript', 'Supabase', 'Tailwind'],
    role: 'Full-stack — both the product idea and all the code',
    github: '#',
    demo: '#',
    accent: '#dbeafe',
    emoji: '📒',
    rotation: '0.8deg',
  },
  {
    name: 'Link Analyzer Bot',
    tagline: 'Paste a URL, get back a human-readable summary',
    why: "Tired of reading long articles to discover they weren't useful.",
    lesson: 'LLM APIs are easy to start, hard to make reliable. Rate limits are very real.',
    tech: ['Python', 'FastAPI', 'OpenAI API', 'BeautifulSoup'],
    role: 'Backend + prompt engineering — the prompts took longer than the code',
    github: '#',
    accent: '#dcfce7',
    emoji: '🔗',
    rotation: '-0.6deg',
  },
  {
    name: 'Habit Tracker PWA',
    tagline: 'Simple daily habit tracking, offline-first',
    why: 'Other habit apps have too many features. I wanted one screen, one job.',
    lesson: 'Service workers are way more nuanced than the docs suggest. Also: the design took longer than the code.',
    tech: ['React', 'PWA', 'IndexedDB', 'Vite'],
    role: 'Design + development. The design took embarrassingly long.',
    demo: '#',
    accent: '#fce7f3',
    emoji: '✅',
    rotation: '1.1deg',
  },
]
