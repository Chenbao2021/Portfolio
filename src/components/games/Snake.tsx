import React, { useState, useEffect, useCallback, useRef, JSX } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import GameScoreRow from "./GameScoreRow";
import GameResetButton from "./GameResetButton";
import "./Snake.less";

const COLS = 18;
const ROWS = 14;
const CELL = 16;
const SPEED = 200;
const LS_KEY = "portfolio_snake_hs";

type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT";
interface Pos { x: number; y: number }

const DELTA: Record<Dir, Pos> = {
  UP: { x: 0, y: -1 }, DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 }, RIGHT: { x: 1, y: 0 },
};
const OPPOSITE: Record<Dir, Dir> = {
  UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT",
};

function rndFood(snake: Pos[]): Pos {
  const occupied = new Set(snake.map((s) => `${s.x},${s.y}`));
  let pos: Pos;
  do {
    pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (occupied.has(`${pos.x},${pos.y}`));
  return pos;
}

function getHS(): number {
  try { return parseInt(localStorage.getItem(LS_KEY) || "0", 10); } catch { return 0; }
}
function saveHS(v: number) { try { localStorage.setItem(LS_KEY, String(v)); } catch {} }

export default function Snake(): JSX.Element {
  const { t } = useTranslation();
  const [hs, setHs] = useState(getHS);
  const [snake, setSnake] = useState<Pos[]>([{ x: 9, y: 7 }]);
  const [food, setFood] = useState<Pos>({ x: 14, y: 7 });
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<"idle" | "running" | "dead">("idle");

  const snakeRef = useRef<Pos[]>([{ x: 9, y: 7 }]);
  const foodRef = useRef<Pos>({ x: 14, y: 7 });
  const dirRef = useRef<Dir>("RIGHT");
  const scoreRef = useRef(0);
  const statusRef = useRef<"idle" | "running" | "dead">("idle");

  useEffect(() => {
    if (status !== "running") return;
    const id = setInterval(() => {
      if (statusRef.current !== "running") return;
      const sn = snakeRef.current;
      const d = dirRef.current;
      const head = sn[0];
      const nh = { x: head.x + DELTA[d].x, y: head.y + DELTA[d].y };

      nh.x = (nh.x + COLS) % COLS;
      nh.y = (nh.y + ROWS) % ROWS;

      const isDead = sn.some((s) => s.x === nh.x && s.y === nh.y);

      if (isDead) {
        clearInterval(id);
        statusRef.current = "dead";
        setStatus("dead");
        const newHs = Math.max(scoreRef.current, getHS());
        saveHS(newHs);
        setHs(newHs);
        return;
      }

      const ate = nh.x === foodRef.current.x && nh.y === foodRef.current.y;
      const newSnake = [nh, ...sn];
      if (!ate) {
        newSnake.pop();
      } else {
        scoreRef.current += 1;
        setScore(scoreRef.current);
        const f = rndFood(newSnake);
        foodRef.current = f;
        setFood(f);
      }
      snakeRef.current = newSnake;
      setSnake([...newSnake]);
    }, SPEED);

    return () => clearInterval(id);
  }, [status]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowUp: "UP", ArrowDown: "DOWN", ArrowLeft: "LEFT", ArrowRight: "RIGHT",
        w: "UP", s: "DOWN", a: "LEFT", d: "RIGHT",
      };
      const nd = map[e.key];
      if (!nd) return;
      if (e.key.startsWith("Arrow")) e.preventDefault();
      if (nd !== OPPOSITE[dirRef.current]) dirRef.current = nd;
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const start = useCallback(() => {
    const init: Pos[] = [{ x: 9, y: 7 }];
    const initFood: Pos = { x: 14, y: 7 };
    snakeRef.current = init;
    foodRef.current = initFood;
    dirRef.current = "RIGHT";
    scoreRef.current = 0;
    statusRef.current = "running";
    setSnake(init);
    setFood(initFood);
    setScore(0);
    setStatus("running");
  }, []);

  const steer = useCallback((d: Dir) => {
    if (statusRef.current === "running" && d !== OPPOSITE[dirRef.current]) {
      dirRef.current = d;
    }
  }, []);

  return (
    <Box>
      <GameScoreRow
        left={`${t("games.snake_game.score")}: ${score}`}
        right={`${t("games.snake_game.best")}: ${hs}`}
      />

      <Box className="snake-board" style={{ width: COLS * CELL, height: ROWS * CELL }}>
        <Box
          className="snake-food"
          style={{ left: food.x * CELL, top: food.y * CELL, width: CELL, height: CELL }}
        />
        {snake.map((seg, i) => (
          <Box
            key={`s${i}`}
            className={i === 0 ? "snake-seg snake-seg--head" : "snake-seg"}
            style={{ left: seg.x * CELL, top: seg.y * CELL, width: CELL, height: CELL }}
          />
        ))}
        {status === "idle" && (
          <Box className="snake-overlay">
            <Typography className="snake-overlay__msg">{t("games.snake_game.press_start")}</Typography>
          </Box>
        )}
        {status === "dead" && (
          <Box className="snake-overlay snake-overlay--dead">
            <Typography className="snake-overlay__msg">{t("games.snake_game.game_over")}</Typography>
            <Typography className="snake-overlay__score">
              {t("games.snake_game.final_score", { score })}
            </Typography>
          </Box>
        )}
      </Box>

      <Box className="snake-dpad">
        <Box className="snake-dpad__row">
          <Box className="snake-dpad__btn" onClick={() => steer("UP")}>▲</Box>
        </Box>
        <Box className="snake-dpad__row">
          <Box className="snake-dpad__btn" onClick={() => steer("LEFT")}>◀</Box>
          <Box className="snake-dpad__center" />
          <Box className="snake-dpad__btn" onClick={() => steer("RIGHT")}>▶</Box>
        </Box>
        <Box className="snake-dpad__row">
          <Box className="snake-dpad__btn" onClick={() => steer("DOWN")}>▼</Box>
        </Box>
      </Box>

      <GameResetButton
        onClick={start}
        label={
          status === "idle"
            ? t("games.snake_game.start")
            : t("games.snake_game.restart")
        }
      />
    </Box>
  );
}
