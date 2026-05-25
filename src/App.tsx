import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'
import './App.less'
import Navbar from './components/Navbar'

const Hero = React.lazy(() => import('./components/Hero'))
const About = React.lazy(() => import('./components/About'))
const Skills = React.lazy(() => import('./components/Skills'))
const Projects = React.lazy(() => import('./components/Projects'))
const LearningNotes = React.lazy(() => import('./components/LearningNotes'))
const WorkPhilosophy = React.lazy(() => import('./components/WorkPhilosophy'))
const Games = React.lazy(() => import('./components/Games'))
const Contact = React.lazy(() => import('./components/Contact'))
const NotePage = React.lazy(() => import('./pages/NotePage'))

const theme = createTheme({
  palette: {
    background: { default: '#faf9f7', paper: '#ffffff' },
    text: { primary: '#2d2d2d', secondary: '#6b7280' },
    primary: { main: '#2d2d2d' },
    secondary: { main: '#ca8a04' },
  },
  typography: {
    fontFamily: '"Nunito", sans-serif',
    h1: { fontFamily: '"Caveat", cursive', fontWeight: 700 },
    h2: { fontFamily: '"Caveat", cursive', fontWeight: 700 },
    h3: { fontFamily: '"Caveat", cursive', fontWeight: 600 },
    h4: { fontFamily: '"Caveat", cursive', fontWeight: 600 },
    h5: { fontFamily: '"Caveat", cursive', fontWeight: 600 },
    h6: { fontFamily: '"Caveat", cursive', fontWeight: 500 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: { body: { backgroundColor: '#faf9f7' } },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: '"Caveat", cursive',
          fontSize: '1.1rem',
          fontWeight: 600,
          transition: 'all 0.15s ease',
          lineHeight: 1.4,
        },
        outlined: {
          borderWidth: '2px',
          borderRadius: '4px 9px 6px 4px',
          boxShadow: '3px 3px 0 rgba(0,0,0,0.12)',
          '&:hover': {
            borderWidth: '2px',
            transform: 'translateY(-2px)',
            boxShadow: '5px 5px 0 rgba(0,0,0,0.15)',
          },
        },
        contained: {
          borderRadius: '4px 9px 6px 4px',
          border: '2px solid #2d2d2d',
          boxShadow: '3px 3px 0 rgba(0,0,0,0.12)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '5px 5px 0 rgba(0,0,0,0.15)',
          },
        },
        text: {
          '&:hover': { backgroundColor: '#fef9c3' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"Nunito", sans-serif',
          fontWeight: 600,
          fontSize: '0.78rem',
        },
      },
    },
  },
})

function ScrollToTop(): null {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout(): JSX.Element {
  return (
    <Box className="app-layout">
      <ScrollToTop />
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
    </Box>
  )
}

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<Box sx={{ minHeight: '100vh' }} />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Hero />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/notes" element={<LearningNotes />} />
              <Route path="/notes/:slug" element={<NotePage />} />
              <Route path="/philosophy" element={<WorkPhilosophy />} />
              <Route path="/games" element={<Games />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Routes>
        </Suspense>
      </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  )
}
