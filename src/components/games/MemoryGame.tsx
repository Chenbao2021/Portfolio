import React, { useState, useCallback } from "react";
import { Box, Typography, Button } from "@mui/material";
import "./MemoryGame.less";

const EMOJIS = ["🍕", "🎸", "🌈", "🦊", "🍦", "🎲", "🌙", "⚡"];

function createDeck(): string[] {
  return [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);
}

export default function MemoryGame(): JSX.Element {
  const [cards, setCards] = useState(createDeck);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const handleFlip = useCallback((i: number) => {
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
  }, [locked, flipped, matched, cards]);

  const reset = useCallback(() => {
    setCards(createDeck());
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setLocked(false);
  }, []);

  const isComplete = matched.size === cards.length;

  return (
    <Box>
      <Box className="mem-score-row">
        <Typography className="mem-score-text">Moves: {moves}</Typography>
        <Typography className="mem-score-text">{matched.size / 2} / {EMOJIS.length} pairs</Typography>
      </Box>

      <Box className="mem-grid">
        {cards.map((emoji, i) => {
          const isFlipped = flipped.includes(i) || matched.has(i);
          const isMatchedCard = matched.has(i);

          const cardClass = [
            "mem-card",
            isMatchedCard ? "mem-card--matched" : isFlipped ? "mem-card--flipped" : "",
          ].filter(Boolean).join(" ");

          return (
            <Box key={i} onClick={() => handleFlip(i)} className={cardClass}>
              {isFlipped ? (
                <Typography className="mem-card__emoji">{emoji}</Typography>
              ) : (
                <Typography className="mem-card__back">?</Typography>
              )}
            </Box>
          );
        })}
      </Box>

      {isComplete && (
        <Typography className="mem-complete">Done in {moves} moves! 🎉</Typography>
      )}

      <Button variant="outlined" size="small" onClick={reset} fullWidth>
        {isComplete ? "Play again ↺" : "Reset ↺"}
      </Button>
    </Box>
  );
}
