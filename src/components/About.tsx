import React from 'react'
import { Box, Typography, Container } from '@mui/material'
import './About.less'

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
    <Box component="section" id="about" className="about-section">
      <Container maxWidth="lg">
        <Box className="about-header">
          <Typography variant="h2" className="about-title">
            About Me
          </Typography>
          <Box className="about-title-row">
            <Box className="about-title-bar" />
            <Typography variant="body1" className="about-subtitle">
              a few things worth knowing
            </Typography>
          </Box>
        </Box>

        <Box className="about-grid">
          {cards.map(card => (
            <Box
              key={card.title}
              className="about-card"
              sx={{ bgcolor: card.bg, transform: `rotate(${card.rotation})` }}
            >
              <Box className="about-card__header">
                <Typography className="about-card__icon">{card.icon}</Typography>
                <Typography
                  variant="h5"
                  className="about-card__title"
                  sx={{ borderBottom: `2.5px solid ${card.accentBorder}` }}
                >
                  {card.title}
                </Typography>
              </Box>
              <Typography className="about-card__body">{card.body}</Typography>
            </Box>
          ))}
        </Box>

        <Box className="about-footnote">
          <Typography className="about-footnote__pin">📌</Typography>
          <Box>
            <Typography className="about-footnote__quote">
              "I'm not trying to look perfect. I'm trying to become clearer and more useful every year."
            </Typography>
            <Typography variant="caption" className="about-footnote__caption">
              — something I remind myself every Monday morning
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
