import { Box, Typography, Container, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { categories } from "../data/skills";
import SectionHeader from "./SectionHeader";
import "./Skills.less";
import { JSX } from "@emotion/react/jsx-dev-runtime";

export default function Skills(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Box component="section" id="skills" className="skills-section">
      <Container maxWidth="lg">
        <SectionHeader
          className="skills-header"
          title={t("skills.title")}
          subtitle={t("skills.subtitle")}
        />
        <Box className="skills-grid">
          {categories.map((cat) => (
            <Box
              key={cat.key}
              className={`skills-cat skills-cat--${cat.colorKey}`}
            >
              <Box className="skills-cat__header">
                <Typography className="skills-cat__icon">{cat.icon}</Typography>
                <Typography variant="h6" className="skills-cat__name">
                  {t(`skills.categories.${cat.key}`)}
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
            {t("skills.footer")}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
