import React, { JSX, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Chip,
  Button,
  Stack,
  Dialog,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Project } from "../data/projects";
import SectionHeader from "./SectionHeader";
import "./Projects.less";

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const { t } = useTranslation();

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
              <Typography variant="body2" className="projects-card__tagline">
                {t(`projects.${project.key}.tagline`)}
              </Typography>
            </Box>
            <button className="projects-modal__close" onClick={onClose}>
              ✕
            </button>
          </Box>

          <Box className="projects-modal__body">
            <Box>
              <Typography variant="caption" className="projects-card__why-label">
                {t("projects.label_why")}
              </Typography>
              <Typography variant="body2" className="projects-modal__why-text">
                {t(`projects.${project.key}.why`)}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" className="projects-card__why-label">
                {t("projects.label_description")}
              </Typography>
              <Box className="projects-card__description-lines">
                {(t(`projects.${project.key}.description`, { returnObjects: true }) as string[]).map((line, i) => (
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

            <Box className={`projects-modal__lesson projects-modal__lesson--${project.colorKey}`}>
              <Typography variant="caption" className="projects-card__lesson-label">
                {t("projects.label_lesson")}
              </Typography>
              <Typography variant="body2" className="projects-modal__lesson-text">
                {t(`projects.${project.key}.lesson`)}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" className="projects-card__stack-label">
                {t("projects.label_stack")}
              </Typography>
              <Box className="projects-card__chips">
                {project.tech.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
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
                  target="_blank"
                  rel="noopener noreferrer"
                  className="projects-card__btn-github"
                >
                  {t("projects.btn_github")}
                </Button>
              )}
              {project.demo && (
                <Button
                  variant="contained"
                  size="small"
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="projects-card__btn-demo"
                >
                  {t("projects.btn_demo")}
                </Button>
              )}
            </Stack>
          </Box>
        </>
      )}
    </Dialog>
  );
}

function ProjectGrid({ items }: { items: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { t } = useTranslation();

  return (
    <>
      <Box className="projects-grid">
        {items.map((project) => (
          <Box
            key={project.key}
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
                <Typography variant="body2" className="projects-card__tagline">
                  {t(`projects.${project.key}.tagline`)}
                </Typography>
              </Box>
            </Box>

            <Box className="projects-card__body">
              <Box className="projects-card__why">
                <Typography variant="caption" className="projects-card__why-label">
                  {t("projects.label_why")}
                </Typography>
                <Typography variant="body2" className="projects-card__why-text">
                  {t(`projects.${project.key}.why`)}
                </Typography>
                <Box className="projects-card__description">
                  <Box className="projects-card__description-header">
                    <Typography variant="caption" className="projects-card__why-label">
                      {t("projects.label_description")}
                    </Typography>
                    <button
                      className="projects-card__why-toggle"
                      onClick={() => setSelectedProject(project)}
                    >
                      +
                    </button>
                  </Box>
                </Box>
              </Box>

              <Box className={`projects-card__lesson projects-card__lesson--${project.colorKey}`}>
                <Typography variant="caption" className="projects-card__lesson-label">
                  {t("projects.label_lesson")}
                </Typography>
                <Typography variant="body2" className="projects-card__lesson-text">
                  {t(`projects.${project.key}.lesson`)}
                </Typography>
              </Box>

              <Box className="projects-card__stack">
                <Typography variant="caption" className="projects-card__stack-label">
                  {t("projects.label_stack")}
                </Typography>
                <Box className="projects-card__chips">
                  {project.tech.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
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
                    target="_blank"
                    rel="noopener noreferrer"
                    className="projects-card__btn-github"
                  >
                    {t("projects.btn_github")}
                  </Button>
                )}
                {project.demo && (
                  <Button
                    variant="contained"
                    size="small"
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="projects-card__btn-demo"
                  >
                    {t("projects.btn_demo")}
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
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/projects`)
      .then((res) => res.json())
      .then((data) => {
        const mapped: Project[] = data.map((p: Record<string, unknown>) => ({
          key: p.key,
          name: p.name,
          tech: p.tech,
          role: p.role,
          github: p.github ?? undefined,
          demo: p.demo ?? undefined,
          colorKey: p.color_key,
          emoji: p.emoji,
          professional: p.professional,
        }));
        setProjects(mapped);
      })
      .catch((err) => console.error('Erreur fetch projects:', err))
      .finally(() => setLoading(false));
  }, []);

  const professional = projects.filter((p) => p.professional === true);
  const personal = projects.filter((p) => p.professional === false);

  if (loading) {
    return (
      <Box component="section" id="projects" className="projects-section">
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Container>
      </Box>
    );
  }

  return (
    <Box component="section" id="projects" className="projects-section">
      <Container maxWidth="lg">
        <SectionHeader
          className="projects-header"
          title={t("projects.title")}
          subtitle={t("projects.subtitle")}
        />

        {professional.length > 0 && (
          <Box className="projects-category">
            <Typography variant="h6" className="projects-category__title">
              {t("projects.label_professional")}
            </Typography>
            <ProjectGrid items={professional} />
          </Box>
        )}

        {personal.length > 0 && (
          <Box className="projects-category">
            <Typography variant="h6" className="projects-category__title">
              {t("projects.label_personal")}
            </Typography>
            <ProjectGrid items={personal} />
          </Box>
        )}
      </Container>
    </Box>
  );
}
