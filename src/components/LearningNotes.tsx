import React, { JSX } from "react";
import { Box, Typography, Container } from "@mui/material";
import "./LearningNotes.less";

interface Mistake {
  bad: string;
  learned: string;
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
  return (
    <Box component="section" id="notes" className="notes-section">
      <Container maxWidth="lg">
        <Box className="notes-header">
          <Typography variant="h2" className="notes-title">
            🧠 Thinking Board
          </Typography>
          <Typography variant="body1" className="notes-subtitle">
            notes to self, questions I'm chasing, things that recently clicked
          </Typography>
        </Box>

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
                  "Cloud infra (making it less scary)",
                  "Better system design patterns",
                  "How LLMs handle context windows",
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
                  "How do you build software that ages well?",
                  "What makes a codebase a joy to work in?",
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
                  {
                    bad: "Over-engineered a simple feature",
                    learned: "YAGNI is real wisdom, not just a meme.",
                  },
                  {
                    bad: "Didn't write any tests",
                    learned: "Now I write them second. Improvement.",
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
              {[
                "🎯 How React reconciliation actually works (finally)",
                "📦 Proper Docker layer caching saves so much CI time",
                "✍️ Writing for clarity makes you think more clearly",
              ].map((win) => (
                <Box key={win} className="notes-win">
                  <Typography variant="body2" className="notes-win__text">
                    {win}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
