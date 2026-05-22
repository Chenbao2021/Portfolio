import React, { JSX, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container, Stack } from "@mui/material";
import "./Hero.less";

const GameControllerDoodle = (): JSX.Element => (
  <svg
    width="140"
    height="88"
    viewBox="0 0 140 88"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M28 28 Q 14 28 11 46 Q 8 62 20 74 Q 30 82 42 72 L 50 60 L 90 60 L 98 72 Q 110 82 120 74 Q 132 62 129 46 Q 126 28 112 28 Z"
      stroke="#2d2d2d"
      strokeWidth="2.2"
      fill="#f9fafb"
    />
    <rect
      x="30"
      y="43"
      width="20"
      height="8"
      rx="2"
      fill="#e5e7eb"
      stroke="#2d2d2d"
      strokeWidth="1.5"
    />
    <rect
      x="36"
      y="37"
      width="8"
      height="20"
      rx="2"
      fill="#e5e7eb"
      stroke="#2d2d2d"
      strokeWidth="1.5"
    />
    <circle
      cx="96"
      cy="40"
      r="5"
      fill="#fca5a5"
      stroke="#2d2d2d"
      strokeWidth="1.8"
    />
    <circle
      cx="108"
      cy="48"
      r="5"
      fill="#86efac"
      stroke="#2d2d2d"
      strokeWidth="1.8"
    />
    <circle
      cx="84"
      cy="48"
      r="5"
      fill="#93c5fd"
      stroke="#2d2d2d"
      strokeWidth="1.8"
    />
    <circle
      cx="96"
      cy="56"
      r="5"
      fill="#fde047"
      stroke="#2d2d2d"
      strokeWidth="1.8"
    />
    <rect
      x="59"
      y="42"
      width="9"
      height="6"
      rx="3"
      fill="#d1d5db"
      stroke="#2d2d2d"
      strokeWidth="1.3"
    />
    <rect
      x="72"
      y="42"
      width="9"
      height="6"
      rx="3"
      fill="#d1d5db"
      stroke="#2d2d2d"
      strokeWidth="1.3"
    />
    <ellipse
      cx="32"
      cy="68"
      rx="12"
      ry="8"
      fill="#f3f4f6"
      stroke="#2d2d2d"
      strokeWidth="1.8"
    />
    <ellipse
      cx="108"
      cy="68"
      rx="12"
      ry="8"
      fill="#f3f4f6"
      stroke="#2d2d2d"
      strokeWidth="1.8"
    />
  </svg>
);

const DoodleArrow = (): JSX.Element => (
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

const StarDoodle = (): JSX.Element => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path
      d="M11 2 L13 8 L19 8 L14 12 L16 18 L11 14 L6 18 L8 12 L3 8 L9 8 Z"
      stroke="#fde047"
      strokeWidth="1.8"
      fill="#fef9c3"
    />
  </svg>
);

export default function Hero(): JSX.Element {
  const navigate = useNavigate();
  const createNavigateHandler = useCallback((path: string) => {
    return () => {
      navigate(path);
    };
  }, []);
  return (
    <Box component="section" className="hero-section">
      <Box aria-hidden className="hero-dot-grid" />

      <Container maxWidth="lg" className="hero-container">
        <Box className="hero-grid">
          {/* ── Left column ── */}
          <Box>
            <Box className="hero-badge">
              <Box className="hero-badge__dot" />
              <Typography variant="body2" className="hero-badge__text">
                Open to opportunities
              </Typography>
            </Box>

            <Typography variant="h1" className="hero-name">
              Hey, I'm{" "}
              <Box component="span" className="hero-name__highlight">
                Chen
              </Box>{" "}
              👋
            </Typography>

            <Typography variant="h3" className="hero-role">
              Developer → Builder → Learner
            </Typography>

            <Box className="hero-tagline">
              <Box aria-hidden className="hero-tagline__pin" />
              <Typography className="hero-tagline__text">
                "I build things, break them, figure out why,
                <br />
                and write notes so future me doesn't suffer."
              </Typography>
              <Box className="hero-tagline__footer">
                <DoodleArrow />
                <Typography variant="caption" className="hero-tagline__caption">
                  still learning, always curious
                </Typography>
              </Box>
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              flexWrap="wrap"
            >
              <Button
                variant="contained"
                onClick={createNavigateHandler("/projects")}
                className="hero-btn--projects"
              >
                View Projects ↓
              </Button>
              <Button
                variant="outlined"
                onClick={createNavigateHandler("/notes")}
                className="hero-btn--notes"
              >
                Read My Notes 📓
              </Button>
              <Button
                variant="outlined"
                onClick={createNavigateHandler("/contact")}
                className="hero-btn--contact"
              >
                Contact Me ✉️
              </Button>
            </Stack>
          </Box>

          {/* ── Right column ── */}
          <Box className="hero-right">
            <Box className="hero-game-board">
              <Typography className="hero-board-label">
                🎮 game space
              </Typography>

              <Box className="hero-controller">
                <GameControllerDoodle />
              </Box>

              <Box
                onClick={createNavigateHandler("/games")}
                className="hero-play-btn"
              >
                <Typography className="hero-play-btn__label">
                  ▶ ENTER GAME SPACE
                </Typography>
                <Typography className="hero-play-btn__sub">
                  3 games · click to play
                </Typography>
              </Box>

              <Box className="hero-star">
                <StarDoodle />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
