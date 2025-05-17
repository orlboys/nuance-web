"use client";

import { useRef } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Hero } from "@/components/landing/hero";
import { Demo } from "@/components/landing/demo";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Testimonials } from "@/components/landing/testimonials";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { Box } from "@mui/material";

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});

export default function LandingPage() {
  const demoRef = useRef<HTMLDivElement>(null);

  const scrollToDemo = () => {
    demoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ bgcolor: "background.default", color: "text.primary" }}>
        <Hero onScrollToDemo={scrollToDemo} />
        <Box ref={demoRef}>
          <Demo />
        </Box>
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
