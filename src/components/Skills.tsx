import React from "react";
import { Box, Typography, Container, Chip } from "@mui/material";
import { categories } from "../data/skills";
import "./Skills.less";
import { JSX } from "@emotion/react/jsx-dev-runtime";

export default function Skills(): JSX.Element {
  return (
    <Box component="section" id="skills" className="skills-section">
      <Container maxWidth="lg">
        <Box className="skills-header">
          <Box className="skills-header__badge">
            <Typography className="skills-header__badge-text">
              my toolbox
            </Typography>
          </Box>
          <Typography variant="h2" className="skills-title">
            Skills & Tools 🧰
          </Typography>
          <Typography variant="body1" className="skills-subtitle">
            things I actually use, not things I put on a resumé and forgot about
          </Typography>
        </Box>

        <Box className="skills-grid">
          {categories.map((cat) => (
            <Box key={cat.name} className={`skills-cat skills-cat--${cat.colorKey}`}>
              <Box className="skills-cat__header">
                <Typography className="skills-cat__icon">{cat.icon}</Typography>
                <Typography variant="h6" className="skills-cat__name">
                  {cat.name}
                </Typography>
              </Box>
              <Box className="skills-cat__chips">
                {cat.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    size="small"
                    className="skills-chip"
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Box className="skills-footer">
          <Typography className="skills-footer__text">
            ✏️ Always adding to this list. Ask me about recent obsessions.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
