import React, { useState, useEffect, useCallback, useRef, JSX } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import GameResetButton from "./GameResetButton";
import "./MemoryGame.less";

const EMOJIS = ["🍕", "🎸", "🌈", "🦊", "🍦", "🎲", "🌙", "⚡"];
const LS_KEY = "portfolio_memory_best";

type MemMode = "solo" | "2p";
type MemPhase = "select" | "playing";

interface Best { moves: number; time: number }

function createDeck(): string[] {
  return [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);
}
function loadBest(): Best | null {
  try { const r = localStorage.getItem(LS_KEY); return r ? JSON.parse(r) : null; }
  catch { return null; }
}
function saveBest(b: Best) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(b)); } catch {}
}
function isBetter(b: Best | null, moves: number, time: number): boolean {
  if (!b) return true;
  return moves < b.moves || (moves === b.moves && time < b.time);
}

export default function MemoryGame(): JSX.Element {
  const { t } = useTranslation();

  // ── Navigation ────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<MemPhase>("select");
  const [mode, setMode]   = useState<MemMode>("solo");

  // ── Game state ────────────────────────────────────────────────────────────
  const [cards, setCards]     = useState<string[]>(createDeck);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  // For 2P: track which player matched which card index
  const [matchedBy, setMatchedBy] = useState<Record<number, 1 | 2>>({});
  const [locked, setLocked]       = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // ── Solo state ────────────────────────────────────────────────────────────
  const [moves, setMoves]       = useState(0);
  const [time, setTime]         = useState(0);
  const [best, setBest]         = useState<Best | null>(loadBest);
  const [isNewRecord, setIsNewRecord] = useState(false);

  // ── 2P state ──────────────────────────────────────────────────────────────
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [scores, setScores] = useState<{ p1: number; p2: number }>({ p1: 0, p2: 0 });

  // ── Refs (avoid stale closures in timer / completion) ─────────────────────
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const movesRef  = useRef(0);
  const timeRef   = useRef(0);
  const bestRef   = useRef<Best | null>(loadBest());

  // Cleanup timer on unmount
  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  // ── Check best score when solo game completes ─────────────────────────────
  useEffect(() => {
    if (!isComplete || mode !== "solo") return;
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    const fm = movesRef.current;
    const ft = timeRef.current;
    if (isBetter(bestRef.current, fm, ft)) {
      const nb: Best = { moves: fm, time: ft };
      bestRef.current = nb;
      setBest(nb);
      saveBest(nb);
      setIsNewRecord(true);
    }
  }, [isComplete, mode]);

  // ── Start game ────────────────────────────────────────────────────────────
  const startGame = useCallback((m: MemMode) => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }

    movesRef.current = 0;
    timeRef.current  = 0;
    setMode(m);
    setCards(createDeck());
    setFlipped([]);
    setMatched(new Set());
    setMatchedBy({});
    setLocked(false);
    setIsComplete(false);
    setMoves(0);
    setTime(0);
    setIsNewRecord(false);
    setCurrentPlayer(1);
    setScores({ p1: 0, p2: 0 });
    setPhase("playing");

    if (m === "solo") {
      timerRef.current = setInterval(() => {
        timeRef.current += 1;
        setTime(timeRef.current);
      }, 1000);
    }
  }, []);

  const reset = useCallback(() => startGame(mode), [mode, startGame]);

  const backToSelect = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setPhase("select");
  }, []);

  // ── Flip logic ────────────────────────────────────────────────────────────
  const handleFlip = useCallback((i: number) => {
    if (locked || flipped.includes(i) || matched.has(i) || isComplete) return;
    const next = [...flipped, i];
    setFlipped(next);

    if (next.length < 2) return;

    // Two cards flipped
    if (mode === "solo") {
      movesRef.current += 1;
      setMoves(movesRef.current);
    }
    setLocked(true);

    const isMatch = cards[next[0]] === cards[next[1]];

    if (isMatch) {
      const newMatched = new Set([...matched, next[0], next[1]]);
      setMatched(newMatched);
      if (mode === "2p") {
        const cp = currentPlayer;
        setMatchedBy((mb) => ({ ...mb, [next[0]]: cp, [next[1]]: cp }));
        setScores((s) => cp === 1 ? { ...s, p1: s.p1 + 1 } : { ...s, p2: s.p2 + 1 });
        // Same player keeps their turn on a match — no switch
      }
      setFlipped([]);
      setLocked(false);
      if (newMatched.size === cards.length) setIsComplete(true);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setLocked(false);
        if (mode === "2p") setCurrentPlayer((p) => (p === 1 ? 2 : 1));
      }, 900);
    }
  }, [locked, flipped, matched, isComplete, cards, mode, currentPlayer]);

  // ── Mode selector ─────────────────────────────────────────────────────────
  if (phase === "select") {
    return (
      <Box>
        <Typography className="mem-phase-title">{t("games.mem_game.pick_mode")}</Typography>
        <Box className="mem-mode-grid">
          <Box className="mem-mode-btn" onClick={() => startGame("solo")}>
            <Typography className="mem-mode-btn__emoji">🧠</Typography>
            <Box>
              <Typography className="mem-mode-btn__label">{t("games.mem_game.mode_solo")}</Typography>
              <Typography className="mem-mode-btn__desc">{t("games.mem_game.mode_solo_desc")}</Typography>
            </Box>
          </Box>
          <Box className="mem-mode-btn" onClick={() => startGame("2p")}>
            <Typography className="mem-mode-btn__emoji">🎭</Typography>
            <Box>
              <Typography className="mem-mode-btn__label">{t("games.mem_game.mode_2p")}</Typography>
              <Typography className="mem-mode-btn__desc">{t("games.mem_game.mode_2p_desc")}</Typography>
            </Box>
          </Box>
        </Box>
        {best && (
          <Typography className="mem-best-display">
            🏆 {t("games.mem_game.best")}: {best.moves} {t("games.mem_game.moves_short")} · {best.time}s
          </Typography>
        )}
      </Box>
    );
  }

  // ── Game board ────────────────────────────────────────────────────────────
  const isSolo = mode === "solo";

  // Winner label for 2P
  let winnerLabel = "";
  if (isComplete && !isSolo) {
    if (scores.p1 > scores.p2) winnerLabel = t("games.mem_game.p1_wins");
    else if (scores.p2 > scores.p1) winnerLabel = t("games.mem_game.p2_wins");
    else winnerLabel = t("games.mem_game.tie");
  }

  return (
    <Box>
      {/* Header */}
      {isSolo ? (
        <Box className="mem-solo-header">
          <Box className="mem-solo-stat">
            <Typography className="mem-solo-stat__val">{moves}</Typography>
            <Typography className="mem-solo-stat__lbl">{t("games.mem_game.moves_short")}</Typography>
          </Box>
          <Box className="mem-solo-stat">
            <Typography className="mem-solo-stat__val">{matched.size / 2}/{EMOJIS.length}</Typography>
            <Typography className="mem-solo-stat__lbl">{t("games.mem_game.pairs")}</Typography>
          </Box>
          <Box className="mem-solo-stat">
            <Typography className="mem-solo-stat__val">{time}s</Typography>
            <Typography className="mem-solo-stat__lbl">{t("games.mem_game.time")}</Typography>
          </Box>
        </Box>
      ) : (
        <Box className="mem-2p-header">
          <Box className={`mem-2p-player${currentPlayer === 1 && !isComplete ? " mem-2p-player--active" : ""}`}>
            <Typography className="mem-2p-player__score">{scores.p1}</Typography>
            <Typography className="mem-2p-player__name">{t("games.mem_game.p1")}</Typography>
          </Box>
          <Typography className="mem-2p-vs">vs</Typography>
          <Box className={`mem-2p-player${currentPlayer === 2 && !isComplete ? " mem-2p-player--active" : ""}`}>
            <Typography className="mem-2p-player__score">{scores.p2}</Typography>
            <Typography className="mem-2p-player__name">{t("games.mem_game.p2")}</Typography>
          </Box>
        </Box>
      )}

      {/* 2P turn indicator */}
      {!isSolo && !isComplete && (
        <Box className={`mem-turn-banner mem-turn-banner--p${currentPlayer}`}>
          <Typography className="mem-turn-banner__text">
            {t(`games.mem_game.p${currentPlayer}_turn`)}
          </Typography>
        </Box>
      )}

      {/* Cards grid */}
      <Box className="mem-grid">
        {cards.map((emoji, i) => {
          const isFlipped    = flipped.includes(i) || matched.has(i);
          const isMatched    = matched.has(i);
          const owner        = matchedBy[i];

          const cardClass = [
            "mem-card",
            isMatched
              ? (owner === 2 ? "mem-card--matched-p2" : "mem-card--matched")
              : isFlipped ? "mem-card--flipped" : "",
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

      {/* Completion messages */}
      {isComplete && isSolo && (
        <Typography className="mem-complete">
          {isNewRecord
            ? t("games.mem_game.new_record", { moves, time })
            : t("games.mem_game.complete", { moves })}
        </Typography>
      )}
      {isComplete && !isSolo && (
        <Typography className="mem-complete">{winnerLabel}</Typography>
      )}

      <GameResetButton
        onClick={reset}
        label={isComplete ? t("games.mem_game.play_again") : t("games.mem_game.reset")}
      />
      <Box className="mem-back-row">
        <Typography className="mem-back-link" onClick={backToSelect}>
          ← {t("games.mem_game.change_mode")}
        </Typography>
      </Box>
    </Box>
  );
}
