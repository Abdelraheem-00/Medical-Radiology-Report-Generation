import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import ReportGenerationPage from './pages/ReportGenerationPage.jsx';
import AboutUsPage from './pages/AboutUsPage.jsx';
import TechnologyPage from './pages/TechnologyPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import MockModeIndicator from './components/MockModeIndicator.jsx';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1e3a8a',
      light: '#3b82f6',
      dark: '#1e40af',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#60a5fa',
      light: '#93c5fd',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0f172a',
      paper: 'rgba(30, 58, 138, 0.1)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cbd5e1',
    },
    success: { main: '#22c55e' },
    warning: { main: '#f59e0b' },
    info: { main: '#3b82f6' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '4.25rem',
      letterSpacing: '-0.03em',
      lineHeight: 1.05,
    },
    h2: {
      fontWeight: 700,
      fontSize: '3.25rem',
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
    },
    h3: {
      fontWeight: 700,
      fontSize: '2.25rem',
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.75rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.375rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.15rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'radial-gradient(ellipse at top, rgba(30, 58, 138, 0.2) 0%, rgba(15, 23, 42, 1) 50%), linear-gradient(180deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%)',
          minHeight: '100vh',
          overflowX: 'hidden',
        },
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: '#1e3a8a transparent',
        },
        '*::-webkit-scrollbar': {
          width: '6px',
        },
        '*::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '*::-webkit-scrollbar-thumb': {
          background: '#1e3a8a',
          borderRadius: '3px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(30, 58, 138, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(30, 58, 138, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          boxShadow: '0 8px 32px rgba(30, 58, 138, 0.3)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 700,
          padding: '10px 24px',
        },
        contained: {
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
          color: '#ffffff',
          boxShadow: '0 4px 20px rgba(30, 58, 138, 0.4)',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
            boxShadow: '0 6px 25px rgba(30, 58, 138, 0.5)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderColor: 'rgba(59, 130, 246, 0.5)',
          color: '#ffffff',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
          '&:hover': { 
            borderColor: 'rgba(59, 130, 246, 0.8)', 
            background: 'rgba(30, 58, 138, 0.1)' 
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/reports" element={<ReportGenerationPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Layout>
        <MockModeIndicator />
      </Router>
    </ThemeProvider>
  );
}

export default App;