import { useEffect, useRef, useState, JSX } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";

export default function NavigationProgress(): JSX.Element | null {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(true);
    timerRef.current = setTimeout(() => setVisible(false), 700);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "3px",
        width: "100%",
        zIndex: 9999,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: "100%",
          background: "linear-gradient(90deg, #ca8a04 60%, #fbbf24 100%)",
          animation: "navProgressFill 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          boxShadow: "0 0 8px rgba(202,138,4,0.5)",
        }}
      />
    </Box>
  );
}
