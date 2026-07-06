import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Box, Typography, Container, Button } from '@mui/material'
import './NotePage.less'

export default function NotePage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>()

  return (
    <Box className="note-page">
      <Container maxWidth="md">
        <Button
          component={Link}
          to="/notes"
          variant="outlined"
          className="note-back-btn"
        >
          ← Back to notes
        </Button>

        <Box className="note-card">
          <Typography variant="h2" className="note-title">
            {slug}
          </Typography>
          <Typography className="note-placeholder">
            This note is not written yet — coming soon.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
