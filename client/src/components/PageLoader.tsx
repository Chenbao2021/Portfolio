import { JSX } from "react";
import { Box, Typography } from "@mui/material";

export default function PageLoader(): JSX.Element {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: 52,
          height: 52,
          animation: "spinnerRotate 0.9s linear infinite",
        }}
      >
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle
            cx="26"
            cy="26"
            r="20"
            stroke="#e5e7eb"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle
            cx="26"
            cy="26"
            r="20"
            stroke="#ca8a04"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="32 94"
            strokeDashoffset="0"
          />
          <circle cx="26" cy="6" r="3" fill="#ca8a04" />
        </svg>
      </Box>
      <Typography
        sx={{
          fontFamily: '"Caveat", cursive',
          fontSize: "1.25rem",
          color: "#6b7280",
          letterSpacing: "0.02em",
        }}
      >
        Chargement...
      </Typography>
    </Box>
  );
}
