import React, { useState, useCallback } from "react";
import {
  Box,
  Typography,
  Container,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import TicTacToe from "./games/TicTacToe";
import RockPaperScissors from "./games/RockPaperScissors";
import MemoryGame from "./games/MemoryGame";
import "./Games.less";

type GameId = "ttt" | "rps" | "mem";
type DialogView = "picker" | GameId;

const games: {
  id: GameId;
  title: string;
  icon: string;
  desc: string;
  bg: string;
  accentBorder: string;
  rotation: string;
  Component: React.ComponentType;
}[] = [
  {
    id: "ttt",
    title: "Tic-Tac-Toe",
    icon: "⭕",
    desc: "You vs CPU — first to three in a row",
    bg: "#fef9c3",
    accentBorder: "#fde047",
    rotation: "-1deg",
    Component: TicTacToe,
  },
  {
    id: "rps",
    title: "Rock Paper Scissors",
    icon: "✂️",
    desc: "2 players — hidden choices, then reveal",
    bg: "#dbeafe",
    accentBorder: "#93c5fd",
    rotation: "0.8deg",
    Component: RockPaperScissors,
  },
  {
    id: "mem",
    title: "Memory",
    icon: "🃏",
    desc: "Flip cards and find all 8 pairs",
    bg: "#dcfce7",
    accentBorder: "#86efac",
    rotation: "-0.6deg",
    Component: MemoryGame,
  },
];

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <line x1="2" y1="2" x2="14" y2="14" stroke="#2d2d2d" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="14" y1="2" x2="2" y2="14" stroke="#2d2d2d" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M11 4 L6 9 L11 14" stroke="#2d2d2d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Games() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<DialogView>("picker");

  const openPicker = useCallback(() => { setView("picker"); setOpen(true); }, []);
  const openGame = useCallback((id: GameId) => { setView(id); setOpen(true); }, []);
  const close = useCallback(() => setOpen(false), []);

  const activeGame = view !== "picker" ? games.find((g) => g.id === view) ?? null : null;
  const isPicker = view === "picker";

  return (
    <Box component="section" id="game" className="games-section">
      <Container maxWidth="lg">
        <Box className="games-header">
          <Box className="games-header__badge">
            <Typography className="games-header__badge-text">take a break</Typography>
          </Box>
          <Typography variant="h2" className="games-title">
            Game Space 🎮
          </Typography>
          <Typography variant="body1" className="games-subtitle">
            small games I built for fun — more coming
          </Typography>
        </Box>

        <Box className="games-grid">
          {games.map((game) => (
            <Box
              key={game.id}
              onClick={() => openGame(game.id)}
              className="games-card"
              sx={{ bgcolor: game.bg, transform: `rotate(${game.rotation})` }}
            >
              <Box className="games-card__header">
                <Typography className="games-card__icon">{game.icon}</Typography>
                <Typography
                  variant="h5"
                  className="games-card__title"
                  sx={{ borderBottom: `2.5px solid ${game.accentBorder}` }}
                >
                  {game.title}
                </Typography>
              </Box>
              <Typography className="games-card__desc">{game.desc}</Typography>
              <Typography className="games-card__cta">click to play →</Typography>
            </Box>
          ))}
        </Box>
      </Container>

      <Dialog
        open={open}
        onClose={close}
        maxWidth={isPicker ? "sm" : "xs"}
        fullWidth
        PaperProps={{
          className: "games-dialog-paper",
          sx: { bgcolor: activeGame?.bg ?? "#ffffff" },
        }}
      >
        <Box className="games-dialog-header">
          {!isPicker && (
            <IconButton onClick={openPicker} size="small" className="games-dialog-back-btn">
              <BackIcon />
            </IconButton>
          )}
          <Typography className="games-dialog-title">
            {isPicker ? "🎮 Choose a game" : `${activeGame?.icon} ${activeGame?.title}`}
          </Typography>
          <IconButton onClick={close} size="small" className="games-dialog-close-btn">
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent className="games-dialog-content">
          {isPicker ? (
            <Box className="games-picker">
              {games.map((game) => (
                <Box
                  key={game.id}
                  onClick={() => setView(game.id)}
                  className="games-picker-item"
                  sx={{ bgcolor: game.bg }}
                >
                  <Typography className="games-picker-item__icon">{game.icon}</Typography>
                  <Box>
                    <Typography className="games-picker-item__title">{game.title}</Typography>
                    <Typography className="games-picker-item__desc">{game.desc}</Typography>
                  </Box>
                  <Typography className="games-picker-item__arrow">→</Typography>
                </Box>
              ))}
            </Box>
          ) : (
            activeGame && <activeGame.Component />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
