import React from 'react'
import { Box, Typography, Container } from '@mui/material'
import './WorkPhilosophy.less'

const principles = [
  { emoji: '🎯', rule: 'Clarity over cleverness.', note: 'Smart code that no one can read is not smart code.' },
  { emoji: '📝', rule: 'Write notes so future me doesn\'t suffer.', note: 'Documentation is a love letter to your future self.' },
  { emoji: '🌱', rule: 'Prefer simple systems that can grow.', note: "You don't need to solve next year's problem today." },
  { emoji: '❓', rule: 'Good questions are part of good engineering.', note: 'The right question saves more time than the fastest code.' },
  { emoji: '🔄', rule: 'Iterate; don\'t over-plan.', note: 'Ship something. Learn from it. Adjust. Repeat.' },
  { emoji: '🤝', rule: 'Code is communication.', note: "You're writing for humans first, machines second." },
]

export default function WorkPhilosophy() {
  return (
    <Box component="section" id="philosophy" className="philosophy-section">
      <Container maxWidth="lg">
        <Box className="philosophy-grid">
          {/* ── Left ── */}
          <Box>
            <Typography variant="h2" className="philosophy-title">
              How I Work
            </Typography>
            <Typography variant="body1" className="philosophy-intro">
              A few principles I try to live by — not because I always succeed,
              but because they keep me honest and moving in the right direction.
            </Typography>

            <Box className="philosophy-blackboard">
              <Box className="philosophy-blackboard__dots">
                <Box className="philosophy-blackboard__dot philosophy-blackboard__dot--red" />
                <Box className="philosophy-blackboard__dot philosophy-blackboard__dot--amber" />
                <Box className="philosophy-blackboard__dot philosophy-blackboard__dot--green" />
              </Box>

              <Typography className="philosophy-blackboard__quote">
                "The best code I've written<br/>
                is the code I didn't write."
              </Typography>
              <Typography className="philosophy-blackboard__attribution">
                — something I learned the hard way
              </Typography>

              <Box aria-hidden className="philosophy-blackboard__chalk">
                <Box className="philosophy-blackboard__chalk-line" />
                <Box className="philosophy-blackboard__chalk-line" />
                <Box className="philosophy-blackboard__chalk-line" />
              </Box>
            </Box>

            <Box className="philosophy-sticky">
              <Typography className="philosophy-sticky__text">
                📌 measure twice, cut once.<br/>
                (also: read the error message)
              </Typography>
            </Box>
          </Box>

          {/* ── Right ── */}
          <Box className="philosophy-principles">
            {principles.map((p) => (
              <Box key={p.rule} className="philosophy-principle">
                <Typography className="philosophy-principle__emoji">{p.emoji}</Typography>
                <Box>
                  <Typography className="philosophy-principle__rule">{p.rule}</Typography>
                  <Typography variant="body2" className="philosophy-principle__note">{p.note}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
