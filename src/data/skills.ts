export interface Category {
  name: string
  icon: string
  bg: string
  skills: string[]
}

export const categories: Category[] = [
  {
    name: 'Frontend',
    icon: '🎨',
    bg: '#dbeafe',
    skills: ['React', 'TypeScript', 'CSS', 'PWA', 'HTML / CSS', 'Vite'],
  },
  {
    name: 'Backend',
    icon: '⚙️',
    bg: '#dcfce7',
    skills: ['C#', 'SQL Server', 'REST APIs', 'Node.js (learning)'],
  },
  {
    name: 'Cloud / Infra',
    icon: '☁️',
    bg: '#fce7f3',
    skills: ['Azure', 'Terraform', 'CI/CD'],
  },
  {
    name: 'AI Tools',
    icon: '🤖',
    bg: '#fef9c3',
    skills: ['Claude', 'ChatGPT', 'AI-assisted workflow', 'Prompt thinking'],
  },
  {
    name: 'Design / Thinking',
    icon: '✏️',
    bg: '#f3e8ff',
    skills: ['UX Thinking', 'Component Design', 'Info Architecture', 'System Design (learning)'],
  },
  {
    name: 'Writing & Clarity',
    icon: '📝',
    bg: '#fff7ed',
    skills: ['Technical Writing', 'Task Recaps', 'Documentation', 'Code Review'],
  },
]
