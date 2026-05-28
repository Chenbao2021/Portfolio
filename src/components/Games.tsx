import React, { useState, useCallback, JSX } from "react";
import {
  Box,
  Typography,
  Container,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import TicTacToe from "./games/TicTacToe";
import RockPaperScissors from "./games/RockPaperScissors";
import MemoryGame from "./games/MemoryGame";
import WordGuess from "./games/WordGuess";
import SectionHeader from "./SectionHeader";
import "./Games.less";

type GameId = "ttt" | "rps" | "mem" | "wg";
type DialogView = "picker" | GameId;

interface GameConfig {
  id: GameId;
  icon: string;
  colorKey: "yellow" | "blue" | "green" | "purple";
  Component: React.ComponentType;
}

const GAME_CONFIGS: GameConfig[] = [
  { id: "ttt", icon: "⭕", colorKey: "yellow", Component: TicTacToe },
  { id: "rps", icon: "✂️", colorKey: "blue",   Component: RockPaperScissors },
  { id: "mem", icon: "🃏", colorKey: "green",  Component: MemoryGame },
  { id: "wg",  icon: "🔤", colorKey: "purple", Component: WordGuess },
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
  const { t } = useTranslation();

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
    view !== "picker" ? (GAME_CONFIGS.find((g) => g.id === view) ?? null) : null;
  const isPicker = view === "picker";

  return (
    <Box component="section" id="game" className="games-section">
      <Container maxWidth="lg">
        <SectionHeader
          className="games-header"
          title={t("games.title")}
          subtitle={t("games.subtitle")}
        />

        <Box className="games-grid">
          {GAME_CONFIGS.map((game) => (
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
                  {t(`games.${game.id}.title`)}
                </Typography>
              </Box>
              <Typography className="games-card__desc">
                {t(`games.${game.id}.desc`)}
              </Typography>
              <Typography className="games-card__cta">
                {t("games.click_to_play")}
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
              ? t("games.choose_game")
              : `${activeGame?.icon} ${t(`games.${activeGame?.id}.title`)}`}
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
              {GAME_CONFIGS.map((game) => (
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
                      {t(`games.${game.id}.title`)}
                    </Typography>
                    <Typography className="games-picker-item__desc">
                      {t(`games.${game.id}.desc`)}
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
