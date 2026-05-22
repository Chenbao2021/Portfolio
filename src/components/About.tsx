import React from 'react'
import { Box, Typography, Container } from '@mui/material'

interface Card {
  title: string
  icon: string
  body: string
  bg: string
  rotation: string
  accentBorder: string
}

const cards: Card[] = [
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

export default function About() {
  return (
    <Box component="section" id="about" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#faf9f7' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 7 }}>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2.4rem', md: '3.5rem' }, color: '#2d2d2d', mb: 1 }}
          >
            About Me
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                height: 4,
                width: 56,
                bgcolor: '#fef08a',
                border: '1px solid #2d2d2d',
                borderRadius: 1,
              }}
            />
            <Typography variant="body1" sx={{ color: '#9ca3af', fontStyle: 'italic' }}>
              a few things worth knowing
            </Typography>
          </Box>
        </Box>

        {/* Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 3,
          }}
        >
          {cards.map(card => (
            <Box
              key={card.title}
              sx={{
                bgcolor: card.bg,
                border: '2px solid #2d2d2d',
                borderRadius: '4px 12px 8px 4px',
                boxShadow: '5px 5px 0 rgba(0,0,0,0.1)',
                p: 3.5,
                transform: `rotate(${card.rotation})`,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'rotate(0deg) translateY(-4px)',
                  boxShadow: '7px 7px 0 rgba(0,0,0,0.13)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Typography sx={{ fontSize: '1.5rem' }}>{card.icon}</Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: '1.45rem',
                    color: '#2d2d2d',
                    borderBottom: `2.5px solid ${card.accentBorder}`,
                    pb: 0.4,
                  }}
                >
                  {card.title}
                </Typography>
              </Box>
              <Typography sx={{ color: '#374151', lineHeight: 1.75, fontSize: '0.95rem' }}>
                {card.body}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Pinned footnote */}
        <Box
          sx={{
            mt: 5,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 2,
            p: 3,
            bgcolor: '#ffffff',
            border: '1.5px dashed #9ca3af',
            borderRadius: '4px 10px 6px 4px',
            maxWidth: 560,
          }}
        >
          <Typography sx={{ fontSize: '1.3rem', mt: 0.2 }}>📌</Typography>
          <Box>
            <Typography
              sx={{
                fontFamily: '"Caveat", cursive',
                fontSize: '1.15rem',
                color: '#374151',
                lineHeight: 1.6,
              }}
            >
              "I'm not trying to look perfect. I'm trying to become clearer and more useful every year."
            </Typography>
            <Typography variant="caption" sx={{ color: '#9ca3af', fontStyle: 'italic' }}>
              — something I remind myself every Monday morning
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
