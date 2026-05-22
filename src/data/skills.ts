export interface Category {
  name: string
  icon: string
  colorKey: 'blue' | 'green' | 'pink' | 'yellow' | 'purple' | 'orange'
  skills: string[]
}

export const categories: Category[] = [
  {
    name: 'Frontend',
    icon: '🎨',
    colorKey: 'blue',
    skills: ['React', 'TypeScript', 'CSS', 'PWA', 'HTML / CSS', 'Vite'],
  },
  {
    name: 'Backend',
    icon: '⚙️',
    colorKey: 'green',
    skills: ['C#', 'SQL Server', 'REST APIs', 'Node.js (learning)'],
  },
  {
    name: 'Cloud / Infra',
    icon: '☁️',
    colorKey: 'pink',
    skills: ['Azure', 'Terraform', 'CI/CD'],
  },
  {
    name: 'AI Tools',
    icon: '🤖',
    colorKey: 'yellow',
    skills: ['Claude', 'ChatGPT', 'AI-assisted workflow', 'Prompt thinking'],
  },
  {
    name: 'Design / Thinking',
    icon: '✏️',
    colorKey: 'purple',
    skills: ['UX Thinking', 'Component Design', 'Info Architecture', 'System Design (learning)'],
  },
  {
    name: 'Writing & Clarity',
    icon: '📝',
    colorKey: 'orange',
    skills: ['Technical Writing', 'Task Recaps', 'Documentation', 'Code Review'],
  },
]
