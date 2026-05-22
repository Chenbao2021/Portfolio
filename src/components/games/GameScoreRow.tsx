import React, { JSX } from "react";
import { Box, Typography } from "@mui/material";
import "./GameScoreRow.less";

interface Props {
  left: React.ReactNode;
  right: React.ReactNode;
}

export default function GameScoreRow({ left, right }: Props): JSX.Element {
  return (
    <Box className="game-score-row">
      <Typography className="game-score-text">{left}</Typography>
      <Typography className="game-score-text">{right}</Typography>
    </Box>
  );
}
