import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";

const links = [
  {
    label: "Email",
    handle: "yuchenbao2015@gmail.com",
    href: "mailto:yuchenbao2015@gmail.com",
    icon: "✉️",
    bg: "#fef9c3",
    btnText: "Send Email",
    borderRadius: "4px 12px 8px 4px",
  },
  {
    label: "GitHub",
    handle: "@yuchenbao",
    href: "#",
    icon: "🐙",
    bg: "#f3f4f6",
    btnText: "View GitHub",
    borderRadius: "12px 4px 4px 12px",
  },
  {
    label: "LinkedIn",
    handle: "in/yuchenbao",
    href: "https://www.linkedin.com/in/yuchenbao/",
    icon: "💼",
    bg: "#dbeafe",
    btnText: "Connect",
    borderRadius: "4px 12px 8px 4px",
  },
];

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
    <Box
      component="section"
      id="contact"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: "#f4f3ef" }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 7 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.4rem", md: "3.5rem" },
              color: "#2d2d2d",
              mb: 3,
            }}
          >
            Let's Talk 👋
          </Typography>

          {/* Quote card */}
          <Box
            sx={{
              display: "inline-block",
              bgcolor: "#ffffff",
              border: "2px solid #2d2d2d",
              borderRadius: "4px 14px 10px 4px",
              boxShadow: "5px 5px 0 rgba(0,0,0,0.09)",
              p: { xs: 3, md: 4 },
              maxWidth: 600,
              transform: "rotate(-0.5deg)",
              textAlign: "left",
              position: "relative",
            }}
          >
            {/* Pin */}
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                top: -10,
                right: 32,
                width: 16,
                height: 16,
                bgcolor: "#60a5fa",
                borderRadius: "50%",
                border: "1.5px solid #2d2d2d",
                boxShadow: "1px 1px 0 rgba(0,0,0,0.12)",
              }}
            />
            <Typography
              sx={{
                fontFamily: '"Caveat", cursive',
                fontSize: { xs: "1.2rem", md: "1.4rem" },
                color: "#374151",
                lineHeight: 1.65,
                mb: 1.5,
              }}
            >
              "Want to talk about code, projects, learning,
              <br />
              or why a bug took 3 hours but the fix was 3 lines?"
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <WaveDoodle />
              <Typography
                variant="caption"
                sx={{ color: "#9ca3af", fontStyle: "italic" }}
              >
                I'm always happy to chat.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Contact cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
            maxWidth: 840,
            mx: "auto",
          }}
        >
          {links.map((link) => (
            <Box
              key={link.label}
              sx={{
                bgcolor: link.bg,
                border: "2px solid #2d2d2d",
                borderRadius: link.borderRadius,
                boxShadow: "4px 4px 0 rgba(0,0,0,0.1)",
                p: 3.5,
                textAlign: "center",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "6px 6px 0 rgba(0,0,0,0.14)",
                },
              }}
            >
              <Typography sx={{ fontSize: "2.2rem", mb: 1.5 }}>
                {link.icon}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontSize: "1.35rem", fontWeight: 700, mb: 0.5 }}
              >
                {link.label}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#6b7280", mb: 2.5, fontSize: "0.88rem" }}
              >
                {link.handle}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                href={link.href}
                sx={{
                  fontSize: "0.85rem",
                  bgcolor: "#ffffff",
                  borderColor: "#2d2d2d",
                  color: "#2d2d2d",
                  width: "100%",
                  py: 0.8,
                }}
              >
                {link.btnText} →
              </Button>
            </Box>
          ))}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            mt: 10,
            pt: 5,
            borderTop: "2px dashed #d1d5db",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Caveat", cursive',
              fontSize: "1rem",
              color: "#9ca3af",
              mb: 0.5,
            }}
          >
            Built with React + TypeScript + Material UI · Designed like a
            whiteboard ✏️
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#d1d5db", display: "block" }}
          >
            © 2025 Chen Bao · All opinions are my own — all bugs are definitely
            someone else's fault
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
