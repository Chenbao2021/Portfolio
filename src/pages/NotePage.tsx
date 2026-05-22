import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Box, Typography, Container, Button } from '@mui/material'

export default function NotePage() {
  const { slug } = useParams<{ slug: string }>()

  return (
    <Box sx={{ bgcolor: '#faf9f7', minHeight: '100vh', py: 10 }}>
      <Container maxWidth="md">
        <Button
          component={Link}
          to="/notes"
          variant="outlined"
          sx={{ mb: 4, borderColor: '#2d2d2d', color: '#2d2d2d', fontFamily: '"Caveat", cursive', fontSize: '1rem' }}
        >
          ← Back to notes
        </Button>

        <Box
          sx={{
            bgcolor: '#ffffff',
            border: '2px solid #2d2d2d',
            borderRadius: '4px 14px 10px 4px',
            boxShadow: '7px 7px 0 rgba(0,0,0,0.08)',
            p: { xs: 4, md: 6 },
          }}
        >
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2rem', md: '3rem' }, color: '#2d2d2d', mb: 2 }}
          >
            {slug}
          </Typography>
          <Typography sx={{ color: '#9ca3af', fontStyle: 'italic' }}>
            This note is not written yet — coming soon.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
