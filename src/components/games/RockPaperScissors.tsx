import React, { useState, useCallback } from "react";
import { Box, Typography, Button } from "@mui/material";
import "./RockPaperScissors.less";

type Choice = "rock" | "paper" | "scissors";
type Phase = "p1" | "p2" | "result";

const OPTIONS: { value: Choice; emoji: string; label: string }[] = [
  { value: "rock", emoji: "🪨", label: "Rock" },
  { value: "paper", emoji: "📄", label: "Paper" },
  { value: "scissors", emoji: "✂️", label: "Scissors" },
];

const BEATS: Record<Choice, Choice> = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

function getResult(p1: Choice, p2: Choice): "p1" | "p2" | "draw" {
  if (p1 === p2) return "draw";
  return BEATS[p1] === p2 ? "p1" : "p2";
}

export default function RockPaperScissors() {
  const [phase, setPhase] = useState<Phase>("p1");
  const [p1Choice, setP1Choice] = useState<Choice | null>(null);
  const [p2Choice, setP2Choice] = useState<Choice | null>(null);
  const [score, setScore] = useState({ p1: 0, p2: 0 });

  const handleP1 = useCallback((choice: Choice) => {
    setP1Choice(choice);
    setPhase("p2");
  }, []);

  const handleP2 = useCallback((choice: Choice) => {
    setP2Choice(choice);
    setPhase("result");
    const r = getResult(p1Choice!, choice);
    if (r === "p1") setScore((s) => ({ ...s, p1: s.p1 + 1 }));
    if (r === "p2") setScore((s) => ({ ...s, p2: s.p2 + 1 }));
  }, [p1Choice]);

  const reset = useCallback(() => {
    setPhase("p1");
    setP1Choice(null);
    setP2Choice(null);
  }, []);

  const result = phase === "result" && p1Choice && p2Choice ? getResult(p1Choice, p2Choice) : null;
  const resultText =
    result === "p1" ? "Player 1 wins! 🎉"
    : result === "p2" ? "Player 2 wins! 🎉"
    : result === "draw" ? "It's a draw! 🤝"
    : "";

  return (
    <Box>
      <Box className="rps-score-row">
        <Typography className="rps-score-text">P1: {score.p1}</Typography>
        <Typography className="rps-score-text">P2: {score.p2}</Typography>
      </Box>

      {phase === "p1" && (
        <Box>
          <Typography className="rps-prompt">Player 1, pick your move:</Typography>
          <Box className="rps-choices">
            {OPTIONS.map((o) => (
              <Box key={o.value} onClick={() => handleP1(o.value)} className="rps-choice rps-choice--p1">
                <Typography className="rps-choice__emoji">{o.emoji}</Typography>
                <Typography className="rps-choice__label">{o.label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {phase === "p2" && (
        <Box>
          <Box className="rps-p1-hidden">
            <Typography className="rps-p1-hidden__icon">🫥</Typography>
            <Typography className="rps-p1-hidden__text">Player 1 has chosen — hidden!</Typography>
          </Box>
          <Typography className="rps-prompt">Player 2, pick your move:</Typography>
          <Box className="rps-choices">
            {OPTIONS.map((o) => (
              <Box key={o.value} onClick={() => handleP2(o.value)} className="rps-choice rps-choice--p2">
                <Typography className="rps-choice__emoji">{o.emoji}</Typography>
                <Typography className="rps-choice__label">{o.label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {phase === "result" && p1Choice && p2Choice && (
        <Box>
          <Box className="rps-reveal">
            <Box className="rps-reveal__player">
              <Typography className="rps-reveal__emoji">
                {OPTIONS.find((o) => o.value === p1Choice)!.emoji}
              </Typography>
              <Typography className="rps-reveal__name">Player 1</Typography>
            </Box>
            <Typography className="rps-reveal__vs">vs</Typography>
            <Box className="rps-reveal__player">
              <Typography className="rps-reveal__emoji">
                {OPTIONS.find((o) => o.value === p2Choice)!.emoji}
              </Typography>
              <Typography className="rps-reveal__name">Player 2</Typography>
            </Box>
          </Box>

          <Typography className={`rps-result ${result === "draw" ? "rps-result--draw" : "rps-result--winner"}`}>
            {resultText}
          </Typography>

          <Button variant="outlined" onClick={reset} fullWidth>
            Play again ↺
          </Button>
        </Box>
      )}
    </Box>
  );
}
