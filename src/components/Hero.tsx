import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container, Stack } from "@mui/material";

const GameControllerDoodle = () => (
  <svg width="140" height="88" viewBox="0 0 140 88" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <path
      d="M28 28 Q 14 28 11 46 Q 8 62 20 74 Q 30 82 42 72 L 50 60 L 90 60 L 98 72 Q 110 82 120 74 Q 132 62 129 46 Q 126 28 112 28 Z"
      stroke="#2d2d2d" strokeWidth="2.2" fill="#f9fafb"
    />
    {/* D-pad horizontal */}
    <rect x="30" y="43" width="20" height="8" rx="2" fill="#e5e7eb" stroke="#2d2d2d" strokeWidth="1.5" />
    {/* D-pad vertical */}
    <rect x="36" y="37" width="8" height="20" rx="2" fill="#e5e7eb" stroke="#2d2d2d" strokeWidth="1.5" />
    {/* Buttons */}
    <circle cx="96" cy="40" r="5" fill="#fca5a5" stroke="#2d2d2d" strokeWidth="1.8" />
    <circle cx="108" cy="48" r="5" fill="#86efac" stroke="#2d2d2d" strokeWidth="1.8" />
    <circle cx="84" cy="48" r="5" fill="#93c5fd" stroke="#2d2d2d" strokeWidth="1.8" />
    <circle cx="96" cy="56" r="5" fill="#fde047" stroke="#2d2d2d" strokeWidth="1.8" />
    {/* Center start/select */}
    <rect x="59" y="42" width="9" height="6" rx="3" fill="#d1d5db" stroke="#2d2d2d" strokeWidth="1.3" />
    <rect x="72" y="42" width="9" height="6" rx="3" fill="#d1d5db" stroke="#2d2d2d" strokeWidth="1.3" />
    {/* Grips */}
    <ellipse cx="32" cy="68" rx="12" ry="8" fill="#f3f4f6" stroke="#2d2d2d" strokeWidth="1.8" />
    <ellipse cx="108" cy="68" rx="12" ry="8" fill="#f3f4f6" stroke="#2d2d2d" strokeWidth="1.8" />
  </svg>
);

const DoodleArrow = () => (
  <svg width="56" height="28" viewBox="0 0 56 28" fill="none">
    <path
      d="M2 14 Q 28 9 48 14"
      stroke="#9ca3af"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M40 7 L 50 14 L 40 21"
      stroke="#9ca3af"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StarDoodle = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path
      d="M11 2 L13 8 L19 8 L14 12 L16 18 L11 14 L6 18 L8 12 L3 8 L9 8 Z"
      stroke="#fde047"
      strokeWidth="1.8"
      fill="#fef9c3"
    />
  </svg>
);

export default function Hero() {
  const navigate = useNavigate();
  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        bgcolor: "#faf9f7",
        pt: 0,
        pb: 8,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot grid background — whiteboard feel */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, #c4c4c0 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.35,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
            gap: { xs: 6, md: 8 },
            alignItems: "center",
          }}
        >
          {/* ── Left column ── */}
          <Box>
            {/* Status badge */}
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                bgcolor: "#dcfce7",
                border: "1.5px solid #2d2d2d",
                borderRadius: "3px 8px 5px 2px",
                px: 2,
                py: 0.6,
                mb: 3,
                boxShadow: "2px 2px 0 rgba(0,0,0,0.1)",
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "#22c55e",
                  animation: "pulse 2s infinite",
                }}
              />
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, fontSize: "0.92rem", color: "#166534" }}
              >
                Open to opportunities
              </Typography>
            </Box>

            {/* Name */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "3.2rem", sm: "4.2rem", md: "5.2rem" },
                lineHeight: 1.1,
                mb: 2,
                color: "#2d2d2d",
              }}
            >
              Hey, I'm{" "}
              <Box
                component="span"
                sx={{
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: "-3px",
                    right: "-3px",
                    bottom: "6px",
                    height: "14px",
                    bgcolor: "#fef08a",
                    zIndex: -1,
                    borderRadius: "3px",
                  },
                }}
              >
                Chen
              </Box>{" "}
              👋
            </Typography>

            {/* Role line */}
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "1.4rem", md: "1.9rem" },
                color: "#6b7280",
                mb: 3,
                letterSpacing: "0.02em",
              }}
            >
              Developer → Builder → Learner
            </Typography>

            {/* Tagline card */}
            <Box
              sx={{
                bgcolor: "#ffffff",
                border: "2px solid #2d2d2d",
                borderRadius: "4px 12px 8px 4px",
                p: { xs: 2.5, md: 3 },
                mb: { xs: 6, md: 4 },
                boxShadow: "5px 5px 0 rgba(0,0,0,0.1)",
                transform: "rotate(-0.6deg)",
                maxWidth: 520,
                position: "relative",
              }}
            >
              {/* Pin */}
              <Box
                aria-hidden
                sx={{
                  position: "absolute",
                  top: -10,
                  left: 24,
                  width: 16,
                  height: 16,
                  bgcolor: "#ef4444",
                  borderRadius: "50%",
                  border: "1.5px solid #2d2d2d",
                  boxShadow: "1px 1px 0 rgba(0,0,0,0.15)",
                }}
              />
              <Typography
                sx={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: { xs: "1.4rem", md: "1.65rem" },
                  color: "#374151",
                  lineHeight: 1.6,
                }}
              >
                "I build things, break them, figure out why,
                <br />
                and write notes so future me doesn't suffer."
              </Typography>
              <Box
                sx={{ mt: 1.5, display: "flex", alignItems: "center", gap: 1 }}
              >
                <DoodleArrow />
                <Typography
                  variant="caption"
                  sx={{ color: "#9ca3af", fontStyle: "italic" }}
                >
                  still learning, always curious
                </Typography>
              </Box>
            </Box>

            {/* CTA buttons */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              flexWrap="wrap"
            >
              <Button
                variant="contained"
                onClick={() => navigate("/projects")}
                sx={{
                  bgcolor: "#2d2d2d",
                  color: "#fff",
                  px: 3,
                  py: 1.2,
                  "&:hover": { bgcolor: "#1a1a1a" },
                }}
              >
                View Projects ↓
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/notes")}
                sx={{
                  px: 3,
                  py: 1.2,
                  bgcolor: "#fef9c3",
                  borderColor: "#2d2d2d",
                  color: "#2d2d2d",
                }}
              >
                Read My Notes 📓
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/contact")}
                sx={{
                  px: 3,
                  py: 1.2,
                  bgcolor: "#dbeafe",
                  borderColor: "#2d2d2d",
                  color: "#2d2d2d",
                }}
              >
                Contact Me ✉️
              </Button>
            </Stack>
          </Box>

          {/* ── Right column — game space ── */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Box
              sx={{
                bgcolor: "#ffffff",
                border: "2px solid #2d2d2d",
                borderRadius: "6px 14px 10px 6px",
                boxShadow: "7px 7px 0 rgba(0,0,0,0.08)",
                p: 4,
                position: "relative",
              }}
            >
              {/* Board label */}
              <Typography
                sx={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: "1rem",
                  color: "#9ca3af",
                  mb: 3,
                  pb: 1,
                  borderBottom: "1.5px dashed #e5e7eb",
                }}
              >
                🎮 game space
              </Typography>

              {/* Controller doodle */}
              <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                <GameControllerDoodle />
              </Box>

              {/* Game slots — top row */}
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5, mb: 1.5 }}>
                {[
                  { id: "ttt", icon: "⭕", label: "Tic-Tac-Toe", bg: "#fef9c3" },
                  { id: "rps", icon: "✂️", label: "Rock Paper\nScissors", bg: "#dbeafe" },
                ].map((game) => (
                  <Box
                    key={game.id}
                    onClick={() => navigate("/games")}
                    sx={{
                      border: "1.5px solid #2d2d2d",
                      borderRadius: "4px 10px 6px 4px",
                      p: 1.5,
                      textAlign: "center",
                      bgcolor: game.bg,
                      cursor: "pointer",
                      boxShadow: "2px 2px 0 rgba(0,0,0,0.07)",
                      transition: "all 0.15s ease",
                      "&:hover": { transform: "translateY(-2px)", boxShadow: "4px 4px 0 rgba(0,0,0,0.1)" },
                    }}
                  >
                    <Typography sx={{ fontSize: "1.3rem", mb: 0.3 }}>{game.icon}</Typography>
                    <Typography
                      sx={{
                        fontFamily: '"Caveat", cursive',
                        fontSize: "0.88rem",
                        color: "#374151",
                        lineHeight: 1.3,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {game.label}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Game slot — bottom */}
              <Box
                onClick={() => navigate("/games")}
                sx={{
                  border: "1.5px solid #2d2d2d",
                  borderRadius: "4px 10px 6px 4px",
                  p: 1.5,
                  textAlign: "center",
                  bgcolor: "#dcfce7",
                  cursor: "pointer",
                  boxShadow: "2px 2px 0 rgba(0,0,0,0.07)",
                  transition: "all 0.15s ease",
                  "&:hover": { transform: "translateY(-2px)", boxShadow: "4px 4px 0 rgba(0,0,0,0.1)" },
                }}
              >
                <Typography sx={{ fontSize: "1.3rem", mb: 0.3 }}>🃏</Typography>
                <Typography
                  sx={{
                    fontFamily: '"Caveat", cursive',
                    fontSize: "0.88rem",
                    color: "#374151",
                  }}
                >
                  Memory
                </Typography>
              </Box>

              {/* Decorative star */}
              <Box sx={{ position: "absolute", top: 12, right: 14 }}>
                <StarDoodle />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
