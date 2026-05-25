import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { cards } from "../data/about";
import "./About.less";
import { JSX } from "@emotion/react/jsx-dev-runtime";

export default function About(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Box component="section" id="about" className="about-section">
      <Container maxWidth="lg">
        <Box className="about-header">
          <Typography variant="h2" className="about-title">
            {t("about.title")}
          </Typography>
          <Box className="about-title-row">
            <Box className="about-title-bar" />
            <Typography variant="body1" className="about-subtitle">
              {t("about.subtitle")}
            </Typography>
          </Box>
        </Box>

        <Box className="about-grid">
          {cards.map((card) => (
            <Box
              key={card.key}
              className={`about-card about-card--${card.colorKey}`}
            >
              <Box className="about-card__header">
                <Typography className="about-card__icon">
                  {card.icon}
                </Typography>
                <Typography variant="h5" className="about-card__title">
                  {t(`about.cards.${card.key}.title`)}
                </Typography>
              </Box>
              <Typography className="about-card__body">
                {t(`about.cards.${card.key}.body`)}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box className="about-footnote">
          <Typography className="about-footnote__pin">📌</Typography>
          <Box>
            <Typography className="about-footnote__quote">
              {t("about.footnote_quote")}
            </Typography>
            <Typography variant="caption" className="about-footnote__caption">
              {t("about.footnote_caption")}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
