import React, { useState, useCallback } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import TicTacToe from "./games/TicTacToe";
import RockPaperScissors from "./games/RockPaperScissors";
import MemoryGame from "./games/MemoryGame";

type GameId = "ttt" | "rps" | "mem";
type DialogView = "picker" | GameId;

const games: {
  id: GameId;
  title: string;
  icon: string;
  desc: string;
  bg: string;
  accentBorder: string;
  borderRadius: string;
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
    borderRadius: "4px 12px 8px 4px",
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
    borderRadius: "12px 4px 4px 12px",
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
    borderRadius: "4px 12px 8px 4px",
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
    <Box
      component="section"
      id="game"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: "#f4f3ef" }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 7 }}>
          <Box
            sx={{
              display: "inline-block",
              bgcolor: "#2d2d2d",
              color: "#ffffff",
              px: 2,
              py: 0.4,
              borderRadius: "3px 7px 5px 2px",
              mb: 1.5,
              transform: "rotate(-0.8deg)",
            }}
          >
            <Typography
              sx={{ fontFamily: '"Caveat", cursive', fontSize: "0.9rem", letterSpacing: "0.08em" }}
            >
              take a break
            </Typography>
          </Box>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "2.4rem", md: "3.5rem" }, color: "#2d2d2d" }}
          >
            Game Space 🎮
          </Typography>
          <Typography variant="body1" sx={{ color: "#9ca3af", mt: 1, fontStyle: "italic" }}>
            small games I built for fun — more coming
          </Typography>
        </Box>

        {/* Game cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
            gap: 3,
          }}
        >
          {games.map((game) => (
            <Box
              key={game.id}
              onClick={() => openGame(game.id)}
              sx={{
                bgcolor: game.bg,
                border: "2px solid #2d2d2d",
                borderRadius: game.borderRadius,
                boxShadow: "5px 5px 0 rgba(0,0,0,0.1)",
                p: 3,
                transform: `rotate(${game.rotation})`,
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "rotate(0deg) translateY(-6px)",
                  boxShadow: "7px 7px 0 rgba(0,0,0,0.13)",
                },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
                <Typography sx={{ fontSize: "1.5rem" }}>{game.icon}</Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: "1.35rem",
                    color: "#2d2d2d",
                    borderBottom: `2.5px solid ${game.accentBorder}`,
                    pb: 0.3,
                  }}
                >
                  {game.title}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "0.88rem", color: "#6b7280", fontStyle: "italic", mb: 2.5, flexGrow: 1 }}>
                {game.desc}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: "1rem",
                  color: "#9ca3af",
                  textAlign: "right",
                }}
              >
                click to play →
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* ── Dialog ── */}
      <Dialog
        open={open}
        onClose={close}
        maxWidth={isPicker ? "sm" : "xs"}
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: activeGame?.bg ?? "#ffffff",
            border: "2px solid #2d2d2d",
            borderRadius: "6px 14px 10px 6px",
            boxShadow: "8px 8px 0 rgba(0,0,0,0.12)",
            m: { xs: 2, sm: 3 },
          },
        }}
      >
        {/* Dialog header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 3,
            pt: 2.5,
            pb: 1.5,
            borderBottom: "1.5px dashed #d1d5db",
          }}
        >
          {/* Back button (only when showing a game) */}
          {!isPicker && (
            <IconButton
              onClick={openPicker}
              size="small"
              sx={{
                border: "1.5px solid #2d2d2d",
                borderRadius: "8px 4px 8px 4px",
                p: 0.6,
                mr: 0.5,
                "&:hover": { bgcolor: "rgba(0,0,0,0.06)" },
              }}
            >
              <BackIcon />
            </IconButton>
          )}

          <Typography
            sx={{
              fontFamily: '"Caveat", cursive',
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#2d2d2d",
              flexGrow: 1,
            }}
          >
            {isPicker ? "🎮 Choose a game" : `${activeGame?.icon} ${activeGame?.title}`}
          </Typography>

          <IconButton
            onClick={close}
            size="small"
            sx={{
              border: "1.5px solid #2d2d2d",
              borderRadius: "4px 8px 4px 8px",
              p: 0.7,
              "&:hover": { bgcolor: "rgba(0,0,0,0.06)" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent sx={{ px: 3, pt: 2.5, pb: 3 }}>
          {isPicker ? (
            /* Picker list */
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {games.map((game) => (
                <Box
                  key={game.id}
                  onClick={() => setView(game.id)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    bgcolor: game.bg,
                    border: "2px solid #2d2d2d",
                    borderRadius: "4px 10px 6px 4px",
                    p: 2,
                    cursor: "pointer",
                    boxShadow: "3px 3px 0 rgba(0,0,0,0.08)",
                    transition: "all 0.15s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "5px 5px 0 rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <Typography sx={{ fontSize: "1.8rem" }}>{game.icon}</Typography>
                  <Box>
                    <Typography
                      sx={{ fontFamily: '"Caveat", cursive', fontSize: "1.2rem", fontWeight: 700, color: "#2d2d2d" }}
                    >
                      {game.title}
                    </Typography>
                    <Typography sx={{ fontSize: "0.82rem", color: "#6b7280", fontStyle: "italic" }}>
                      {game.desc}
                    </Typography>
                  </Box>
                  <Typography sx={{ ml: "auto", color: "#9ca3af", fontSize: "1.2rem" }}>→</Typography>
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
