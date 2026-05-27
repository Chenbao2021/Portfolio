import React, {
  useState, useEffect, useRef, useCallback, JSX,
} from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import GameResetButton from "./GameResetButton";
import "./GoldMiner.less";

// ── Constants ──────────────────────────────────────────────────────────────
const W = 280;
const H = 210;
const MX = 140;          // miner / rope anchor X
const MY = 42;           // rope anchor Y
const INIT_ROPE = 18;
const EXT_SPEED = 4;     // pixels per frame extension
const MAX_ANGLE = 1.0;   // ~57° swing radius
const LEVEL_TIME = 30;   // seconds per level
const MAX_LEVEL = 5;
const LEVEL_TARGETS = [350, 750, 1400, 2200, 3500];
const LS_KEY = "portfolio_gm_hs";

// ── Types ──────────────────────────────────────────────────────────────────
type ItemType = "gold_s" | "gold_l" | "diamond" | "rock_s" | "rock_l";
type HookState = "swinging" | "extending" | "reeling";
type Phase = "idle" | "playing" | "levelup" | "levelover" | "win";

interface Item {
  id: number; type: ItemType;
  x: number; y: number; r: number;
  weight: number; value: number;
  removed: boolean;
}

interface GS {
  phase: Phase;
  level: number; score: number; levelScore: number;
  timeLeft: number; lastTs: number;
  items: Item[];
  angle: number; angleDir: 1 | -1;
  hookState: HookState; rope: number;
  grabbed: Item | null;
}

// ── Item catalogue ────────────────────────────────────────────────────────
const DEFS: Record<ItemType, {
  r: number; weight: number; value: number; bg: string; fg: string; lbl: string;
}> = {
  gold_s:  { r: 12, weight: 1.5, value: 200,  bg: "#fbbf24", fg: "#78350f", lbl: "G" },
  gold_l:  { r: 20, weight: 3.0, value: 500,  bg: "#f59e0b", fg: "#78350f", lbl: "G" },
  diamond: { r: 10, weight: 1.0, value: 1000, bg: "#67e8f9", fg: "#0c4a6e", lbl: "♦" },
  rock_s:  { r: 15, weight: 5.0, value: 5,    bg: "#9ca3af", fg: "#1f2937", lbl: "✕" },
  rock_l:  { r: 24, weight: 9.0, value: 10,   bg: "#6b7280", fg: "#1f2937", lbl: "✕" },
};

// ── Helpers ───────────────────────────────────────────────────────────────
const getHS = (): number => {
  try { return parseInt(localStorage.getItem(LS_KEY) || "0", 10); } catch { return 0; }
};
const saveHS = (v: number) => { try { localStorage.setItem(LS_KEY, String(v)); } catch {} };

const swingSpeed = (level: number) => 0.022 + level * 0.004;
const reelSpeed  = (weight: number) => Math.max(1.0, EXT_SPEED / weight);
const rnd = (a: number, b: number) => Math.random() * (b - a) + a;

function generateItems(level: number): Item[] {
  const POOL: ItemType[] = [
    "gold_s", "gold_s", "gold_s",
    "gold_l", "gold_l",
    "diamond",
    "rock_s", "rock_s",
    "rock_l",
  ];
  const count = Math.min(5 + level, POOL.length);
  const types = [...POOL].sort(() => Math.random() - 0.5).slice(0, count);
  const placed: Array<{ x: number; y: number; r: number }> = [];
  const items: Item[] = [];

  types.forEach((type, id) => {
    const { r } = DEFS[type];
    let x = 0, y = 0, ok = false;
    for (let i = 0; i < 80; i++) {
      x = rnd(r + 12, W - r - 12);
      y = rnd(80, H - r - 10);
      ok = !placed.some((p) => Math.hypot(p.x - x, p.y - y) < p.r + r + 10);
      if (ok) break;
    }
    placed.push({ x, y, r });
    items.push({ id, type, x, y, r, weight: DEFS[type].weight, value: DEFS[type].value, removed: false });
  });
  return items;
}

function makeGS(level: number, score: number): GS {
  return {
    phase: "playing",
    level, score, levelScore: 0,
    timeLeft: LEVEL_TIME, lastTs: 0,
    items: generateItems(level),
    angle: -MAX_ANGLE / 2, angleDir: 1,
    hookState: "swinging", rope: INIT_ROPE,
    grabbed: null,
  };
}

// ── Canvas drawing ─────────────────────────────────────────────────────────
function drawCircleItem(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, r: number,
  bg: string, fg: string, lbl: string,
) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.4)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = fg;
  ctx.font = `bold ${Math.round(r * 0.85)}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(lbl, x, y);
}

function drawScene(ctx: CanvasRenderingContext2D, gs: GS) {
  // Background layers (cave aesthetic)
  ctx.fillStyle = "#0f172a"; ctx.fillRect(0, 0, W, 68);
  ctx.fillStyle = "#78350f"; ctx.fillRect(0, 60, W, 8);   // ceiling plank
  ctx.fillStyle = "#7c5232"; ctx.fillRect(0, 68, W, 32);
  ctx.fillStyle = "#6b4428"; ctx.fillRect(0, 100, W, 42);
  ctx.fillStyle = "#5a3720"; ctx.fillRect(0, 142, W, 38);
  ctx.fillStyle = "#4a2c18"; ctx.fillRect(0, 180, W, H - 180);

  // Subtle stone speckles
  ctx.fillStyle = "rgba(0,0,0,0.12)";
  for (let tx = 15; tx < W; tx += 28) {
    for (let ty = 78; ty < H; ty += 18) {
      ctx.beginPath();
      ctx.arc(tx + Math.sin(tx * 0.3 + ty * 0.2) * 5, ty, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Items in the mine
  gs.items.forEach((item) => {
    if (item.removed) return;
    const d = DEFS[item.type];
    drawCircleItem(ctx, item.x, item.y, item.r, d.bg, d.fg, d.lbl);
  });

  // Rope
  const tx = MX + gs.rope * Math.sin(gs.angle);
  const ty = MY + gs.rope * Math.cos(gs.angle);
  ctx.beginPath();
  ctx.moveTo(MX, MY);
  ctx.lineTo(tx, ty);
  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([3, 3]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Grabbed item hanging from hook tip
  if (gs.grabbed) {
    const g = gs.grabbed;
    const d = DEFS[g.type];
    const gx = tx;
    const gy = ty + g.r + 7;
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(gx, gy - g.r);
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 1;
    ctx.stroke();
    drawCircleItem(ctx, gx, gy, g.r, d.bg, d.fg, d.lbl);
  }

  // Hook tip
  ctx.beginPath();
  ctx.arc(tx, ty, 4, 0, Math.PI * 2);
  ctx.fillStyle = "#e5e7eb";
  ctx.fill();
  ctx.strokeStyle = "#374151";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Miner figure
  // Winch box
  ctx.fillStyle = "#374151";
  ctx.fillRect(MX - 9, MY - 12, 18, 12);
  ctx.strokeStyle = "#6b7280";
  ctx.lineWidth = 1;
  ctx.strokeRect(MX - 9, MY - 12, 18, 12);
  // Body
  ctx.fillStyle = "#1d4ed8";
  ctx.fillRect(MX - 7, MY - 26, 14, 14);
  // Head
  ctx.beginPath();
  ctx.arc(MX, MY - 32, 7, 0, Math.PI * 2);
  ctx.fillStyle = "#fde68a";
  ctx.fill();
  // Hat brim
  ctx.fillStyle = "#92400e";
  ctx.fillRect(MX - 10, MY - 41, 20, 5);
  // Hat crown
  ctx.fillRect(MX - 6, MY - 46, 12, 5);
  // Hat lamp
  ctx.beginPath();
  ctx.arc(MX, MY - 47, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = "#fef08a";
  ctx.fill();
}

// ── Component ─────────────────────────────────────────────────────────────
interface Display {
  score: number; level: number; timeLeft: number; levelScore: number; phase: Phase;
}

export default function GoldMiner(): JSX.Element {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gsRef    = useRef<GS>({ ...makeGS(1, 0), phase: "idle" });
  const rafRef   = useRef<number>(0);
  const prevRef  = useRef<Display>({ score: -1, level: -1, timeLeft: -1, levelScore: -1, phase: "idle" });

  const [hs, setHs]       = useState(getHS);
  const [disp, setDisp]   = useState<Display>({
    score: 0, level: 1, timeLeft: LEVEL_TIME, levelScore: 0, phase: "idle",
  });

  const pushDisplay = useCallback((gs: GS) => {
    const t2 = Math.ceil(gs.timeLeft);
    const p  = prevRef.current;
    if (
      gs.score !== p.score || gs.level !== p.level || t2 !== p.timeLeft ||
      gs.levelScore !== p.levelScore || gs.phase !== p.phase
    ) {
      const next = { score: gs.score, level: gs.level, timeLeft: t2, levelScore: gs.levelScore, phase: gs.phase };
      prevRef.current = next;
      setDisp(next);
    }
  }, []);

  const loop = useCallback((ts: number) => {
    const gs = gsRef.current;
    if (gs.phase !== "playing") return;

    const dt = gs.lastTs > 0 ? Math.min((ts - gs.lastTs) / 1000, 0.1) : 0;
    gs.lastTs = ts;

    // Timer countdown
    gs.timeLeft -= dt;
    if (gs.timeLeft <= 0) {
      gs.timeLeft = 0;
      const target = LEVEL_TARGETS[gs.level - 1] ?? 999999;
      gs.phase = gs.levelScore >= target
        ? (gs.level >= MAX_LEVEL ? "win" : "levelup")
        : "levelover";
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) drawScene(ctx, gs);
      pushDisplay(gs);
      return;
    }

    // Hook update
    if (gs.hookState === "swinging") {
      gs.angle += gs.angleDir * swingSpeed(gs.level);
      if (Math.abs(gs.angle) >= MAX_ANGLE) gs.angleDir = (-gs.angleDir) as 1 | -1;
      gs.rope = INIT_ROPE;

    } else if (gs.hookState === "extending") {
      gs.rope += EXT_SPEED;
      const tx = MX + gs.rope * Math.sin(gs.angle);
      const ty = MY + gs.rope * Math.cos(gs.angle);

      if (ty > H + 12 || tx < -8 || tx > W + 8) {
        gs.hookState = "reeling";
      } else {
        for (const item of gs.items) {
          if (item.removed) continue;
          if (Math.hypot(item.x - tx, item.y - ty) < item.r + 6) {
            item.removed = true;
            gs.grabbed = item;
            gs.hookState = "reeling";
            break;
          }
        }
      }

    } else {
      // reeling
      const speed = gs.grabbed ? reelSpeed(gs.grabbed.weight) : EXT_SPEED * 2;
      gs.rope -= speed;
      if (gs.rope <= INIT_ROPE) {
        gs.rope = INIT_ROPE;
        if (gs.grabbed) {
          gs.score += gs.grabbed.value;
          gs.levelScore += gs.grabbed.value;
          gs.grabbed = null;
          const target = LEVEL_TARGETS[gs.level - 1] ?? 999999;
          if (gs.levelScore >= target) {
            gs.phase = gs.level >= MAX_LEVEL ? "win" : "levelup";
            const ctx = canvasRef.current?.getContext("2d");
            if (ctx) drawScene(ctx, gs);
            pushDisplay(gs);
            return;
          }
        }
        gs.hookState = "swinging";
      }
    }

    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) drawScene(ctx, gs);
    pushDisplay(gs);
    rafRef.current = requestAnimationFrame(loop);
  }, [pushDisplay]);

  const startLoop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    gsRef.current.lastTs = 0;
    prevRef.current = { score: -1, level: -1, timeLeft: -1, levelScore: -1, phase: "idle" };
    rafRef.current = requestAnimationFrame(loop);
  }, [loop]);

  const shoot = useCallback(() => {
    const gs = gsRef.current;
    if (gs.phase === "playing" && gs.hookState === "swinging") {
      gs.hookState = "extending";
    }
  }, []);

  const startGame = useCallback(() => {
    gsRef.current = makeGS(1, 0);
    startLoop();
  }, [startLoop]);

  const nextLevel = useCallback(() => {
    const gs = gsRef.current;
    gsRef.current = makeGS(gs.level + 1, gs.score);
    startLoop();
  }, [startLoop]);

  // Keyboard: Space → shoot
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.code === "Space") { e.preventDefault(); shoot(); } };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [shoot]);

  // Init canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (ctx) drawScene(ctx, gsRef.current);
  }, []);

  // Save HS when game ends
  useEffect(() => {
    if (disp.phase === "win" || disp.phase === "levelover") {
      const newHs = Math.max(disp.score, getHS());
      saveHS(newHs);
      setHs(newHs);
    }
  }, [disp.phase, disp.score]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const { phase } = disp;
  const target = LEVEL_TARGETS[disp.level - 1] ?? 0;

  return (
    <Box>
      {/* Score header */}
      <Box className="gm-header">
        <Box className="gm-stat">
          <Typography className="gm-stat__val">{disp.score}</Typography>
          <Typography className="gm-stat__lbl">{t("games.gm_game.score")}</Typography>
        </Box>
        <Box className="gm-stat">
          <Typography className="gm-stat__val">{disp.levelScore}/{target}</Typography>
          <Typography className="gm-stat__lbl">{t("games.gm_game.target")}</Typography>
        </Box>
        <Box className="gm-stat">
          <Typography className="gm-stat__val">{disp.level}/{MAX_LEVEL}</Typography>
          <Typography className="gm-stat__lbl">{t("games.gm_game.level")}</Typography>
        </Box>
        <Box className="gm-stat">
          <Typography className={`gm-stat__val${disp.timeLeft <= 10 && phase === "playing" ? " gm-stat__val--urgent" : ""}`}>
            {disp.timeLeft}s
          </Typography>
          <Typography className="gm-stat__lbl">{t("games.gm_game.time")}</Typography>
        </Box>
      </Box>

      {/* Canvas + overlays */}
      <Box className="gm-canvas-wrap">
        <canvas ref={canvasRef} className="gm-canvas" onClick={shoot} />

        {phase === "idle" && (
          <Box className="gm-overlay">
            <Typography className="gm-overlay__title">⛏️ {t("games.gm_game.title_screen")}</Typography>
            <Typography className="gm-overlay__sub">{t("games.gm_game.how_to")}</Typography>
          </Box>
        )}
        {phase === "levelup" && (
          <Box className="gm-overlay gm-overlay--success">
            <Typography className="gm-overlay__title">🎉 {t("games.gm_game.level_clear")}</Typography>
            <Typography className="gm-overlay__sub">
              {t("games.gm_game.level_score", { score: disp.levelScore })}
            </Typography>
          </Box>
        )}
        {phase === "levelover" && (
          <Box className="gm-overlay gm-overlay--fail">
            <Typography className="gm-overlay__title">⏰ {t("games.gm_game.time_up")}</Typography>
            <Typography className="gm-overlay__sub">
              {t("games.gm_game.needed", { target })}
            </Typography>
          </Box>
        )}
        {phase === "win" && (
          <Box className="gm-overlay gm-overlay--success">
            <Typography className="gm-overlay__title">🏆 {t("games.gm_game.win")}</Typography>
            <Typography className="gm-overlay__sub">
              {t("games.gm_game.final", { score: disp.score })}
            </Typography>
          </Box>
        )}
      </Box>

      <Typography className="gm-hs">{t("games.gm_game.best")}: {hs}</Typography>

      {/* Action buttons */}
      {phase === "playing" && (
        <Button variant="contained" onClick={shoot} fullWidth className="gm-shoot-btn">
          🪝 {t("games.gm_game.shoot")}
        </Button>
      )}
      {phase === "idle" && (
        <GameResetButton onClick={startGame} label={t("games.gm_game.start")} />
      )}
      {phase === "levelup" && (
        <GameResetButton onClick={nextLevel} label={`${t("games.gm_game.next_level")} →`} />
      )}
      {(phase === "levelover" || phase === "win") && (
        <GameResetButton onClick={startGame} label={t("games.mem_game.play_again")} />
      )}
    </Box>
  );
}
