import React from 'react'
import { Box, Typography, Container } from '@mui/material'

const principles = [
  {
    emoji: '🎯',
    rule: 'Clarity over cleverness.',
    note: 'Smart code that no one can read is not smart code.',
  },
  {
    emoji: '📝',
    rule: 'Write notes so future me doesn\'t suffer.',
    note: 'Documentation is a love letter to your future self.',
  },
  {
    emoji: '🌱',
    rule: 'Prefer simple systems that can grow.',
    note: "You don't need to solve next year's problem today.",
  },
  {
    emoji: '❓',
    rule: 'Good questions are part of good engineering.',
    note: 'The right question saves more time than the fastest code.',
  },
  {
    emoji: '🔄',
    rule: 'Iterate; don\'t over-plan.',
    note: 'Ship something. Learn from it. Adjust. Repeat.',
  },
  {
    emoji: '🤝',
    rule: 'Code is communication.',
    note: "You're writing for humans first, machines second.",
  },
]

export default function WorkPhilosophy() {
  return (
    <Box component="section" id="philosophy" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#faf9f7' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 6, md: 8 },
            alignItems: 'start',
          }}
        >
          {/* ── Left: header + blackboard quote ── */}
          <Box>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.4rem', md: '3.5rem' }, color: '#2d2d2d', mb: 2 }}>
              How I Work
            </Typography>
            <Typography variant="body1" sx={{ color: '#6b7280', mb: 5, lineHeight: 1.8, maxWidth: 440 }}>
              A few principles I try to live by — not because I always succeed,
              but because they keep me honest and moving in the right direction.
            </Typography>

            {/* Blackboard / dark quote box */}
            <Box
              sx={{
                bgcolor: '#1e1e1e',
                border: '2px solid #2d2d2d',
                borderRadius: '4px 14px 10px 4px',
                boxShadow: '7px 7px 0 rgba(0,0,0,0.18)',
                p: { xs: 3, md: 4 },
                position: 'relative',
                transform: 'rotate(-0.5deg)',
              }}
            >
              {/* Traffic lights */}
              <Box sx={{ display: 'flex', gap: 0.8, mb: 2.5 }}>
                {['#ef4444', '#f59e0b', '#22c55e'].map(c => (
                  <Box key={c} sx={{ width: 11, height: 11, borderRadius: '50%', bgcolor: c }} />
                ))}
              </Box>

              <Typography
                sx={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: { xs: '1.4rem', md: '1.7rem' },
                  lineHeight: 1.55,
                  color: '#f1f5f9',
                  mb: 2.5,
                }}
              >
                "The best code I've written<br/>
                is the code I didn't write."
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Caveat", cursive',
                  color: '#6b7280',
                  fontSize: '1rem',
                }}
              >
                — something I learned the hard way
              </Typography>

              {/* Chalk lines decoration */}
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  bottom: 16, right: 16,
                  display: 'flex', flexDirection: 'column', gap: 0.6,
                }}
              >
                {[60, 40, 50].map((w, i) => (
                  <Box key={i} sx={{ height: 2, width: w, bgcolor: '#374151', borderRadius: 1 }} />
                ))}
              </Box>
            </Box>

            {/* Small sticky note */}
            <Box
              sx={{
                mt: 3,
                ml: 2,
                bgcolor: '#fef9c3',
                border: '1.5px solid #2d2d2d',
                borderRadius: '2px 8px 5px 2px',
                p: 2,
                boxShadow: '3px 3px 0 rgba(0,0,0,0.08)',
                maxWidth: 260,
                transform: 'rotate(1.5deg)',
              }}
            >
              <Typography sx={{ fontFamily: '"Caveat", cursive', fontSize: '1rem', color: '#374151', lineHeight: 1.5 }}>
                📌 measure twice, cut once.<br/>
                (also: read the error message)
              </Typography>
            </Box>
          </Box>

          {/* ── Right: principles list ── */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {principles.map((p, i) => (
              <Box
                key={p.rule}
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'flex-start',
                  bgcolor: '#ffffff',
                  border: '2px solid #2d2d2d',
                  borderRadius: i % 2 === 0 ? '4px 12px 8px 4px' : '12px 4px 4px 12px',
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.08)',
                  p: 2.5,
                  transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                  '&:hover': {
                    transform: 'translateX(5px)',
                    boxShadow: '6px 6px 0 rgba(0,0,0,0.11)',
                  },
                }}
              >
                <Typography sx={{ fontSize: '1.4rem', mt: 0.1, flexShrink: 0 }}>{p.emoji}</Typography>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: '"Caveat", cursive',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: '#2d2d2d',
                      lineHeight: 1.3,
                      mb: 0.4,
                    }}
                  >
                    {p.rule}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#9ca3af', fontStyle: 'italic', fontSize: '0.85rem' }}>
                    {p.note}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
