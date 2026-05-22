import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

const EMOJIS = ["🍕", "🎸", "🌈", "🦊", "🍦", "🎲", "🌙", "⚡"];

function createDeck() {
  return [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);
}

export default function MemoryGame() {
  const [cards, setCards] = useState(createDeck);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const handleFlip = (i: number) => {
    if (locked || flipped.includes(i) || matched.has(i)) return;
    const next = [...flipped, i];
    setFlipped(next);

    if (next.length === 2) {
      setMoves((m) => m + 1);
      setLocked(true);
      if (cards[next[0]] === cards[next[1]]) {
        setMatched((m) => new Set([...m, next[0], next[1]]));
        setFlipped([]);
        setLocked(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setLocked(false);
        }, 900);
      }
    }
  };

  const reset = () => {
    setCards(createDeck());
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setLocked(false);
  };

  const isComplete = matched.size === cards.length;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
        <Typography sx={{ fontFamily: '"Caveat", cursive', fontSize: "1rem", color: "#6b7280" }}>
          Moves: {moves}
        </Typography>
        <Typography sx={{ fontFamily: '"Caveat", cursive', fontSize: "1rem", color: "#6b7280" }}>
          {matched.size / 2} / {EMOJIS.length} pairs
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0.8,
          mb: 1.5,
        }}
      >
        {cards.map((emoji, i) => {
          const isFlipped = flipped.includes(i) || matched.has(i);
          const isMatchedCard = matched.has(i);
          return (
            <Box
              key={i}
              onClick={() => handleFlip(i)}
              sx={{
                height: 54,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: isMatchedCard ? "#dcfce7" : isFlipped ? "#fef9c3" : "#2d2d2d",
                border: "2px solid #2d2d2d",
                borderRadius: "3px 8px 5px 3px",
                cursor: isFlipped ? "default" : "pointer",
                transition: "all 0.2s ease",
                "&:hover": !isFlipped
                  ? { bgcolor: "#4b4b4b", transform: "scale(1.04)" }
                  : {},
              }}
            >
              {isFlipped ? (
                <Typography sx={{ fontSize: "1.4rem" }}>{emoji}</Typography>
              ) : (
                <Typography
                  sx={{
                    fontFamily: '"Caveat", cursive',
                    fontSize: "1.1rem",
                    color: "#6b7280",
                  }}
                >
                  ?
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>

      {isComplete && (
        <Typography
          sx={{
            fontFamily: '"Caveat", cursive',
            fontSize: "1.05rem",
            color: "#ca8a04",
            textAlign: "center",
            mb: 1,
          }}
        >
          Done in {moves} moves! 🎉
        </Typography>
      )}

      <Button variant="outlined" size="small" onClick={reset} fullWidth>
        {isComplete ? "Play again ↺" : "Reset ↺"}
      </Button>
    </Box>
  );
}
