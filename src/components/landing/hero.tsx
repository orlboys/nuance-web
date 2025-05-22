"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";
import { BiasMeter } from "@/components/ui/bias-meter";

// Example analysis results
const exampleTexts = [
  {
    text: "We need to increase government spending on social programs to help those in need.",
    bias: -30,
  },
  {
    text: "Lower taxes and reduced regulations will stimulate economic growth and create jobs.",
    bias: 35,
  },
  {
    text: "Research shows that climate change is affecting weather patterns globally.",
    bias: -5,
  },
  {
    text: "Universal healthcare should be a basic right for every citizen.",
    bias: -40,
  },
  {
    text: "Strong national borders are essential for maintaining our country’s safety and identity.",
    bias: 45,
  },
  {
    text: "Corporations should be held accountable for their carbon emissions.",
    bias: -25,
  },
  {
    text: "Encouraging small business growth is vital for a healthy economy.",
    bias: 5,
  },
  {
    text: "Financial literacy should be taught in schools to better prepare students for adulthood.",
    bias: 0,
  },
  {
    text: "Gun ownership is a fundamental freedom protected by the Constitution.",
    bias: 40,
  },
  {
    text: "Diversity and inclusion initiatives are necessary to address systemic inequality.",
    bias: -20,
  },
];

interface HeroProps {
  onScrollToDemo: () => void;
}

export function Hero({ onScrollToDemo }: HeroProps) {
  const [activeExample, setActiveExample] = useState(0);

  useEffect(() => {
    // Cycle through examples
    const interval = setInterval(() => {
      setActiveExample((prev) => (prev + 1) % exampleTexts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center" columns={12}>
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  background:
                    "linear-gradient(90deg, #f44336 0%, #9c27b0 50%, #2196f3 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                }}
              >
                Uncover Political Bias
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 4, fontWeight: 300, color: "text.secondary" }}
              >
                AI-powered analysis to reveal hidden bias in any text
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={onScrollToDemo}
                  >
                    Try It Now
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    color="primary"
                    component={Link}
                    href="/signup"
                    sx={{ textDecoration: "none" }}
                  >
                    Sign Up Free
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card elevation={3}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }} gutterBottom>
                    Example Analysis
                  </Typography>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeExample}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ mb: 2, minHeight: "80px" }}
                      >
                        &quot;{exampleTexts[activeExample].text}&quot;
                      </Typography>
                      <BiasMeter value={exampleTexts[activeExample].bias} />
                      <Box sx={{ mt: 2 }}>
                        <Chip
                          label={`Bias Score: ${exampleTexts[activeExample].bias}`}
                          color={
                            exampleTexts[activeExample].bias > 0
                              ? "success"
                              : "error"
                          }
                          variant="outlined"
                        />
                      </Box>
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
          Scroll to explore
        </Typography>
        <KeyboardArrowDownIcon color="action" />
      </motion.div>
    </Box>
  );
}
