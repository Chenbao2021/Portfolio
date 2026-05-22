import React, { JSX } from "react";
import { Button } from "@mui/material";

interface Props {
  onClick: () => void;
  label?: string;
}

export default function GameResetButton({ onClick, label = "Play again ↺" }: Props): JSX.Element {
  return (
    <Button variant="outlined" size="small" onClick={onClick} fullWidth>
      {label}
    </Button>
  );
}
