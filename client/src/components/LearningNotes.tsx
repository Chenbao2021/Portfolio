import React, { JSX, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import SectionHeader from "./SectionHeader";
import "./LearningNotes.less";

interface Mistake {
  bad: string;
  learned: string;
}

interface WinItem {
  title: string;
  summary: string;
  points: string[];
  takeaway: string;
}

const ConnectorLine = (): JSX.Element => (
  <svg
    width="40"
    height="20"
    viewBox="0 0 40 20"
    fill="none"
    className="notes-connector"
  >
    <path
      d="M20 2 L20 18"
      stroke="#d1d5db"
      strokeWidth="1.5"
      strokeDasharray="3 2"
      strokeLinecap="round"
    />
    <path
      d="M14 12 L20 18 L26 12"
      stroke="#d1d5db"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function LearningNotes(): JSX.Element {
  const { t } = useTranslation();
  const [selectedWinIndex, setSelectedWinIndex] = useState<number | null>(null);

  const exploringItems = t("notes.exploring_items", { returnObjects: true }) as string[];
  const questions = t("notes.questions", { returnObjects: true }) as string[];
  const mistakes = t("notes.mistakes", { returnObjects: true }) as Mistake[];
  const winItems = t("notes.win_items", { returnObjects: true }) as WinItem[];
  const selectedWin = selectedWinIndex !== null ? winItems[selectedWinIndex] : null;

  return (
    <Box component="section" id="notes" className="notes-section">
      <Container maxWidth="lg">
        <SectionHeader
          className="notes-header"
          title={t("notes.title")}
          subtitle={t("notes.subtitle")}
        />

        <Box className="notes-board">
          <Box className="notes-board__tab">
            <Typography className="notes-board__tab-text">
              {t("notes.tab")}
            </Typography>
          </Box>

          <Box className="notes-columns">
            {/* ── Column 1: Exploring ── */}
            <Box className="notes-col-exploring">
              <Box className="notes-exploring">
                <Typography variant="h6" className="notes-exploring__title">
                  {t("notes.exploring_title")}
                </Typography>
                {exploringItems.map((item, i) => (
                  <Box key={i} className="notes-exploring__item">
                    <Typography className="notes-exploring__arrow">
                      →
                    </Typography>
                    <Typography
                      variant="body2"
                      className="notes-exploring__text"
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box className="notes-sticky">
                <Typography className="notes-sticky__text">
                  {t("notes.sticky")}
                </Typography>
              </Box>
            </Box>

            {/* ── Column 2: Questions ── */}
            <Box className="notes-col-questions">
              <Box className="notes-questions">
                <Typography variant="h6" className="notes-questions__title">
                  {t("notes.questions_title")}
                </Typography>
                {questions.map((q, i) => (
                  <Box key={i} className="notes-questions__item">
                    <Typography className="notes-questions__mark">?</Typography>
                    <Typography
                      variant="body2"
                      className="notes-questions__text"
                    >
                      {q}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box className="notes-flows">
                <Box className="notes-flow notes-flow--read">
                  <Typography className="notes-flow__text">
                    {t("notes.flow_read")}
                  </Typography>
                </Box>
                <Box className="notes-flow notes-flow--ask">
                  <Typography className="notes-flow__text">
                    {t("notes.flow_ask")}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* ── Column 3: Mistakes ── */}
            <Box>
              <Box className="notes-mistakes">
                <Typography variant="h6" className="notes-mistakes__title">
                  {t("notes.mistakes_title")}
                </Typography>
                {mistakes.map((m, i) => (
                  <Box key={i} className="notes-mistake">
                    <Typography variant="body2" className="notes-mistake__bad">
                      ✗ {m.bad}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="notes-mistake__learned"
                    >
                      → {m.learned}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <Box className="notes-recent">
            <Typography className="notes-recent__label">
              {t("notes.recent_label")}
            </Typography>
            <Box className="notes-wins-grid">
              {winItems.map((win, i) => (
                <Box key={i} className="notes-win">
                  <Typography variant="body2" className="notes-win__text">
                    {win.title}
                  </Typography>
                  <Box
                    component="button"
                    className="notes-win__expand-btn"
                    onClick={() => setSelectedWinIndex(i)}
                  >
                    {t("notes.expand_btn")}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>

      <Dialog
        open={selectedWin !== null}
        onClose={() => setSelectedWinIndex(null)}
        maxWidth="sm"
        fullWidth
        disableScrollLock
        PaperProps={{ className: "notes-modal" }}
      >
        {selectedWin && (
          <DialogContent className="notes-modal__content">
            <IconButton
              onClick={() => setSelectedWinIndex(null)}
              className="notes-modal__close"
              size="small"
            >
              ✕
            </IconButton>

            <Typography className="notes-modal__title">
              {selectedWin.title}
            </Typography>

            <Typography className="notes-modal__summary">
              {selectedWin.summary}
            </Typography>

            <Box className="notes-modal__points">
              {selectedWin.points.map((point, i) => (
                <Box key={i} className="notes-modal__point">
                  <Typography className="notes-modal__point-bullet">
                    →
                  </Typography>
                  <Typography
                    variant="body2"
                    className="notes-modal__point-text"
                  >
                    {point}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box className="notes-modal__takeaway">
              <Typography className="notes-modal__takeaway-text">
                💡 {selectedWin.takeaway}
              </Typography>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
}
