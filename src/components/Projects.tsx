import React from 'react'
import { Box, Typography, Container, Chip, Button, Stack } from '@mui/material'

interface Project {
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

const projects: Project[] = [
  {
    name: 'Batch Renamer CLI',
    tagline: 'File renaming that doesn\'t make you want to rage-quit',
    why: 'Had 300 files to rename manually. Refused to do it the boring way.',
    lesson: 'Learned more about Node.js streams and regex edge cases than I expected — and honestly, I\'m glad I did.',
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
    why: 'Tired of reading long articles to discover they weren\'t useful.',
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

export default function Projects() {
  return (
    <Box component="section" id="projects" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#faf9f7' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 7 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.4rem', md: '3.5rem' }, color: '#2d2d2d' }}>
            Projects 📌
          </Typography>
          <Typography variant="body1" sx={{ color: '#9ca3af', mt: 0.5, fontStyle: 'italic' }}>
            things I actually finished (and a few I'm still tweaking)
          </Typography>
        </Box>

        {/* Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
          }}
        >
          {projects.map(project => (
            <Box
              key={project.name}
              sx={{
                bgcolor: '#ffffff',
                border: '2px solid #2d2d2d',
                borderRadius: '4px 14px 10px 4px',
                boxShadow: '5px 5px 0 rgba(0,0,0,0.1)',
                overflow: 'hidden',
                transform: `rotate(${project.rotation})`,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'rotate(0deg) translateY(-5px)',
                  boxShadow: '8px 8px 0 rgba(0,0,0,0.12)',
                },
              }}
            >
              {/* Accent strip */}
              <Box
                sx={{
                  bgcolor: project.accent,
                  borderBottom: '2px solid #2d2d2d',
                  px: 3,
                  py: 2.5,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.5,
                }}
              >
                <Typography sx={{ fontSize: '2rem', lineHeight: 1.2, mt: 0.2 }}>{project.emoji}</Typography>
                <Box>
                  <Typography variant="h5" sx={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.2 }}>
                    {project.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', mt: 0.3, fontSize: '0.88rem' }}>
                    {project.tagline}
                  </Typography>
                </Box>
              </Box>

              {/* Body */}
              <Box sx={{ p: 3 }}>
                {/* Why */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', fontSize: '0.68rem', textTransform: 'uppercase' }}>
                    Why I built it
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5, color: '#374151', lineHeight: 1.65 }}>
                    {project.why}
                  </Typography>
                </Box>

                {/* Lesson */}
                <Box
                  sx={{
                    bgcolor: '#fef9c3',
                    border: '1.5px solid #fde047',
                    borderRadius: '2px 8px 5px 2px',
                    p: 1.8,
                    mb: 2.5,
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#78350f', fontSize: '0.68rem', display: 'block', mb: 0.5 }}>
                    💡 Lesson learned
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.88rem', lineHeight: 1.55 }}>
                    {project.lesson}
                  </Typography>
                </Box>

                {/* Tech */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 700, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Stack
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mt: 0.8 }}>
                    {project.tech.map(t => (
                      <Chip
                        key={t}
                        label={t}
                        size="small"
                        sx={{
                          bgcolor: '#f3f4f6',
                          border: '1.5px solid #d1d5db',
                          borderRadius: '3px 6px 3px 6px',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Role */}
                <Typography variant="caption" sx={{ color: '#9ca3af', fontStyle: 'italic', display: 'block', mb: 2.5 }}>
                  My role: {project.role}
                </Typography>

                {/* Buttons */}
                <Stack direction="row" spacing={1.5}>
                  {project.github && (
                    <Button
                      variant="outlined"
                      size="small"
                      href={project.github}
                      sx={{ fontSize: '0.82rem', px: 2, py: 0.6, bgcolor: '#fff', borderColor: '#2d2d2d', color: '#2d2d2d' }}
                    >
                      GitHub →
                    </Button>
                  )}
                  {project.demo && (
                    <Button
                      variant="contained"
                      size="small"
                      href={project.demo}
                      sx={{ fontSize: '0.82rem', px: 2, py: 0.6, bgcolor: '#2d2d2d', color: '#fff', '&:hover': { bgcolor: '#1a1a1a' } }}
                    >
                      Live Demo ↗
                    </Button>
                  )}
                </Stack>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
