import React from 'react'
import { Box, Typography, Container, Chip } from '@mui/material'
import './Skills.less'

interface Category {
  name: string
  icon: string
  bg: string
  skills: string[]
}

const categories: Category[] = [
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

export default function Skills() {
  return (
    <Box component="section" id="skills" className="skills-section">
      <Container maxWidth="lg">
        <Box className="skills-header">
          <Box className="skills-header__badge">
            <Typography className="skills-header__badge-text">my toolbox</Typography>
          </Box>
          <Typography variant="h2" className="skills-title">
            Skills & Tools 🧰
          </Typography>
          <Typography variant="body1" className="skills-subtitle">
            things I actually use, not things I put on a resumé and forgot about
          </Typography>
        </Box>

        <Box className="skills-grid">
          {categories.map(cat => (
            <Box key={cat.name} className="skills-cat" sx={{ bgcolor: cat.bg }}>
              <Box className="skills-cat__header">
                <Typography className="skills-cat__icon">{cat.icon}</Typography>
                <Typography variant="h6" className="skills-cat__name">{cat.name}</Typography>
              </Box>
              <Box className="skills-cat__chips">
                {cat.skills.map(skill => (
                  <Chip
                    key={skill}
                    label={skill}
                    size="small"
                    className="skills-chip"
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Box className="skills-footer">
          <Typography className="skills-footer__text">
            ✏️ Always adding to this list. Ask me about recent obsessions.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
