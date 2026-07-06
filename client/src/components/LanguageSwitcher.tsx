import React, { JSX } from "react";
import { IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher(): JSX.Element {
  const { i18n } = useTranslation();
  const isFr = i18n.language?.startsWith("fr");

  return (
    <IconButton
      onClick={() => i18n.changeLanguage(isFr ? "en" : "fr")}
      size="small"
      aria-label={isFr ? "Switch to English" : "Passer en français"}
      sx={{
        fontSize: "1.3rem",
        borderRadius: "4px 6px 4px 6px",
        width: 36,
        height: 36,
        "&:hover": { background: "#fef9c3" },
      }}
    >
      {isFr ? "🇬🇧" : "🇫🇷"}
    </IconButton>
  );
}
