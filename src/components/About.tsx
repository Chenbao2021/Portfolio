import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { cards } from "../data/about";
import "./About.less";
import { JSX } from "@emotion/react/jsx-dev-runtime";

export default function About(): JSX.Element {
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
          {cards.map((card) => (
            <Box
              key={card.title}
              className={`about-card about-card--${card.colorKey}`}
            >
              <Box className="about-card__header">
                <Typography className="about-card__icon">
                  {card.icon}
                </Typography>
                <Typography
                  variant="h5"
                  className="about-card__title"
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
              "I'm not trying to look perfect. I'm trying to become clearer and
              more useful every year."
            </Typography>
            <Typography variant="caption" className="about-footnote__caption">
              — something I remind myself every Monday morning
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
