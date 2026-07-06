import { JSX } from "react";

function seededRNG(seed: number) {
  let s = seed;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  delay: number;
  duration: number;
  tailLength: number;
  color: string;
  thickness: number;
}

const COLORS = [
  "#fde047",
  "#fef9c3",
  "#ca8a04",
  "#fde047",
  "#ffffff",
  "#fef9c3",
];

const rng = seededRNG(9372);
const SHOOTING_STARS: ShootingStar[] = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  startX: rng() * 80,
  startY: rng() * 55,
  delay: (i * 0.9 + rng() * 5) % 9,
  duration: 1.8 + rng() * 1.6,
  tailLength: 90 + rng() * 140,
  color: COLORS[Math.floor(rng() * COLORS.length)],
  thickness: 1 + rng() * 1.5,
}));

export default function StarField(): JSX.Element {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {SHOOTING_STARS.map((star) => (
        <div
          key={star.id}
          style={{
            position: "absolute",
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            width: star.tailLength,
            height: star.thickness,
            borderRadius: star.thickness,
            background: `linear-gradient(to right, transparent, ${star.color} 70%, white)`,
            opacity: 0,
            animation: `shootingStar ${star.duration}s ease-in ${star.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
