import React, { useState, useCallback, JSX } from "react";
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
import SectionHeader from "./SectionHeader";
import "./Games.less";

type GameId = "ttt" | "rps" | "mem";
type DialogView = "picker" | GameId;

interface GameConfig {
  id: GameId;
  title: string;
  icon: string;
  desc: string;
  colorKey: "yellow" | "blue" | "green";
  Component: React.ComponentType;
}

const games: GameConfig[] = [
  {
    id: "ttt",
    title: "Tic-Tac-Toe",
    icon: "⭕",
    desc: "You vs CPU — first to three in a row",
    colorKey: "yellow",
    Component: TicTacToe,
  },
  {
    id: "rps",
    title: "Rock Paper Scissors",
    icon: "✂️",
    desc: "2 players — hidden choices, then reveal",
    colorKey: "blue",
    Component: RockPaperScissors,
  },
  {
    id: "mem",
    title: "Memory",
    icon: "🃏",
    desc: "Flip cards and find all 8 pairs",
    colorKey: "green",
    Component: MemoryGame,
  },
];

const CloseIcon = (): JSX.Element => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <line
      x1="2"
      y1="2"
      x2="14"
      y2="14"
      stroke="#2d2d2d"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <line
      x1="14"
      y1="2"
      x2="2"
      y2="14"
      stroke="#2d2d2d"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

const BackIcon = (): JSX.Element => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M11 4 L6 9 L11 14"
      stroke="#2d2d2d"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Games(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<DialogView>("picker");

  const openPicker = useCallback(() => {
    setView("picker");
    setOpen(true);
  }, []);
  const openGame = useCallback((id: GameId) => {
    setView(id);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  const activeGame =
    view !== "picker" ? (games.find((g) => g.id === view) ?? null) : null;
  const isPicker = view === "picker";

  return (
    <Box component="section" id="game" className="games-section">
      <Container maxWidth="lg">
        <SectionHeader
          className="games-header"
          // badge="take a break"
          title="Game Space 🎮"
          subtitle="small games I built for fun — more coming"
        />

        <Box className="games-grid">
          {games.map((game) => (
            <Box
              key={game.id}
              onClick={() => openGame(game.id)}
              className={`games-card games-card--${game.colorKey}`}
            >
              <Box className="games-card__header">
                <Typography className="games-card__icon">
                  {game.icon}
                </Typography>
                <Typography variant="h5" className="games-card__title">
                  {game.title}
                </Typography>
              </Box>
              <Typography className="games-card__desc">{game.desc}</Typography>
              <Typography className="games-card__cta">
                click to play →
              </Typography>
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
          className: `games-dialog-paper${activeGame ? ` games-dialog--${activeGame.colorKey}` : ""}`,
        }}
      >
        <Box className="games-dialog-header">
          {!isPicker && (
            <IconButton
              onClick={openPicker}
              size="small"
              className="games-dialog-back-btn"
            >
              <BackIcon />
            </IconButton>
          )}
          <Typography className="games-dialog-title">
            {isPicker
              ? "🎮 Choose a game"
              : `${activeGame?.icon} ${activeGame?.title}`}
          </Typography>
          <IconButton
            onClick={close}
            size="small"
            className="games-dialog-close-btn"
          >
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
                  className={`games-picker-item games-picker-item--${game.colorKey}`}
                >
                  <Typography className="games-picker-item__icon">
                    {game.icon}
                  </Typography>
                  <Box>
                    <Typography className="games-picker-item__title">
                      {game.title}
                    </Typography>
                    <Typography className="games-picker-item__desc">
                      {game.desc}
                    </Typography>
                  </Box>
                  <Typography className="games-picker-item__arrow">
                    →
                  </Typography>
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
