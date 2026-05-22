import React from 'react'
import { Box, Typography, Container } from '@mui/material'

const ConnectorLine = () => (
  <svg width="40" height="20" viewBox="0 0 40 20" fill="none" style={{ display: 'block', margin: '0 auto' }}>
    <path d="M20 2 L20 18" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round"/>
    <path d="M14 12 L20 18 L26 12" stroke="#d1d5db" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function LearningNotes() {
  return (
    <Box component="section" id="notes" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#f4f3ef' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 7 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.4rem', md: '3.5rem' }, color: '#2d2d2d', mb: 1 }}>
            🧠 Thinking Board
          </Typography>
          <Typography variant="body1" sx={{ color: '#9ca3af', fontStyle: 'italic' }}>
            notes to self, questions I'm chasing, things that recently clicked
          </Typography>
        </Box>

        {/* Main board */}
        <Box
          sx={{
            bgcolor: '#ffffff',
            border: '2px solid #2d2d2d',
            borderRadius: '6px 14px 10px 6px',
            boxShadow: '7px 7px 0 rgba(0,0,0,0.08)',
            p: { xs: 3, md: 5 },
            position: 'relative',
          }}
        >
          {/* Board label tab */}
          <Box
            sx={{
              position: 'absolute',
              top: -16,
              left: 24,
              bgcolor: '#2d2d2d',
              color: '#ffffff',
              px: 2.5,
              py: 0.5,
              borderRadius: '4px 8px 4px 4px',
            }}
          >
            <Typography sx={{ fontFamily: '"Caveat", cursive', fontSize: '0.9rem', letterSpacing: '0.05em' }}>
              brainstorm / ongoing
            </Typography>
          </Box>

          {/* Three-column layout */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
              gap: 3,
              mt: 2,
            }}
          >
            {/* ── Column 1: Exploring ── */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box
                sx={{
                  bgcolor: '#dbeafe',
                  border: '2px solid #2d2d2d',
                  borderRadius: '4px 10px 8px 4px',
                  p: 2.5,
                  boxShadow: '3px 3px 0 rgba(0,0,0,0.09)',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: '1.15rem', mb: 2, borderBottom: '1.5px solid #93c5fd', pb: 0.8 }}
                >
                  🔭 Currently exploring
                </Typography>
                {[
                  'Cloud infra (making it less scary)',
                  'Better system design patterns',
                  'How LLMs handle context windows',
                  'Writing cleaner abstractions',
                  'Why some codebases feel "good"',
                ].map(item => (
                  <Box key={item} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'flex-start' }}>
                    <Typography sx={{ color: '#60a5fa', fontWeight: 700, flexShrink: 0 }}>→</Typography>
                    <Typography variant="body2" sx={{ color: '#374151', lineHeight: 1.55, fontSize: '0.88rem' }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Small sticky */}
              <Box
                sx={{
                  bgcolor: '#fef9c3',
                  border: '1.5px solid #2d2d2d',
                  borderRadius: '2px 8px 5px 2px',
                  p: 2,
                  boxShadow: '3px 3px 0 rgba(0,0,0,0.08)',
                  transform: 'rotate(-2.2deg)',
                }}
              >
                <Typography sx={{ fontFamily: '"Caveat", cursive', fontSize: '1rem', color: '#374151', lineHeight: 1.5 }}>
                  "Understanding beats memorizing. Every single time."
                </Typography>
              </Box>
            </Box>

            {/* ── Column 2: Questions ── */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box
                sx={{
                  bgcolor: '#fce7f3',
                  border: '2px solid #2d2d2d',
                  borderRadius: '10px 4px 4px 10px',
                  p: 2.5,
                  boxShadow: '3px 3px 0 rgba(0,0,0,0.09)',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: '1.15rem', mb: 2, borderBottom: '1.5px solid #f9a8d4', pb: 0.8 }}
                >
                  ❓ Questions I'm chasing
                </Typography>
                {[
                  'When is abstraction helpful vs. just clever?',
                  'How do you build software that ages well?',
                  'What makes a codebase a joy to work in?',
                  'Is "good enough" ever actually good enough?',
                ].map(q => (
                  <Box key={q} sx={{ display: 'flex', gap: 1, mb: 1.5, alignItems: 'flex-start' }}>
                    <Typography sx={{ color: '#f472b6', fontWeight: 700, flexShrink: 0 }}>?</Typography>
                    <Typography variant="body2" sx={{ color: '#374151', lineHeight: 1.55, fontSize: '0.88rem', fontStyle: 'italic' }}>
                      {q}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Process flows */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {[
                  { text: 'Read → try → break → fix → repeat', bg: '#dcfce7' },
                  { text: 'Ask → explore → document → share', bg: '#fff7ed' },
                ].map(flow => (
                  <Box
                    key={flow.text}
                    sx={{
                      bgcolor: flow.bg,
                      border: '1.5px solid #2d2d2d',
                      borderRadius: '3px 8px 5px 3px',
                      p: 1.5,
                      boxShadow: '2px 2px 0 rgba(0,0,0,0.08)',
                    }}
                  >
                    <Typography sx={{ fontFamily: '"Caveat", cursive', fontSize: '1rem', color: '#374151' }}>
                      {flow.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* ── Column 3: Mistakes ── */}
            <Box>
              <Box
                sx={{
                  bgcolor: '#dcfce7',
                  border: '2px solid #2d2d2d',
                  borderRadius: '4px 4px 12px 4px',
                  p: 2.5,
                  boxShadow: '3px 3px 0 rgba(0,0,0,0.09)',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: '1.15rem', mb: 2, borderBottom: '1.5px solid #86efac', pb: 0.8 }}
                >
                  🐛 Mistakes that taught me
                </Typography>
                {[
                  { bad: 'Pushed to prod on a Friday', learned: 'Never. Again.' },
                  { bad: 'Skipped documentation', learned: 'Suffered 3 months later. Documented everything after.' },
                  { bad: 'Over-engineered a simple feature', learned: 'YAGNI is real wisdom, not just a meme.' },
                  { bad: 'Didn\'t write any tests', learned: 'Now I write them second. Improvement.' },
                ].map(({ bad, learned }) => (
                  <Box key={bad} sx={{ mb: 2, pb: 1.5, borderBottom: '1px dashed #86efac', '&:last-child': { borderBottom: 'none', mb: 0, pb: 0 } }}>
                    <Typography variant="body2" sx={{ color: '#dc2626', fontSize: '0.82rem', fontWeight: 700 }}>
                      ✗ {bad}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.82rem', mt: 0.3 }}>
                      → {learned}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Bottom bar — Recent wins */}
          <Box
            sx={{
              mt: 4,
              pt: 4,
              borderTop: '2px dashed #e5e7eb',
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Caveat", cursive',
                fontSize: '1rem',
                color: '#9ca3af',
                mb: 2,
              }}
            >
              ⭐ recently learned / recently clicked:
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
                gap: 2,
              }}
            >
              {[
                '🎯 How React reconciliation actually works (finally)',
                '📦 Proper Docker layer caching saves so much CI time',
                '✍️ Writing for clarity makes you think more clearly',
              ].map(win => (
                <Box
                  key={win}
                  sx={{
                    bgcolor: '#faf9f7',
                    border: '1.5px solid #e5e7eb',
                    borderRadius: '3px 9px 6px 3px',
                    p: 2,
                    boxShadow: '2px 2px 0 rgba(0,0,0,0.06)',
                    transition: 'transform 0.15s ease',
                    '&:hover': { transform: 'translateY(-2px)' },
                  }}
                >
                  <Typography variant="body2" sx={{ color: '#374151', fontSize: '0.9rem', lineHeight: 1.55 }}>
                    {win}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
