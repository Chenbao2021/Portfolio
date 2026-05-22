import React, { useState, useCallback } from "react";
import { Box, Typography, Button } from "@mui/material";
import "./TicTacToe.less";

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
  for (const [a, b, c] of LINES) {
    const cells = [board[a], board[b], board[c]];
    if (cells.filter((x) => x === "O").length === 2 && cells.includes(null))
      return [a, b, c][cells.indexOf(null)];
  }
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

  const handleClick = useCallback((i: number) => {
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
  }, [playerTurn, board, winner]);

  const reset = useCallback(() => {
    setBoard(Array(9).fill(null));
    setPlayerTurn(true);
  }, []);

  const status = winner
    ? winner === "draw" ? "Draw! 🤝" : winner === "X" ? "You win! 🎉" : "CPU wins 🤖"
    : playerTurn ? "Your turn  (X)" : "CPU thinking...";

  return (
    <Box>
      <Box className="ttt-score-row">
        <Typography className="ttt-score-text">You: {score.you}</Typography>
        <Typography className="ttt-score-text">CPU: {score.cpu}</Typography>
      </Box>

      <Box className="ttt-grid">
        {board.map((cell, i) => {
          const cellClass = [
            "ttt-cell",
            cell === "X" ? "ttt-cell--x" : cell === "O" ? "ttt-cell--o" : "",
            !cell && !winner && playerTurn ? "ttt-cell--clickable" : "ttt-cell--disabled",
          ].filter(Boolean).join(" ");

          return (
            <Box key={i} onClick={() => handleClick(i)} className={cellClass}>
              <Typography
                className={`ttt-cell__symbol ${cell === "X" ? "ttt-cell__symbol--x" : "ttt-cell__symbol--o"}`}
              >
                {cell}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Typography className="ttt-status">{status}</Typography>

      {winner && (
        <Button variant="outlined" size="small" onClick={reset} fullWidth>
          Play again ↺
        </Button>
      )}
    </Box>
  );
}
