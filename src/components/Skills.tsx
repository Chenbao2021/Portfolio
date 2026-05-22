import React from 'react'
import { Box, Typography, Container, Chip } from '@mui/material'

interface Category {
  name: string
  icon: string
  bg: string
  borderRadius: string
  skills: string[]
}

const categories: Category[] = [
  {
    name: 'Frontend',
    icon: '🎨',
    bg: '#dbeafe',
    borderRadius: '4px 12px 8px 4px',
    skills: ['React', 'TypeScript', 'CSS', 'PWA', 'HTML / CSS', 'Vite'],
  },
  {
    name: 'Backend',
    icon: '⚙️',
    bg: '#dcfce7',
    borderRadius: '12px 4px 4px 12px',
    skills: ['C#', 'SQL Server', 'REST APIs', 'Node.js (learning)'],
  },
  {
    name: 'Cloud / Infra',
    icon: '☁️',
    bg: '#fce7f3',
    borderRadius: '4px 12px 8px 4px',
    skills: ['Azure', 'Terraform', 'CI/CD'],
  },
  {
    name: 'AI Tools',
    icon: '🤖',
    bg: '#fef9c3',
    borderRadius: '12px 4px 4px 12px',
    skills: ['Claude', 'ChatGPT', 'AI-assisted workflow', 'Prompt thinking'],
  },
  {
    name: 'Design / Thinking',
    icon: '✏️',
    bg: '#f3e8ff',
    borderRadius: '4px 12px 8px 4px',
    skills: ['UX Thinking', 'Component Design', 'Info Architecture', 'System Design (learning)'],
  },
  {
    name: 'Writing & Clarity',
    icon: '📝',
    bg: '#fff7ed',
    borderRadius: '12px 4px 4px 12px',
    skills: ['Technical Writing', 'Task Recaps', 'Documentation', 'Code Review'],
  },
]

export default function Skills() {
  return (
    <Box component="section" id="skills" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#f4f3ef' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 7 }}>
          <Box
            sx={{
              display: 'inline-block',
              bgcolor: '#2d2d2d',
              color: '#ffffff',
              px: 2,
              py: 0.4,
              borderRadius: '3px 7px 5px 2px',
              mb: 1.5,
              transform: 'rotate(-0.8deg)',
            }}
          >
            <Typography sx={{ fontFamily: '"Caveat", cursive', fontSize: '0.9rem', letterSpacing: '0.08em' }}>
              my toolbox
            </Typography>
          </Box>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.4rem', md: '3.5rem' }, color: '#2d2d2d' }}>
            Skills & Tools 🧰
          </Typography>
          <Typography variant="body1" sx={{ color: '#9ca3af', mt: 1, fontStyle: 'italic' }}>
            things I actually use, not things I put on a resumé and forgot about
          </Typography>
        </Box>

        {/* Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 3,
          }}
        >
          {categories.map(cat => (
            <Box
              key={cat.name}
              sx={{
                bgcolor: cat.bg,
                border: '2px solid #2d2d2d',
                borderRadius: cat.borderRadius,
                boxShadow: '4px 4px 0 rgba(0,0,0,0.1)',
                p: 3,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '6px 6px 0 rgba(0,0,0,0.14)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2.5 }}>
                <Typography sx={{ fontSize: '1.4rem' }}>{cat.icon}</Typography>
                <Typography
                  variant="h6"
                  sx={{ fontSize: '1.3rem', fontWeight: 700, color: '#2d2d2d' }}
                >
                  {cat.name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.9 }}>
                {cat.skills.map(skill => (
                  <Chip
                    key={skill}
                    label={skill}
                    size="small"
                    sx={{
                      bgcolor: '#ffffff',
                      border: '1.5px solid #2d2d2d',
                      borderRadius: '3px 7px 4px 3px',
                      boxShadow: '2px 2px 0 rgba(0,0,0,0.08)',
                      fontWeight: 600,
                      '&:hover': { bgcolor: '#f9fafb', transform: 'translateY(-1px)' },
                      transition: 'transform 0.15s ease',
                    }}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Footer note */}
        <Box
          sx={{
            mt: 5,
            p: 2.5,
            bgcolor: '#ffffff',
            border: '1.5px dashed #9ca3af',
            borderRadius: '3px 9px 6px 3px',
            maxWidth: 440,
            transform: 'rotate(0.4deg)',
          }}
        >
          <Typography sx={{ fontFamily: '"Caveat", cursive', fontSize: '1rem', color: '#9ca3af' }}>
            ✏️ Always adding to this list. Ask me about recent obsessions.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
