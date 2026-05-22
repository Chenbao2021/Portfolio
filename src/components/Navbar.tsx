import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
} from "@mui/material";

const HamburgerIcon = () => (
  <svg width="30" height="30" viewBox="0 0 22 22" fill="none">
    <line
      x1="3"
      y1="6"
      x2="19"
      y2="6"
      stroke="#2d2d2d"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="3"
      y1="11"
      x2="19"
      y2="11"
      stroke="#2d2d2d"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="3"
      y1="16"
      x2="19"
      y2="16"
      stroke="#2d2d2d"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIconSvg = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <line
      x1="4"
      y1="4"
      x2="16"
      y2="16"
      stroke="#2d2d2d"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="16"
      y1="4"
      x2="4"
      y2="16"
      stroke="#2d2d2d"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const navLinks: { label: string; to: string }[] = [
  { label: "About", to: "/about" },
  { label: "Skills", to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "Notes", to: "/notes" },
  { label: "Philosophy", to: "/philosophy" },
  { label: "Games", to: "/games" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const onScroll = useCallback(() => setScrolled(window.scrollY > 24), []);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled ? "rgba(250,249,247,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          borderBottom: scrolled ? "2px solid #2d2d2d" : "none",
          boxShadow: scrolled ? "0 2px 0 rgba(0,0,0,0.04)" : "none",
          transition: "all 0.25s ease",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 64,
            }}
          >
            {/* Logo */}
            <Typography
              component={Link}
              to="/"
              sx={{
                fontFamily: '"Caveat", cursive',
                fontWeight: 700,
                fontSize: "1.7rem",
                color: "#2d2d2d",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              Chen.dev ✏️
            </Typography>

            {/* Desktop nav */}
            <Box
              component="nav"
              sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}
            >
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Button
                    key={link.label}
                    component={Link}
                    to={link.to}
                    variant="text"
                    sx={{
                      color: "#2d2d2d",
                      fontFamily: '"Caveat", cursive',
                      fontSize: "1.2rem",
                      px: 1.5,
                      py: 0.8,
                      borderRadius: "4px 6px 4px 6px",
                      bgcolor: isActive ? "#fef9c3" : "transparent",
                      textDecoration: isActive ? "underline" : "none",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    {link.label}
                  </Button>
                );
              })}
            </Box>

            {/* Mobile hamburger */}
            <IconButton
              sx={{ display: { md: "none" }, color: "#2d2d2d" }}
              onClick={openDrawer}
              aria-label="open menu"
            >
              <HamburgerIcon />
            </IconButton>
          </Box>
        </Container>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            width: 240,
            bgcolor: "#faf9f7",
            borderLeft: "2px solid #2d2d2d",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1.5px dashed #d1d5db",
            mb: 1,
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Caveat", cursive',
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "#2d2d2d",
            }}
          >
            Chen.dev ✏️
          </Typography>
          <IconButton onClick={closeDrawer} size="small">
            <CloseIconSvg />
          </IconButton>
        </Box>
        <List>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <ListItem key={link.label} disablePadding>
                <ListItemButton
                  component={Link}
                  to={link.to}
                  onClick={closeDrawer}
                  sx={{
                    "&:hover": { bgcolor: "#fef9c3" },
                    bgcolor: isActive ? "#fef9c3" : "transparent",
                    borderRadius: 1,
                    mx: 1,
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{
                      fontFamily: '"Caveat", cursive',
                      fontSize: "1.3rem",
                      fontWeight: 600,
                      color: "#2d2d2d",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}
