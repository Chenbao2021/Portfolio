import React, { JSX } from "react";
import { Box, Typography } from "@mui/material";
import "./SectionHeader.less";

interface Props {
  className?: string;
  badge?: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ className, badge, title, subtitle }: Props): JSX.Element {
  return (
    <Box className={className}>
      {badge && (
        <Box className="section-header__badge">
          <Typography className="section-header__badge-text">{badge}</Typography>
        </Box>
      )}
      <Typography variant="h2" className="section-header__title">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" className="section-header__subtitle">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
