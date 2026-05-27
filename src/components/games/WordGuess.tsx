import React, { useState, useEffect, useCallback, useMemo, JSX } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import GameResetButton from "./GameResetButton";
import "./WordGuess.less";

const WORDS = [
  "REACT", "CLOUD", "BUILD", "DEBUG", "STACK",
  "PROXY", "FETCH", "ASYNC", "CLASS", "BASIC",
  "STORE", "QUERY", "PATCH", "MODAL", "SCOPE",
  "THEME", "TRAIT", "CHUNK", "ROUTE", "BLEND",
  "CACHE", "STATE", "STYLE", "EVENT", "TOKEN",
  "ARRAY", "INDEX", "BLOCK", "REGEX", "PIXEL",
  "FRAME", "PROPS", "BYTES", "HOOKS", "TYPED",
  "CLICK", "MEDIA", "TIMER", "INPUT", "SLICE",
  "DEFER", "YIELD", "PARSE", "PRINT", "WHICH",
  "TYPES", "BREAK", "CATCH", "THROW", "FLOAT",
];

const LS_KEY = "portfolio_word_stats";
const MAX_GUESSES = 6;
const WORD_LEN = 5;

const KB_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["↵", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

type LetterState = "correct" | "present" | "absent" | "empty";

interface Stats {
  played: number;
  wins: number;
  streak: number;
  bestStreak: number;
  dist: number[];
}

const BLANK_STATS: Stats = {
  played: 0, wins: 0, streak: 0, bestStreak: 0,
  dist: Array(MAX_GUESSES).fill(0),
};

function loadStats(): Stats {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? { ...BLANK_STATS, ...JSON.parse(raw) } : { ...BLANK_STATS };
  } catch { return { ...BLANK_STATS }; }
}

function saveStats(s: Stats) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(s)); } catch {}
}

function pickWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function evalGuess(guess: string, target: string): LetterState[] {
  const res: LetterState[] = Array(WORD_LEN).fill("absent");
  const tArr = target.split("");
  const gArr = guess.split("");
  gArr.forEach((l, i) => {
    if (l === tArr[i]) { res[i] = "correct"; tArr[i] = "#"; }
  });
  gArr.forEach((l, i) => {
    if (res[i] === "correct") return;
    const ti = tArr.indexOf(l);
    if (ti !== -1) { res[i] = "present"; tArr[ti] = "#"; }
  });
  return res;
}

export default function WordGuess(): JSX.Element {
  const { t } = useTranslation();
  const [target, setTarget] = useState(pickWord);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [stats, setStats] = useState<Stats>(loadStats);
  const [invalid, setInvalid] = useState(false);

  const evaluations = useMemo(
    () => guesses.map((g) => evalGuess(g, target)),
    [guesses, target]
  );

  const usedLetters = useMemo(() => {
    const priority: Record<LetterState, number> = {
      correct: 3, present: 2, absent: 1, empty: 0,
    };
    const map: Record<string, LetterState> = {};
    guesses.forEach((g, gi) => {
      const ev = evaluations[gi];
      g.split("").forEach((l, li) => {
        if (!map[l] || priority[ev[li]] > priority[map[l]]) map[l] = ev[li];
      });
    });
    return map;
  }, [guesses, evaluations]);

  const submit = useCallback(() => {
    if (current.length !== WORD_LEN) {
      setInvalid(true);
      setTimeout(() => setInvalid(false), 600);
      return;
    }
    const ng = [...guesses, current];
    setGuesses(ng);
    setCurrent("");
    const isWin = current === target;
    if (isWin || ng.length >= MAX_GUESSES) {
      setGameOver(true);
      setWon(isWin);
      setStats((prev) => {
        const next: Stats = {
          played: prev.played + 1,
          wins: isWin ? prev.wins + 1 : prev.wins,
          streak: isWin ? prev.streak + 1 : 0,
          bestStreak: isWin
            ? Math.max(prev.bestStreak, prev.streak + 1)
            : prev.bestStreak,
          dist: prev.dist.map((d, i) =>
            isWin && i === ng.length - 1 ? d + 1 : d
          ),
        };
        saveStats(next);
        return next;
      });
    }
  }, [current, guesses, target]);

  const handleKey = useCallback((key: string) => {
    if (gameOver) return;
    if (key === "↵" || key === "Enter") { submit(); return; }
    if (key === "⌫" || key === "Backspace") { setCurrent((c) => c.slice(0, -1)); return; }
    if (/^[A-Za-z]$/.test(key) && current.length < WORD_LEN) {
      setCurrent((c) => c + key.toUpperCase());
    }
  }, [gameOver, submit, current.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => handleKey(e.key);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleKey]);

  const reset = useCallback(() => {
    setTarget(pickWord());
    setGuesses([]);
    setCurrent("");
    setGameOver(false);
    setWon(false);
  }, []);

  const winPct = stats.played > 0 ? Math.round((stats.wins / stats.played) * 100) : 0;

  return (
    <Box>
      <Box className="wg-stats">
        <Box className="wg-stat">
          <Typography className="wg-stat__num">{stats.played}</Typography>
          <Typography className="wg-stat__label">{t("games.wg_game.played")}</Typography>
        </Box>
        <Box className="wg-stat">
          <Typography className="wg-stat__num">{winPct}%</Typography>
          <Typography className="wg-stat__label">{t("games.wg_game.win_pct")}</Typography>
        </Box>
        <Box className="wg-stat">
          <Typography className="wg-stat__num">{stats.streak}</Typography>
          <Typography className="wg-stat__label">{t("games.wg_game.streak")}</Typography>
        </Box>
        <Box className="wg-stat">
          <Typography className="wg-stat__num">{stats.bestStreak}</Typography>
          <Typography className="wg-stat__label">{t("games.wg_game.best")}</Typography>
        </Box>
      </Box>

      <Box className="wg-grid">
        {Array.from({ length: MAX_GUESSES }).map((_, row) => {
          const guessStr = guesses[row] ?? "";
          const isActive = row === guesses.length && !gameOver;
          const word = isActive ? current : guessStr;
          const ev: LetterState[] | null = row < guesses.length ? evaluations[row] : null;
          return (
            <Box
              key={row}
              className={`wg-row${isActive && invalid ? " wg-row--invalid" : ""}`}
            >
              {Array.from({ length: WORD_LEN }).map((_, col) => {
                const letter = word[col] ?? "";
                const state: LetterState = ev ? ev[col] : "empty";
                return (
                  <Box
                    key={col}
                    className={`wg-tile wg-tile--${ev ? state : letter ? "filled" : "empty"}`}
                  >
                    <Typography className="wg-tile__letter">{letter}</Typography>
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>

      {gameOver && (
        <Typography className={`wg-result wg-result--${won ? "win" : "lose"}`}>
          {won ? t("games.wg_game.win") : `${t("games.wg_game.lose")} ${target}`}
        </Typography>
      )}

      <Box className="wg-keyboard">
        {KB_ROWS.map((row, ri) => (
          <Box key={ri} className="wg-kb-row">
            {row.map((key) => {
              const state = usedLetters[key];
              return (
                <Box
                  key={key}
                  className={[
                    "wg-kb-key",
                    key === "↵" || key === "⌫" ? "wg-kb-key--wide" : "",
                    state ? `wg-kb-key--${state}` : "",
                  ].filter(Boolean).join(" ")}
                  onClick={() => handleKey(key)}
                >
                  <Typography className="wg-kb-key__label">{key}</Typography>
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>

      {gameOver && (
        <GameResetButton onClick={reset} label={t("games.mem_game.play_again")} />
      )}
    </Box>
  );
}
