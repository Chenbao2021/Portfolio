import React, { JSX, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Chip,
  Button,
  Stack,
  Dialog,
} from "@mui/material";
import { projects, Project } from "../data/projects";
import SectionHeader from "./SectionHeader";
import "./Projects.less";

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={!!project}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      disableScrollLock
      PaperProps={{ className: "projects-modal" }}
    >
      {project && (
        <>
          <Box
            className={`projects-modal__strip projects-modal__strip--${project.colorKey}`}
          >
            <Typography className="projects-card__emoji">
              {project.emoji}
            </Typography>
            <Box sx={{ flex: 1 }}>
              <Typography className="projects-modal__name">
                {project.name}
              </Typography>
              <Typography
                variant="body2"
                className="projects-card__tagline"
              >
                {project.tagline}
              </Typography>
            </Box>
            <button className="projects-modal__close" onClick={onClose}>
              ✕
            </button>
          </Box>

          <Box className="projects-modal__body">
            <Box>
              <Typography
                variant="caption"
                className="projects-card__why-label"
              >
                Why I built it
              </Typography>
              <Typography
                variant="body2"
                className="projects-modal__why-text"
              >
                {project.why}
              </Typography>
            </Box>

            {project.description && (
              <Box>
                <Typography
                  variant="caption"
                  className="projects-card__why-label"
                >
                  Description
                </Typography>
                <Box className="projects-card__description-lines">
                  {project.description.map((line, i) => (
                    <Box key={i} className="projects-card__description-row">
                      <Typography
                        variant="body2"
                        className="projects-modal__description-line"
                      >
                        {line}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            <Box className={`projects-modal__lesson projects-modal__lesson--${project.colorKey}`}>
              <Typography
                variant="caption"
                className="projects-card__lesson-label"
              >
                💡 Lesson learned
              </Typography>
              <Typography
                variant="body2"
                className="projects-modal__lesson-text"
              >
                {project.lesson}
              </Typography>
            </Box>

            <Box>
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
        </>
      )}
    </Dialog>
  );
}

function ProjectGrid({ items }: { items: typeof projects }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <Box className="projects-grid">
        {items.map((project) => (
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
                {project.description && (
                  <Box className="projects-card__description">
                    <Box className="projects-card__description-header">
                      <Typography
                        variant="caption"
                        className="projects-card__why-label"
                      >
                        Description
                      </Typography>
                      <button
                        className="projects-card__why-toggle"
                        onClick={() => setSelectedProject(project)}
                      >
                        +
                      </button>
                    </Box>
                  </Box>
                )}
              </Box>

              <Box className={`projects-card__lesson projects-card__lesson--${project.colorKey}`}>
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
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

export default function Projects(): JSX.Element {
  const professional = projects.filter((p) => p.professional === true);
  const personal = projects.filter((p) => p.professional === false);

  return (
    <Box component="section" id="projects" className="projects-section">
      <Container maxWidth="lg">
        <SectionHeader
          className="projects-header"
          title="Projects 📌"
          subtitle="things I actually finished (and a few I'm still tweaking)"
        />

        {professional.length > 0 && (
          <Box className="projects-category">
            <Typography variant="h6" className="projects-category__title">
              💼 Professional
            </Typography>
            <ProjectGrid items={professional} />
          </Box>
        )}

        {personal.length > 0 && (
          <Box className="projects-category">
            <Typography variant="h6" className="projects-category__title">
              🧪 Personal
            </Typography>
            <ProjectGrid items={personal} />
          </Box>
        )}
      </Container>
    </Box>
  );
}
