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
import "./Navbar.less";

const HamburgerIcon = () => (
  <svg width="30" height="30" viewBox="0 0 22 22" fill="none">
    <line x1="3" y1="6" x2="19" y2="6" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" />
    <line x1="3" y1="11" x2="19" y2="11" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" />
    <line x1="3" y1="16" x2="19" y2="16" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CloseIconSvg = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <line x1="4" y1="4" x2="16" y2="16" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="4" x2="4" y2="16" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" />
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
        className={`navbar-appbar${scrolled ? " is-scrolled" : ""}`}
      >
        <Container maxWidth="lg">
          <Box className="navbar-inner">
            <Typography component={Link} to="/" className="navbar-logo">
              Chen.dev ✏️
            </Typography>

            <Box component="nav" className="navbar-desktop-nav">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Button
                    key={link.label}
                    component={Link}
                    to={link.to}
                    variant="text"
                    className={`navbar-link${isActive ? " is-active" : ""}`}
                  >
                    {link.label}
                  </Button>
                );
              })}
            </Box>

            <IconButton
              className="navbar-hamburger"
              onClick={openDrawer}
              aria-label="open menu"
            >
              <HamburgerIcon />
            </IconButton>
          </Box>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={closeDrawer}
        PaperProps={{ className: "navbar-drawer-paper" }}
      >
        <Box className="navbar-drawer-header">
          <Typography className="navbar-drawer-logo">Chen.dev ✏️</Typography>
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
                  className={`navbar-drawer-link${isActive ? " is-active" : ""}`}
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
