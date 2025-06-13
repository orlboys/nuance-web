"use client";

import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Stack,
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
} from "@mui/material";
import { Title } from "./components/Title";
import { BiasResultCard } from "./components/BiasResult";
import { motion } from "framer-motion";
import ShinyText from "@/components/ui/ShinyText";

export default function ResultsPage() {
  const theme = useTheme();

  const [text, setText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  type BiasResult = { bias: number; keywords: string[] };
  const [result, setResult] = useState<BiasResult | null>(null);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    // Simulate an API call to analyze bias
    // Replace this with your actual API call logic
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
    }, 2000); // Simulate a delay for analysis
    setResult({
      bias: Math.floor(Math.random() * 100), // Simulated bias score
      keywords: text.split(" ").slice(0, 3), // Simulated keywords
    });

    //   try {
    //     const response = await fetch("/api/analyze", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ text }),
    //     });
    //     const data = await response.json();
    //     setResult(data);
    //   } catch (err) {
    //     console.error("Error analyzing bias:", err);
    //   }
  };

  return (
    <Stack
      component="main"
      alignItems="center"
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: "100vh",
        width: "100vw",
        py: 4,
      }}
    >
      <Container>
        <Grid container spacing={4}>
          {/* Title */}
          <Grid size={12} sx={{ mt: 4, mb: 2 }}>
            <Title />
          </Grid>

          {/* Input Text and Bias Analysis Side-by-Side */}
          <Grid container spacing={4} width={"100%"}>
            {/* Left side: Analyzed Text */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" mb={3}>
                Enter Text to Analyze
              </Typography>
              <TextField
                label="Your text"
                multiline
                rows={10}
                fullWidth
                variant="outlined"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleSubmit}
                    disabled={!text.trim()}
                  >
                    <ShinyText
                      text={analyzing ? "Analyzing..." : "Analyze Text"}
                      disabled={!!text.trim()}
                      color={text.trim() ? "primary" : undefined}
                    />
                  </Button>
                </motion.div>
              </Box>
            </Grid>

            {/* Right side: Result */}
            <Grid size={{ xs: 12, md: 6 }}>
              {result ? (
                <BiasResultCard value={result.bias} />
              ) : (
                <Typography variant="body1" color="text.secondary">
                  The bias analysis result will appear here after submission.
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Alert
          severity={"info"}
          sx={{ maxWidth: "90%", mx: "auto", mt: 4 }}
          variant="outlined"
          icon={false}
        >
          <Typography variant="body2" color="text.secondary">
            This tool is for educational purposes only. It does not claim to
            provide professional Bias Analysis or Legal Advice. Always
            double-check results and consult with a qualified professional for
            serious matters.
          </Typography>
        </Alert>
      </Container>
    </Stack>
  );
}
