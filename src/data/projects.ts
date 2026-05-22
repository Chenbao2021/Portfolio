export interface Project {
  name: string
  tagline: string
  why: string
  lesson: string
  tech: string[]
  role: string
  github?: string
  demo?: string
  colorKey: 'yellow' | 'blue' | 'green' | 'pink'
  emoji: string
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
    colorKey: 'yellow',
    emoji: '🗂️',
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
    colorKey: 'blue',
    emoji: '📒',
  },
  {
    name: 'Link Analyzer Bot',
    tagline: 'Paste a URL, get back a human-readable summary',
    why: "Tired of reading long articles to discover they weren't useful.",
    lesson: 'LLM APIs are easy to start, hard to make reliable. Rate limits are very real.',
    tech: ['Python', 'FastAPI', 'OpenAI API', 'BeautifulSoup'],
    role: 'Backend + prompt engineering — the prompts took longer than the code',
    github: '#',
    colorKey: 'green',
    emoji: '🔗',
  },
  {
    name: 'Habit Tracker PWA',
    tagline: 'Simple daily habit tracking, offline-first',
    why: 'Other habit apps have too many features. I wanted one screen, one job.',
    lesson: 'Service workers are way more nuanced than the docs suggest. Also: the design took longer than the code.',
    tech: ['React', 'PWA', 'IndexedDB', 'Vite'],
    role: 'Design + development. The design took embarrassingly long.',
    demo: '#',
    colorKey: 'pink',
    emoji: '✅',
  },
]
