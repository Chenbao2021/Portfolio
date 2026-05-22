import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

type Cell = "X" | "O" | null;

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function checkWinner(board: Cell[]): Cell | "draw" | null {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  if (board.every((c) => c !== null)) return "draw";
  return null;
}

function cpuMove(board: Cell[]): number {
  const empty = board.map((c, i) => (c === null ? i : -1)).filter((i) => i >= 0);
  // Try to win
  for (const [a, b, c] of LINES) {
    const cells = [board[a], board[b], board[c]];
    if (cells.filter((x) => x === "O").length === 2 && cells.includes(null))
      return [a, b, c][cells.indexOf(null)];
  }
  // Block player
  for (const [a, b, c] of LINES) {
    const cells = [board[a], board[b], board[c]];
    if (cells.filter((x) => x === "X").length === 2 && cells.includes(null))
      return [a, b, c][cells.indexOf(null)];
  }
  if (board[4] === null) return 4;
  return empty[Math.floor(Math.random() * empty.length)];
}

export default function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(true);
  const [score, setScore] = useState({ you: 0, cpu: 0 });

  const winner = checkWinner(board);

  const handleClick = (i: number) => {
    if (!playerTurn || board[i] || winner) return;
    const next = [...board];
    next[i] = "X";
    const w = checkWinner(next);
    setBoard(next);
    if (w) {
      if (w === "X") setScore((s) => ({ ...s, you: s.you + 1 }));
      return;
    }
    setPlayerTurn(false);
    setTimeout(() => {
      const next2 = [...next];
      next2[cpuMove(next)] = "O";
      setBoard(next2);
      const w2 = checkWinner(next2);
      if (w2 === "O") setScore((s) => ({ ...s, cpu: s.cpu + 1 }));
      setPlayerTurn(true);
    }, 350);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setPlayerTurn(true);
  };

  const status = winner
    ? winner === "draw" ? "Draw! 🤝" : winner === "X" ? "You win! 🎉" : "CPU wins 🤖"
    : playerTurn ? "Your turn  (X)" : "CPU thinking...";

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
        <Typography sx={{ fontFamily: '"Caveat", cursive', fontSize: "1rem", color: "#6b7280" }}>
          You: {score.you}
        </Typography>
        <Typography sx={{ fontFamily: '"Caveat", cursive', fontSize: "1rem", color: "#6b7280" }}>
          CPU: {score.cpu}
        </Typography>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, mb: 1.5 }}>
        {board.map((cell, i) => (
          <Box
            key={i}
            onClick={() => handleClick(i)}
            sx={{
              height: 60,
              display: "flex", alignItems: "center", justifyContent: "center",
              bgcolor: cell === "X" ? "#fef9c3" : cell === "O" ? "#dbeafe" : "#faf9f7",
              border: "2px solid #2d2d2d",
              borderRadius: "3px 8px 5px 3px",
              cursor: !cell && !winner && playerTurn ? "pointer" : "default",
              transition: "all 0.1s ease",
              "&:hover": !cell && !winner && playerTurn
                ? { bgcolor: "#f3f4f6", transform: "translateY(-2px)" }
                : {},
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Caveat", cursive',
                fontSize: "2rem",
                fontWeight: 700,
                color: cell === "X" ? "#ca8a04" : "#3b82f6",
              }}
            >
              {cell}
            </Typography>
          </Box>
        ))}
      </Box>

      <Typography
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1rem",
          color: "#6b7280",
          textAlign: "center",
          mb: 1,
        }}
      >
        {status}
      </Typography>

      {winner && (
        <Button variant="outlined" size="small" onClick={reset} fullWidth>
          Play again ↺
        </Button>
      )}
    </Box>
  );
}
