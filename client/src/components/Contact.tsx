import React, { JSX, useState } from "react";
import { Box, Typography, Container, Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { links } from "../data/contact";
import "./Contact.less";

const API_URL = import.meta.env.VITE_API_URL as string;

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

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Contact(): JSX.Element {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

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

        {/* Formulaire de contact direct */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          className="contact-form"
        >
          <Typography variant="h5" className="contact-form__title">
            {t("contact.form_title")}
          </Typography>

          <Box className="contact-form__fields">
            <TextField
              label={t("contact.field_name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              size="small"
              className="contact-form__input"
            />
            <TextField
              label={t("contact.field_email")}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              size="small"
              className="contact-form__input"
            />
            <TextField
              label={t("contact.field_message")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              fullWidth
              multiline
              rows={4}
              className="contact-form__input"
            />
          </Box>

          <Box className="contact-form__footer">
            <Button
              type="submit"
              variant="contained"
              disabled={status === "loading"}
              className="contact-form__btn"
            >
              {status === "loading"
                ? t("contact.btn_sending")
                : t("contact.btn_send")}
            </Button>

            {status === "success" && (
              <Typography className="contact-form__feedback contact-form__feedback--success">
                {t("contact.success")}
              </Typography>
            )}
            {status === "error" && (
              <Typography className="contact-form__feedback contact-form__feedback--error">
                {t("contact.error")}
              </Typography>
            )}
          </Box>
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
