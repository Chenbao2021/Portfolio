import React, { JSX, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import SectionHeader from "./SectionHeader";
import "./LearningNotes.less";

interface Mistake {
  bad: string;
  learned: string;
}

interface WinItem {
  title: string;
  details: {
    summary: string;
    points: string[];
    takeaway: string;
  };
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

const WIN_ITEMS: WinItem[] = [
  {
    title: "🎯 How React reconciliation actually works (finally)",
    details: {
      summary:
        "React doesn't re-render the whole DOM on every state change — it compares a virtual DOM tree with the previous one and only patches what changed.",
      points: [
        "The reconciler builds a 'fiber tree' — each node represents a component with its state, props, and work queue.",
        "Diffing is O(n) thanks to two heuristics: elements of different types produce different trees, and keys help identify stable list items across renders.",
        "Without a key (or with index as key), React re-creates list items when order changes — causing layout jumps and lost local state.",
        "Concurrent Mode (React 18) lets the reconciler pause, prioritize, and resume work — that's why transitions feel smoother.",
        "useTransition and useDeferredValue are direct hooks into this priority system.",
      ],
      takeaway:
        "Keys aren't just a lint rule. They're the contract React uses to decide whether to update or unmount+remount a component.",
    },
  },
  {
    title: "✍️ Writing for clarity makes you think more clearly",
    details: {
      summary:
        "Vague writing is a symptom of vague thinking. The act of writing forces you to surface assumptions and fill in gaps you didn't know existed.",
      points: [
        "If you can't explain it in one clear sentence, you probably don't fully understand it yet.",
        "Writing a design doc before coding exposes edge cases early — when they're cheap to fix.",
        "Active voice + short sentences reduce cognitive load for the reader and force precision in the author.",
        "The rubber-duck effect: writing to explain something to someone else reactivates your own understanding.",
        "Docs written right after solving a problem are the most accurate — delay and you lose the 'why' behind decisions.",
      ],
      takeaway:
        "Writing is thinking made visible. If the sentence is fuzzy, the idea behind it is too.",
    },
  },
];

export default function LearningNotes(): JSX.Element {
  const [selectedWin, setSelectedWin] = useState<WinItem | null>(null);

  return (
    <Box component="section" id="notes" className="notes-section">
      <Container maxWidth="lg">
        <SectionHeader
          className="notes-header"
          title="🧠 Thinking Board"
          subtitle="notes to self, questions I'm chasing, things that recently clicked"
        />

        <Box className="notes-board">
          <Box className="notes-board__tab">
            <Typography className="notes-board__tab-text">
              brainstorm / ongoing
            </Typography>
          </Box>

          <Box className="notes-columns">
            {/* ── Column 1: Exploring ── */}
            <Box className="notes-col-exploring">
              <Box className="notes-exploring">
                <Typography variant="h6" className="notes-exploring__title">
                  🔭 Currently exploring
                </Typography>
                {[
                  "How to create reusables agent skills",
                  "Improving productivity with AI",
                  "Writing cleaner abstractions",
                  'Why some codebases feel "good"',
                ].map((item) => (
                  <Box key={item} className="notes-exploring__item">
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
                  "Understanding beats memorizing. Every single time."
                </Typography>
              </Box>
            </Box>

            {/* ── Column 2: Questions ── */}
            <Box className="notes-col-questions">
              <Box className="notes-questions">
                <Typography variant="h6" className="notes-questions__title">
                  ❓ Questions I'm chasing
                </Typography>
                {[
                  "When is abstraction helpful vs. just clever?",
                  'Is "good enough" ever actually good enough?',
                ].map((q) => (
                  <Box key={q} className="notes-questions__item">
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
                    Read → try → break → fix → repeat
                  </Typography>
                </Box>
                <Box className="notes-flow notes-flow--ask">
                  <Typography className="notes-flow__text">
                    Ask → explore → document → share
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* ── Column 3: Mistakes ── */}
            <Box>
              <Box className="notes-mistakes">
                <Typography variant="h6" className="notes-mistakes__title">
                  🐛 Mistakes that taught me
                </Typography>
                {[
                  {
                    bad: "Pushed to prod on a Friday",
                    learned: "Never. Again.",
                  },
                  {
                    bad: "Skipped documentation",
                    learned:
                      "Suffered 3 months later. Documented everything after.",
                  },
                ].map(({ bad, learned }: Mistake) => (
                  <Box key={bad} className="notes-mistake">
                    <Typography variant="body2" className="notes-mistake__bad">
                      ✗ {bad}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="notes-mistake__learned"
                    >
                      → {learned}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <Box className="notes-recent">
            <Typography className="notes-recent__label">
              ⭐ recently learned / recently clicked:
            </Typography>
            <Box className="notes-wins-grid">
              {WIN_ITEMS.map((win) => (
                <Box key={win.title} className="notes-win">
                  <Typography variant="body2" className="notes-win__text">
                    {win.title}
                  </Typography>
                  <Box
                    component="button"
                    className="notes-win__expand-btn"
                    onClick={() => setSelectedWin(win)}
                  >
                    développer →
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>

      <Dialog
        open={selectedWin !== null}
        onClose={() => setSelectedWin(null)}
        maxWidth="sm"
        fullWidth
        disableScrollLock
        PaperProps={{ className: "notes-modal" }}
      >
        {selectedWin && (
          <DialogContent className="notes-modal__content">
            <IconButton
              onClick={() => setSelectedWin(null)}
              className="notes-modal__close"
              size="small"
            >
              ✕
            </IconButton>

            <Typography className="notes-modal__title">
              {selectedWin.title}
            </Typography>

            <Typography className="notes-modal__summary">
              {selectedWin.details.summary}
            </Typography>

            <Box className="notes-modal__points">
              {selectedWin.details.points.map((point, i) => (
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
                💡 {selectedWin.details.takeaway}
              </Typography>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
}
