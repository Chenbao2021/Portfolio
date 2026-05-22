import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

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

  const handleP1 = (choice: Choice) => {
    setP1Choice(choice);
    setPhase("p2");
  };

  const handleP2 = (choice: Choice) => {
    setP2Choice(choice);
    setPhase("result");
    const r = getResult(p1Choice!, choice);
    if (r === "p1") setScore((s) => ({ ...s, p1: s.p1 + 1 }));
    if (r === "p2") setScore((s) => ({ ...s, p2: s.p2 + 1 }));
  };

  const reset = () => {
    setPhase("p1");
    setP1Choice(null);
    setP2Choice(null);
  };

  const result = phase === "result" && p1Choice && p2Choice ? getResult(p1Choice, p2Choice) : null;
  const resultText =
    result === "p1" ? "Player 1 wins! 🎉"
    : result === "p2" ? "Player 2 wins! 🎉"
    : result === "draw" ? "It's a draw! 🤝"
    : "";
  const resultColor =
    result === "draw" ? "#6b7280" : "#ca8a04";

  return (
    <Box>
      {/* Score */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography sx={{ fontFamily: '"Caveat", cursive', fontSize: "1rem", color: "#6b7280" }}>
          P1: {score.p1}
        </Typography>
        <Typography sx={{ fontFamily: '"Caveat", cursive', fontSize: "1rem", color: "#6b7280" }}>
          P2: {score.p2}
        </Typography>
      </Box>

      {/* Phase: Player 1 chooses */}
      {phase === "p1" && (
        <Box>
          <Typography
            sx={{
              fontFamily: '"Caveat", cursive',
              fontSize: "1.15rem",
              color: "#374151",
              textAlign: "center",
              mb: 2,
            }}
          >
            Player 1, pick your move:
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {OPTIONS.map((o) => (
              <Box
                key={o.value}
                onClick={() => handleP1(o.value)}
                sx={{
                  flex: 1,
                  textAlign: "center",
                  py: 1.5,
                  bgcolor: "#faf9f7",
                  border: "2px solid #2d2d2d",
                  borderRadius: "4px 10px 6px 4px",
                  cursor: "pointer",
                  boxShadow: "3px 3px 0 rgba(0,0,0,0.08)",
                  transition: "all 0.15s ease",
                  "&:hover": {
                    bgcolor: "#fef9c3",
                    transform: "translateY(-3px)",
                    boxShadow: "5px 5px 0 rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Typography sx={{ fontSize: "1.8rem" }}>{o.emoji}</Typography>
                <Typography sx={{ fontFamily: '"Caveat", cursive', fontSize: "0.85rem", color: "#6b7280" }}>
                  {o.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Phase: Player 2 chooses */}
      {phase === "p2" && (
        <Box>
          {/* P1 hidden confirmation */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
              mb: 2.5,
              p: 1.5,
              bgcolor: "#dcfce7",
              border: "1.5px solid #2d2d2d",
              borderRadius: "4px 10px 6px 4px",
              boxShadow: "2px 2px 0 rgba(0,0,0,0.07)",
            }}
          >
            <Typography sx={{ fontSize: "1.4rem" }}>🫥</Typography>
            <Typography
              sx={{ fontFamily: '"Caveat", cursive', fontSize: "1rem", color: "#166534" }}
            >
              Player 1 has chosen — hidden!
            </Typography>
          </Box>

          <Typography
            sx={{
              fontFamily: '"Caveat", cursive',
              fontSize: "1.15rem",
              color: "#374151",
              textAlign: "center",
              mb: 2,
            }}
          >
            Player 2, pick your move:
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {OPTIONS.map((o) => (
              <Box
                key={o.value}
                onClick={() => handleP2(o.value)}
                sx={{
                  flex: 1,
                  textAlign: "center",
                  py: 1.5,
                  bgcolor: "#faf9f7",
                  border: "2px solid #2d2d2d",
                  borderRadius: "4px 10px 6px 4px",
                  cursor: "pointer",
                  boxShadow: "3px 3px 0 rgba(0,0,0,0.08)",
                  transition: "all 0.15s ease",
                  "&:hover": {
                    bgcolor: "#dbeafe",
                    transform: "translateY(-3px)",
                    boxShadow: "5px 5px 0 rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Typography sx={{ fontSize: "1.8rem" }}>{o.emoji}</Typography>
                <Typography sx={{ fontFamily: '"Caveat", cursive', fontSize: "0.85rem", color: "#6b7280" }}>
                  {o.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Phase: Result */}
      {phase === "result" && p1Choice && p2Choice && (
        <Box>
          {/* Reveal */}
          <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center", mb: 2.5 }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ fontSize: "2.8rem" }}>
                {OPTIONS.find((o) => o.value === p1Choice)!.emoji}
              </Typography>
              <Typography sx={{ fontFamily: '"Caveat", cursive', fontSize: "1rem", color: "#6b7280" }}>
                Player 1
              </Typography>
            </Box>
            <Typography sx={{ fontFamily: '"Caveat", cursive', fontSize: "1.4rem", color: "#9ca3af" }}>
              vs
            </Typography>
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ fontSize: "2.8rem" }}>
                {OPTIONS.find((o) => o.value === p2Choice)!.emoji}
              </Typography>
              <Typography sx={{ fontFamily: '"Caveat", cursive', fontSize: "1rem", color: "#6b7280" }}>
                Player 2
              </Typography>
            </Box>
          </Box>

          <Typography
            sx={{
              fontFamily: '"Caveat", cursive',
              fontSize: "1.4rem",
              textAlign: "center",
              color: resultColor,
              mb: 2.5,
            }}
          >
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
