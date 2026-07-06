import React, { useState, useEffect, useCallback, JSX } from "react";
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
import { useTranslation } from "react-i18next";
import { navLinks } from "../data/navbar";
import LanguageSwitcher from "./LanguageSwitcher";
import "./Navbar.less";

const HamburgerIcon = (): JSX.Element => (
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

const CloseIconSvg = (): JSX.Element => (
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

export default function Navbar(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

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
                    {t(`navbar.${link.label.toLowerCase()}`)}
                  </Button>
                );
              })}
              {/* Desktop: switcher juste après les liens */}
              <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", ml: 1 }}>
                <LanguageSwitcher />
              </Box>
            </Box>

            {/* Mobile: switcher à gauche du hamburger */}
            <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
              <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
                <LanguageSwitcher />
              </Box>
              <IconButton
                className="navbar-hamburger"
                onClick={openDrawer}
                aria-label="open menu"
              >
                <HamburgerIcon />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={closeDrawer}
        disableScrollLock
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
                    primary={t(`navbar.${link.label.toLowerCase()}`)}
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
        <Box sx={{ p: 2, borderTop: "1.5px dashed #d1d5db", mt: "auto" }}>
          <LanguageSwitcher />
        </Box>
      </Drawer>
    </>
  );
}
