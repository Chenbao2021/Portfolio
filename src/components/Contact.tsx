import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import { links } from "../data/contact";
import "./Contact.less";

const WaveDoodle = () => (
  <svg width="80" height="16" viewBox="0 0 80 16" fill="none">
    <path
      d="M2 8 Q 12 2 22 8 Q 32 14 42 8 Q 52 2 62 8 Q 72 14 78 8"
      stroke="#d1d5db"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

export default function Contact() {
  return (
    <Box component="section" id="contact" className="contact-section">
      <Container maxWidth="lg">
        <Box className="contact-header">
          <Typography variant="h2" className="contact-title">
            Let's Talk 👋
          </Typography>

          <Box className="contact-quote-card">
            <Box aria-hidden className="contact-quote-card__pin" />
            <Typography className="contact-quote-card__text">
              "Want to talk about code, projects, learning,
              <br />
              or why a bug took 3 hours but the fix was 3 lines?"
            </Typography>
            <Box className="contact-quote-card__footer">
              <WaveDoodle />
              <Typography variant="caption" className="contact-quote-card__caption">
                I'm always happy to chat.
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className="contact-cards-grid">
          {links.map((link) => (
            <Box key={link.label} className="contact-card" sx={{ bgcolor: link.bg }}>
              <Typography className="contact-card__icon">{link.icon}</Typography>
              <Typography variant="h6" className="contact-card__label">{link.label}</Typography>
              <Typography variant="body2" className="contact-card__handle">{link.handle}</Typography>
              <Button
                variant="outlined"
                size="small"
                href={link.href}
                className="contact-card__btn"
              >
                {link.btnText} →
              </Button>
            </Box>
          ))}
        </Box>

        <Box className="contact-footer">
          <Typography className="contact-footer__built">
            Built with React + TypeScript + Material UI · Designed like a whiteboard ✏️
          </Typography>
          <Typography variant="caption" className="contact-footer__copy">
            © 2025 Chen Bao · All opinions are my own — all bugs are definitely someone else's fault
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
