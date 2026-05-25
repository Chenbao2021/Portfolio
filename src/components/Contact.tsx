import React, { JSX } from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { links } from "../data/contact";
import "./Contact.less";

const WaveDoodle = (): JSX.Element => (
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

export default function Contact(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Box component="section" id="contact" className="contact-section">
      <Container maxWidth="lg">
        <Box className="contact-header">
          <Typography variant="h2" className="contact-title">
            {t("contact.title")}
          </Typography>

          <Box className="contact-quote-card">
            <Box aria-hidden className="contact-quote-card__pin" />
            <Typography className="contact-quote-card__text">
              {t("contact.quote")}
            </Typography>
            <Box className="contact-quote-card__footer">
              <WaveDoodle />
              <Typography
                variant="caption"
                className="contact-quote-card__caption"
              >
                {t("contact.caption")}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className="contact-cards-grid">
          {links.map((link) => (
            <Box
              key={link.key}
              className={`contact-card contact-card--${link.colorKey}`}
            >
              <Typography className="contact-card__icon">
                {link.icon}
              </Typography>
              <Typography variant="h6" className="contact-card__label">
                {t(`contact.links.${link.key}_label`)}
              </Typography>
              <Typography variant="body2" className="contact-card__handle">
                {link.handle}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                href={link.href}
                className="contact-card__btn"
              >
                {t(`contact.links.${link.key}_btn`)} →
              </Button>
            </Box>
          ))}
        </Box>

        <Box className="contact-footer">
          <Typography className="contact-footer__built">
            {t("contact.footer_built")}
          </Typography>
          <Typography variant="caption" className="contact-footer__copy">
            {t("contact.footer_copy")}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
