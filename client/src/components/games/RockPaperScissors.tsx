import React, { useState, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import GameScoreRow from "./GameScoreRow";
import GameResetButton from "./GameResetButton";
import "./RockPaperScissors.less";

type Choice = "rock" | "paper" | "scissors";
type Phase = "p1" | "p2" | "result";

interface Score {
  p1: number;
  p2: number;
}

const OPTIONS: { value: Choice; emoji: string; key: string }[] = [
  { value: "rock",     emoji: "🪨", key: "rock"     },
  { value: "paper",    emoji: "📄", key: "paper"    },
  { value: "scissors", emoji: "✂️", key: "scissors" },
];

const BEATS: Record<Choice, Choice> = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

function getResult(p1: Choice, p2: Choice): "p1" | "p2" | "draw" {
  if (p1 === p2) return "draw";
  return BEATS[p1] === p2 ? "p1" : "p2";
}

export default function RockPaperScissors(): JSX.Element {
  const [phase, setPhase] = useState<Phase>("p1");
  const [p1Choice, setP1Choice] = useState<Choice | null>(null);
  const [p2Choice, setP2Choice] = useState<Choice | null>(null);
  const [score, setScore] = useState<Score>({ p1: 0, p2: 0 });
  const { t } = useTranslation();

  const handleP1 = useCallback((choice: Choice) => {
    setP1Choice(choice);
    setPhase("p2");
  }, []);

  const handleP2 = useCallback((choice: Choice) => {
    setP2Choice(choice);
    setPhase("result");
    const r = getResult(p1Choice!, choice);
    if (r === "p1") setScore((s) => ({ ...s, p1: s.p1 + 1 }));
    if (r === "p2") setScore((s) => ({ ...s, p2: s.p2 + 1 }));
  }, [p1Choice]);

  const reset = useCallback(() => {
    setPhase("p1");
    setP1Choice(null);
    setP2Choice(null);
  }, []);

  const result = phase === "result" && p1Choice && p2Choice ? getResult(p1Choice, p2Choice) : null;
  const resultText =
    result === "p1" ? t("games.rps_game.p1_wins")
    : result === "p2" ? t("games.rps_game.p2_wins")
    : result === "draw" ? t("games.rps_game.draw")
    : "";

  return (
    <Box>
      <GameScoreRow
        left={`${t("games.rps_game.p1")}: ${score.p1}`}
        right={`${t("games.rps_game.p2")}: ${score.p2}`}
      />

      {phase === "p1" && (
        <Box>
          <Typography className="rps-prompt">{t("games.rps_game.p1_pick")}</Typography>
          <Box className="rps-choices">
            {OPTIONS.map((o) => (
              <Box key={o.value} onClick={() => handleP1(o.value)} className="rps-choice rps-choice--p1">
                <Typography className="rps-choice__emoji">{o.emoji}</Typography>
                <Typography className="rps-choice__label">{t(`games.rps_game.${o.key}`)}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {phase === "p2" && (
        <Box>
          <Box className="rps-p1-hidden">
            <Typography className="rps-p1-hidden__icon">🫥</Typography>
            <Typography className="rps-p1-hidden__text">{t("games.rps_game.p1_hidden")}</Typography>
          </Box>
          <Typography className="rps-prompt">{t("games.rps_game.p2_pick")}</Typography>
          <Box className="rps-choices">
            {OPTIONS.map((o) => (
              <Box key={o.value} onClick={() => handleP2(o.value)} className="rps-choice rps-choice--p2">
                <Typography className="rps-choice__emoji">{o.emoji}</Typography>
                <Typography className="rps-choice__label">{t(`games.rps_game.${o.key}`)}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {phase === "result" && p1Choice && p2Choice && (
        <Box>
          <Box className="rps-reveal">
            <Box className="rps-reveal__player">
              <Typography className="rps-reveal__emoji">
                {OPTIONS.find((o) => o.value === p1Choice)!.emoji}
              </Typography>
              <Typography className="rps-reveal__name">{t("games.rps_game.p1")}</Typography>
            </Box>
            <Typography className="rps-reveal__vs">vs</Typography>
            <Box className="rps-reveal__player">
              <Typography className="rps-reveal__emoji">
                {OPTIONS.find((o) => o.value === p2Choice)!.emoji}
              </Typography>
              <Typography className="rps-reveal__name">{t("games.rps_game.p2")}</Typography>
            </Box>
          </Box>

          <Typography className={`rps-result ${result === "draw" ? "rps-result--draw" : "rps-result--winner"}`}>
            {resultText}
          </Typography>

          <GameResetButton onClick={reset} label={t("games.mem_game.play_again")} />
        </Box>
      )}
    </Box>
  );
}
