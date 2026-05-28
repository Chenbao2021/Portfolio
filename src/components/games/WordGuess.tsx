import React, { useState, useEffect, useCallback, useMemo, JSX } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import GameResetButton from "./GameResetButton";
import "./WordGuess.less";

// ── Word lists (EN) ────────────────────────────────────────────────────────
const TECH_WORDS = [
  "REACT",
  "CLOUD",
  "BUILD",
  "DEBUG",
  "STACK",
  "PROXY",
  "FETCH",
  "ASYNC",
  "CLASS",
  "BASIC",
  "STORE",
  "QUERY",
  "PATCH",
  "MODAL",
  "SCOPE",
  "THEME",
  "TRAIT",
  "CHUNK",
  "ROUTE",
  "BLEND",
  "CACHE",
  "STATE",
  "STYLE",
  "EVENT",
  "TOKEN",
  "ARRAY",
  "INDEX",
  "BLOCK",
  "REGEX",
  "PIXEL",
  "FRAME",
  "PROPS",
  "BYTES",
  "HOOKS",
  "TYPED",
  "CLICK",
  "MEDIA",
  "TIMER",
  "INPUT",
  "SLICE",
  "DEFER",
  "YIELD",
  "PARSE",
  "PRINT",
  "WHICH",
  "TYPES",
  "BREAK",
  "CATCH",
  "THROW",
  "FLOAT",
];
const ANIMAL_WORDS = [
  "TIGER",
  "EAGLE",
  "SHARK",
  "PANDA",
  "KOALA",
  "HYENA",
  "ZEBRA",
  "MOOSE",
  "CRANE",
  "GECKO",
  "RAVEN",
  "OTTER",
  "SKUNK",
  "VIPER",
  "SNAIL",
  "QUAIL",
  "TAPIR",
  "LEMUR",
  "TROUT",
  "HERON",
  "ROBIN",
  "SQUID",
  "DINGO",
  "PERCH",
  "SNAKE",
  "CAMEL",
  "SHEEP",
  "GOOSE",
  "MOUSE",
  "HORSE",
  "WHALE",
  "BISON",
  "LLAMA",
  "STOAT",
  "FINCH",
  "OKAPI",
  "LORIS",
];
const FOOD_WORDS = [
  "PIZZA",
  "BREAD",
  "GRAPE",
  "SAUCE",
  "LEMON",
  "BASIL",
  "CREAM",
  "OLIVE",
  "TACOS",
  "SUSHI",
  "STEAK",
  "BACON",
  "SALAD",
  "PASTA",
  "CURRY",
  "MANGO",
  "PEACH",
  "THYME",
  "ONION",
  "MELON",
  "GUAVA",
  "PRAWN",
  "TOAST",
  "FUDGE",
  "WAFER",
  "SYRUP",
  "CANDY",
  "SPICE",
  "CHILI",
  "FLOUR",
  "SUGAR",
  "COCOA",
  "CHIPS",
  "CREPE",
  "KEBAB",
  "JELLY",
  "BROTH",
  "GLAZE",
  "PESTO",
  "JUICE",
];
const SPORT_WORDS = [
  "RUGBY",
  "SERVE",
  "MATCH",
  "SCORE",
  "POINT",
  "BENCH",
  "COURT",
  "FIELD",
  "TRACK",
  "BOXER",
  "COACH",
  "RALLY",
  "RELAY",
  "SWING",
  "VAULT",
  "CATCH",
  "PITCH",
  "DRAFT",
  "SHOOT",
  "GUARD",
  "DRIVE",
  "SPIKE",
  "SMASH",
  "CROSS",
  "PRESS",
  "BLITZ",
  "CHESS",
  "DERBY",
  "CADDY",
  "JOUST",
  "SKATE",
  "CLIMB",
  "CYCLE",
  "CANOE",
  "FENCE",
];
const NATURE_WORDS = [
  "STORM",
  "RIVER",
  "OCEAN",
  "BEACH",
  "CLOUD",
  "GRASS",
  "STONE",
  "EARTH",
  "FLAME",
  "FROST",
  "CREEK",
  "RIDGE",
  "CLIFF",
  "FLINT",
  "MARSH",
  "SHADE",
  "BIRCH",
  "MAPLE",
  "CEDAR",
  "BLOOM",
  "PETAL",
  "ACORN",
  "THORN",
  "SWAMP",
  "ALGAE",
  "EMBER",
  "STEAM",
  "OZONE",
  "CORAL",
  "GROVE",
  "FLORA",
  "FAUNA",
  "DUNES",
  "DELTA",
  "ATOLL",
  "BLUFF",
  "KNOLL",
];

// ── Word lists (FR) ────────────────────────────────────────────────────────
const TECH_WORDS_FR = [
  "BOGUE",
  "LIGNE",
  "LISTE",
  "TABLE",
  "TACHE",
  "ICONE",
  "TEXTE",
  "TRAME",
  "AUDIT",
  "DEPOT",
  "MOTIF",
  "CIBLE",
  "DROIT",
  "TRAIT",
  "COPIE",
  "OCTET",
  "NOEUD",
  "CACHE",
  "MACRO",
  "PATCH",
  "PROXY",
  "TOKEN",
  "FLOAT",
  "INDEX",
  "INPUT",
  "MEDIA",
  "SCOPE",
  "STYLE",
  "TIMER",
  "FRAME",
  "QUERY",
  "ROUTE",
  "STACK",
  "CLOUD",
  "BUILD",
  "STORE",
  "TYPED",
  "MERGE",
  "PIVOT",
  "PRINT",
];
const ANIMAL_WORDS_FR = [
  "TIGRE",
  "AIGLE",
  "PANDA",
  "KOALA",
  "GECKO",
  "TAPIR",
  "DINGO",
  "BISON",
  "OKAPI",
  "LORIS",
  "LAPIN",
  "BICHE",
  "HIBOU",
  "SINGE",
  "CYGNE",
  "VACHE",
  "POULE",
  "MORSE",
  "CARPE",
  "MERLE",
  "FURET",
  "MORUE",
  "RATON",
  "OURSE",
  "CHIEN",
  "PONEY",
  "VARAN",
  "ORVET",
  "LOTTE",
];
const FOOD_WORDS_FR = [
  "SAUCE",
  "OLIVE",
  "TACOS",
  "SUSHI",
  "STEAK",
  "BACON",
  "CURRY",
  "MELON",
  "TOAST",
  "SIROP",
  "CHILI",
  "SUCRE",
  "CACAO",
  "CHIPS",
  "KEBAB",
  "PESTO",
  "POMME",
  "POIRE",
  "PRUNE",
  "GOUDA",
  "TARTE",
  "GLACE",
  "MOULE",
  "BOEUF",
  "FILET",
  "SOUPE",
  "PIZZA",
  "SAUGE",
  "ANETH",
  "FRUIT",
  "FUDGE",
  "TORTE",
];
const SPORT_WORDS_FR = [
  "RUGBY",
  "MATCH",
  "SCORE",
  "POINT",
  "COURT",
  "STADE",
  "PISTE",
  "COACH",
  "SWING",
  "SHOOT",
  "GARDE",
  "DRIVE",
  "SPIKE",
  "SMASH",
  "CROSS",
  "DERBY",
  "JOUTE",
  "PATIN",
  "CYCLE",
  "LUTTE",
  "VOILE",
  "TACLE",
  "FAUTE",
  "TITRE",
  "COUPE",
  "LIGUE",
  "RONDE",
  "BLITZ",
  "PRESS",
  "SERVI",
];
const NATURE_WORDS_FR = [
  "ORAGE",
  "OCEAN",
  "PLAGE",
  "NUAGE",
  "HERBE",
  "ROCHE",
  "TERRE",
  "GIVRE",
  "SILEX",
  "OMBRE",
  "FLEUR",
  "GLAND",
  "ALGUE",
  "OZONE",
  "FLORE",
  "FAUNE",
  "DUNES",
  "DELTA",
  "ATOLL",
  "BUTTE",
  "PLUIE",
  "NEIGE",
  "BRUME",
  "BRISE",
  "VAGUE",
  "SABLE",
  "LAGON",
  "HUMUS",
  "LIMON",
  "GOLFE",
  "FJORD",
  "TRONC",
  "MAREE",
];

// ── Constants ──────────────────────────────────────────────────────────────
const KB_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["↵", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];
const MAX_GUESSES = 6;
const WORD_LEN = 5;

// ── Types ──────────────────────────────────────────────────────────────────
type LetterState = "correct" | "present" | "absent" | "empty";
type WGPhase = "theme" | "setup" | "handoff" | "playing";

interface ThemeDef {
  id: string;
  emoji: string;
  labelKey: string;
  words: string[];
  wordsFR?: string[];
}

const THEMES: ThemeDef[] = [
  {
    id: "tech",
    emoji: "💻",
    labelKey: "theme_tech",
    words: TECH_WORDS,
    wordsFR: TECH_WORDS_FR,
  },
  {
    id: "animals",
    emoji: "🐾",
    labelKey: "theme_animals",
    words: ANIMAL_WORDS,
    wordsFR: ANIMAL_WORDS_FR,
  },
  {
    id: "food",
    emoji: "🍕",
    labelKey: "theme_food",
    words: FOOD_WORDS,
    wordsFR: FOOD_WORDS_FR,
  },
  {
    id: "sports",
    emoji: "⚽",
    labelKey: "theme_sports",
    words: SPORT_WORDS,
    wordsFR: SPORT_WORDS_FR,
  },
  {
    id: "nature",
    emoji: "🌿",
    labelKey: "theme_nature",
    words: NATURE_WORDS,
    wordsFR: NATURE_WORDS_FR,
  },
  { id: "custom", emoji: "✏️", labelKey: "theme_custom", words: [] },
];

interface Stats {
  played: number;
  wins: number;
  streak: number;
  bestStreak: number;
  dist: number[];
}
const BLANK_STATS: Stats = {
  played: 0,
  wins: 0,
  streak: 0,
  bestStreak: 0,
  dist: Array(MAX_GUESSES).fill(0),
};

function loadStats(themeId: string): Stats {
  try {
    const raw = localStorage.getItem(`portfolio_word_stats_${themeId}`);
    return raw ? { ...BLANK_STATS, ...JSON.parse(raw) } : { ...BLANK_STATS };
  } catch {
    return { ...BLANK_STATS };
  }
}
function saveStats(themeId: string, s: Stats) {
  try {
    localStorage.setItem(`portfolio_word_stats_${themeId}`, JSON.stringify(s));
  } catch {}
}
function pickWord(theme: ThemeDef, lang: string): string {
  const list =
    lang.startsWith("fr") && theme.wordsFR?.length
      ? theme.wordsFR
      : theme.words;
  return list[Math.floor(Math.random() * list.length)];
}
function evalGuess(guess: string, target: string): LetterState[] {
  const res: LetterState[] = Array(WORD_LEN).fill("absent");
  const tArr = target.split("");
  const gArr = guess.split("");
  gArr.forEach((l, i) => {
    if (l === tArr[i]) {
      res[i] = "correct";
      tArr[i] = "#";
    }
  });
  gArr.forEach((l, i) => {
    if (res[i] === "correct") return;
    const ti = tArr.indexOf(l);
    if (ti !== -1) {
      res[i] = "present";
      tArr[ti] = "#";
    }
  });
  return res;
}

// ── Keyboard sub-component ─────────────────────────────────────────────────
function Keyboard({
  onKey,
  usedLetters,
}: {
  onKey: (k: string) => void;
  usedLetters?: Record<string, LetterState>;
}) {
  return (
    <Box className="wg-keyboard">
      {KB_ROWS.map((row, ri) => (
        <Box key={ri} className="wg-kb-row">
          {row.map((key) => {
            const state = usedLetters?.[key];
            return (
              <Box
                key={key}
                className={[
                  "wg-kb-key",
                  key === "↵" || key === "⌫" ? "wg-kb-key--wide" : "",
                  state ? `wg-kb-key--${state}` : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => onKey(key)}
              >
                <Typography className="wg-kb-key__label">{key}</Typography>
              </Box>
            );
          })}
        </Box>
      ))}
    </Box>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function WordGuess(): JSX.Element {
  const { t, i18n } = useTranslation();

  const [wgPhase, setWGPhase] = useState<WGPhase>("theme");
  const [activeTheme, setActiveTheme] = useState<ThemeDef | null>(null);
  const [customInput, setCustomInput] = useState("");

  const [target, setTarget] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const [stats, setStats] = useState<Stats>({ ...BLANK_STATS });

  useEffect(() => {
    if (activeTheme && activeTheme.id !== "custom") {
      setStats(loadStats(activeTheme.id));
    } else {
      setStats({ ...BLANK_STATS });
    }
  }, [activeTheme]);

  const evaluations = useMemo(
    () => guesses.map((g) => evalGuess(g, target)),
    [guesses, target],
  );

  const usedLetters = useMemo(() => {
    const priority: Record<LetterState, number> = {
      correct: 3,
      present: 2,
      absent: 1,
      empty: 0,
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

  const beginGame = useCallback((word: string) => {
    setTarget(word);
    setGuesses([]);
    setCurrent("");
    setGameOver(false);
    setWon(false);
    setWGPhase("playing");
  }, []);

  const resetToThemes = useCallback(() => {
    setActiveTheme(null);
    setCustomInput("");
    setGuesses([]);
    setCurrent("");
    setGameOver(false);
    setWon(false);
    setWGPhase("theme");
  }, []);

  const handleThemeSelect = useCallback(
    (theme: ThemeDef) => {
      setActiveTheme(theme);
      if (theme.id === "custom") {
        setCustomInput("");
        setWGPhase("setup");
      } else {
        beginGame(pickWord(theme, i18n.language));
      }
    },
    [beginGame],
  );

  const handleCustomConfirm = useCallback(() => {
    if (customInput.length === WORD_LEN) setWGPhase("handoff");
  }, [customInput.length]);

  const handleHandoffStart = useCallback(() => {
    beginGame(customInput.toUpperCase());
  }, [customInput, beginGame]);

  const submitGuess = useCallback(() => {
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
      if (activeTheme && activeTheme.id !== "custom") {
        setStats((prev) => {
          const next: Stats = {
            played: prev.played + 1,
            wins: isWin ? prev.wins + 1 : prev.wins,
            streak: isWin ? prev.streak + 1 : 0,
            bestStreak: isWin
              ? Math.max(prev.bestStreak, prev.streak + 1)
              : prev.bestStreak,
            dist: prev.dist.map((d, i) =>
              isWin && i === ng.length - 1 ? d + 1 : d,
            ),
          };
          saveStats(activeTheme.id, next);
          return next;
        });
      }
    }
  }, [current, guesses, target, activeTheme]);

  const handleKey = useCallback(
    (key: string) => {
      if (wgPhase === "setup") {
        if (key === "↵" || key === "Enter") {
          handleCustomConfirm();
          return;
        }
        if (key === "⌫" || key === "Backspace") {
          setCustomInput((c) => c.slice(0, -1));
          return;
        }
        if (/^[A-Za-z]$/.test(key) && customInput.length < WORD_LEN) {
          setCustomInput((c) => c + key.toUpperCase());
        }
        return;
      }
      if (wgPhase !== "playing" || gameOver) return;
      if (key === "↵" || key === "Enter") {
        submitGuess();
        return;
      }
      if (key === "⌫" || key === "Backspace") {
        setCurrent((c) => c.slice(0, -1));
        return;
      }
      if (/^[A-Za-z]$/.test(key) && current.length < WORD_LEN) {
        setCurrent((c) => c + key.toUpperCase());
      }
    },
    [
      wgPhase,
      customInput.length,
      gameOver,
      handleCustomConfirm,
      submitGuess,
      current.length,
    ],
  );

  useEffect(() => {
    const h = (e: KeyboardEvent) => handleKey(e.key);
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [handleKey]);

  const playAgain = useCallback(() => {
    if (!activeTheme || activeTheme.id === "custom") {
      resetToThemes();
    } else {
      beginGame(pickWord(activeTheme, i18n.language));
    }
  }, [activeTheme, resetToThemes, beginGame]);

  const isCustom = activeTheme?.id === "custom";
  const winPct =
    stats.played > 0 ? Math.round((stats.wins / stats.played) * 100) : 0;

  // ── Theme selector ────────────────────────────────────────────────────────
  if (wgPhase === "theme") {
    return (
      <Box>
        <Typography className="wg-phase-title">
          {t("games.wg_game.pick_theme")}
        </Typography>
        <Box className="wg-theme-grid">
          {THEMES.map((theme) => (
            <Box
              key={theme.id}
              className={`wg-theme-btn${theme.id === "custom" ? " wg-theme-btn--custom" : ""}`}
              onClick={() => handleThemeSelect(theme)}
            >
              <Typography className="wg-theme-btn__emoji">
                {theme.emoji}
              </Typography>
              <Typography className="wg-theme-btn__label">
                {t(`games.wg_game.${theme.labelKey}`)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  // ── Custom word setup ─────────────────────────────────────────────────────
  if (wgPhase === "setup") {
    return (
      <Box>
        <Typography className="wg-phase-title">
          {t("games.wg_game.custom_title")}
        </Typography>
        <Typography className="wg-phase-hint">
          {t("games.wg_game.custom_hint")}
        </Typography>

        <Box className="wg-grid" style={{ marginBottom: 10 }}>
          <Box className="wg-row">
            {Array.from({ length: WORD_LEN }).map((_, i) => (
              <Box
                key={i}
                className={`wg-tile wg-tile--${customInput[i] ? "filled" : "empty"}`}
              >
                <Typography className="wg-tile__letter">
                  {customInput[i] ? "•" : ""}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Keyboard onKey={handleKey} />

        {customInput.length === WORD_LEN && (
          <GameResetButton
            onClick={handleCustomConfirm}
            label={t("games.wg_game.confirm")}
          />
        )}
        <Box className="wg-back-row">
          <Typography className="wg-back-link" onClick={resetToThemes}>
            ← {t("games.wg_game.change_theme")}
          </Typography>
        </Box>
      </Box>
    );
  }

  // ── Handoff screen ────────────────────────────────────────────────────────
  if (wgPhase === "handoff") {
    return (
      <Box className="wg-handoff">
        <Typography className="wg-handoff__emoji">🎭</Typography>
        <Typography className="wg-handoff__title">
          {t("games.wg_game.handoff_title")}
        </Typography>
        <Typography className="wg-handoff__sub">
          {t("games.wg_game.handoff_sub")}
        </Typography>
        <GameResetButton
          onClick={handleHandoffStart}
          label={t("games.wg_game.handoff_btn")}
        />
      </Box>
    );
  }

  // ── Game ──────────────────────────────────────────────────────────────────
  return (
    <Box>
      {!isCustom ? (
        <Box className="wg-stats">
          <Box className="wg-stat">
            <Typography className="wg-stat__num">{stats.played}</Typography>
            <Typography className="wg-stat__label">
              {t("games.wg_game.played")}
            </Typography>
          </Box>
          <Box className="wg-stat">
            <Typography className="wg-stat__num">{winPct}%</Typography>
            <Typography className="wg-stat__label">
              {t("games.wg_game.win_pct")}
            </Typography>
          </Box>
          <Box className="wg-stat">
            <Typography className="wg-stat__num">{stats.streak}</Typography>
            <Typography className="wg-stat__label">
              {t("games.wg_game.streak")}
            </Typography>
          </Box>
          <Box className="wg-stat">
            <Typography className="wg-stat__num">{stats.bestStreak}</Typography>
            <Typography className="wg-stat__label">
              {t("games.wg_game.best")}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Typography className="wg-custom-badge">
          {activeTheme?.emoji} {t("games.wg_game.custom_mode")}
        </Typography>
      )}

      <Box className="wg-grid">
        {Array.from({ length: MAX_GUESSES }).map((_, row) => {
          const guessStr = guesses[row] ?? "";
          const isActive = row === guesses.length && !gameOver;
          const word = isActive ? current : guessStr;
          const ev: LetterState[] | null =
            row < guesses.length ? evaluations[row] : null;
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
                    <Typography className="wg-tile__letter">
                      {letter}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>

      {gameOver && (
        <Typography className={`wg-result wg-result--${won ? "win" : "lose"}`}>
          {won
            ? t("games.wg_game.win")
            : `${t("games.wg_game.lose")} ${target}`}
        </Typography>
      )}

      <Keyboard onKey={handleKey} usedLetters={usedLetters} />

      {gameOver && (
        <GameResetButton
          onClick={playAgain}
          label={t("games.mem_game.play_again")}
        />
      )}
      <Box className="wg-back-row">
        <Typography className="wg-back-link" onClick={resetToThemes}>
          ← {t("games.wg_game.change_theme")}
        </Typography>
      </Box>
    </Box>
  );
}
