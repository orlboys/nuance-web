"use client";

import { useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { Hero } from "@/components/landing/hero";
import { Demo } from "@/components/landing/demo";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Testimonials } from "@/components/landing/testimonials";
import { CTA } from "@/components/landing/cta";
import { Box, Stack } from "@mui/material";

export default function LandingPage() {
  const theme = useTheme();
  const demoRef = useRef<HTMLDivElement>(null);

  const scrollToDemo = () => {
    demoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Stack
      component="main"
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: "100vh",
      }}
    >
      <Hero onScrollToDemo={scrollToDemo} />
      <Box component="section" ref={demoRef}>
        <Demo />
      </Box>
      <Box component="section">
        <Features />
      </Box>
      <Box component="section">
        <HowItWorks />
      </Box>
      <Box component="section">
        <Testimonials />
      </Box>
      <Box component="section">
        <CTA />
      </Box>
    </Stack>
  );
}
