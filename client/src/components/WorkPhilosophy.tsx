import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { principles } from "../data/workPhilosophy";
import "./WorkPhilosophy.less";
import { JSX } from "@emotion/react/jsx-dev-runtime";

export default function WorkPhilosophy(): JSX.Element {
  const { t } = useTranslation();
  const principleItems = t("philosophy.principles", {
    returnObjects: true,
  }) as { rule: string; note: string }[];

  return (
    <Box component="section" id="philosophy" className="philosophy-section">
      <Container maxWidth="lg">
        <Box className="philosophy-grid">
          {/* ── Left ── */}
          <Box>
            <Typography variant="h2" className="philosophy-title">
              {t("philosophy.title")}
            </Typography>
            {/* <Typography variant="body1" className="philosophy-intro">
              {t("philosophy.intro")}
            </Typography> */}

            <Box className="philosophy-blackboard">
              <Box className="philosophy-blackboard__dots">
                <Box className="philosophy-blackboard__dot philosophy-blackboard__dot--red" />
                <Box className="philosophy-blackboard__dot philosophy-blackboard__dot--amber" />
                <Box className="philosophy-blackboard__dot philosophy-blackboard__dot--green" />
              </Box>

              <Typography className="philosophy-blackboard__quote">
                {t("philosophy.quote")}
              </Typography>
              <Typography className="philosophy-blackboard__attribution">
                {t("philosophy.attribution")}
              </Typography>

              <Box aria-hidden className="philosophy-blackboard__chalk">
                <Box className="philosophy-blackboard__chalk-line" />
                <Box className="philosophy-blackboard__chalk-line" />
                <Box className="philosophy-blackboard__chalk-line" />
              </Box>
            </Box>

            <Box className="philosophy-sticky">
              <Typography className="philosophy-sticky__text">
                {t("philosophy.sticky")}
              </Typography>
            </Box>
          </Box>

          {/* ── Right ── */}
          <Box className="philosophy-principles">
            {principles.map((p) => (
              <Box key={p.index} className="philosophy-principle">
                <Typography className="philosophy-principle__emoji">
                  {p.emoji}
                </Typography>
                <Box>
                  <Typography className="philosophy-principle__rule">
                    {principleItems[p.index]?.rule}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="philosophy-principle__note"
                  >
                    {principleItems[p.index]?.note}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
