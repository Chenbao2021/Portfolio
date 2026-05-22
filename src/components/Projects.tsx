import React, { JSX } from "react";
import { Box, Typography, Container, Chip, Button, Stack } from "@mui/material";
import { projects } from "../data/projects";
import "./Projects.less";

export default function Projects(): JSX.Element {
  return (
    <Box component="section" id="projects" className="projects-section">
      <Container maxWidth="lg">
        <Box className="projects-header">
          <Typography variant="h2" className="projects-title">
            Projects 📌
          </Typography>
          <Typography variant="body1" className="projects-subtitle">
            things I actually finished (and a few I'm still tweaking)
          </Typography>
        </Box>

        <Box className="projects-grid">
          {projects.map((project) => (
            <Box
              key={project.name}
              className={`projects-card projects-card--${project.colorKey}`}
            >
              <Box className="projects-card__strip">
                <Typography className="projects-card__emoji">
                  {project.emoji}
                </Typography>
                <Box>
                  <Typography variant="h5" className="projects-card__name">
                    {project.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="projects-card__tagline"
                  >
                    {project.tagline}
                  </Typography>
                </Box>
              </Box>

              <Box className="projects-card__body">
                <Box className="projects-card__why">
                  <Typography
                    variant="caption"
                    className="projects-card__why-label"
                  >
                    Why I built it
                  </Typography>
                  <Typography
                    variant="body2"
                    className="projects-card__why-text"
                  >
                    {project.why}
                  </Typography>
                </Box>

                <Box className="projects-card__lesson">
                  <Typography
                    variant="caption"
                    className="projects-card__lesson-label"
                  >
                    💡 Lesson learned
                  </Typography>
                  <Typography
                    variant="body2"
                    className="projects-card__lesson-text"
                  >
                    {project.lesson}
                  </Typography>
                </Box>

                <Box className="projects-card__stack">
                  <Typography
                    variant="caption"
                    className="projects-card__stack-label"
                  >
                    Stack
                  </Typography>
                  <Box className="projects-card__chips">
                    {project.tech.map((t) => (
                      <Chip
                        key={t}
                        label={t}
                        size="small"
                        className="projects-chip"
                      />
                    ))}
                  </Box>
                </Box>

                <Typography variant="caption" className="projects-card__role">
                  My role: {project.role}
                </Typography>

                <Stack direction="row" spacing={1.5}>
                  {project.github && (
                    <Button
                      variant="outlined"
                      size="small"
                      href={project.github}
                      className="projects-card__btn-github"
                    >
                      GitHub →
                    </Button>
                  )}
                  {project.demo && (
                    <Button
                      variant="contained"
                      size="small"
                      href={project.demo}
                      className="projects-card__btn-demo"
                    >
                      Live Demo ↗
                    </Button>
                  )}
                </Stack>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
