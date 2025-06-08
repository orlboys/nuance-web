"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  TextField,
  Chip,
  Divider,
  CircularProgress,
} from "@mui/material";
// import { BiasMeter } from "@/components/ui/bias-meter";
import { BiasMeter } from "../ui/bias-meter";
import ShinyText from "../ui/ShinyText";

export function Demo() {
  const [inputText, setInputText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | {
    bias: number;
    keywords: string[];
  }>(null);

  const handleAnalyze = () => {
    if (!inputText.trim()) return;

    setAnalyzing(true);

    // Simulate analysis with a delay
    setTimeout(() => {
      // Generate a random bias score between -50 and 50
      const bias = Math.floor(Math.random() * 100) - 50;

      // Extract some "keywords" from the input text
      const words = inputText.split(" ");
      const keywords = words
        .filter((word) => word.length > 4)
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.min(3, words.length));

      setResult({ bias, keywords });
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <Box sx={{ py: 8, bgcolor: "background.default" }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{ mb: 6, fontWeight: 700 }}
          >
            Try It Yourself
          </Typography>
          <Card elevation={3}>
            <CardContent sx={{ p: 4 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                placeholder="Paste any text to analyze for political bias..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                sx={{ mb: 3 }}
              />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleAnalyze}
                    disabled={analyzing || !inputText.trim()}
                    startIcon={
                      analyzing ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : null
                    }
                  >
                    {" "}
                    <ShinyText
                      text={analyzing ? "Analyzing..." : "Analyze Text"}
                      disabled={!!inputText.trim()}
                      color={inputText.trim() ? "primary" : undefined}
                    />
                  </Button>
                </motion.div>
              </Box>

              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Divider sx={{ my: 4 }} />
                    <Typography variant="h6" gutterBottom>
                      Analysis Results
                    </Typography>
                    <BiasMeter value={result.bias} />
                    <Box sx={{ mt: 4 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Key Phrases Detected:
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {result.keywords.map((keyword, i) => (
                          <Chip
                            key={i}
                            label={keyword}
                            size="small"
                            color="primary"
                          />
                        ))}
                      </Box>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
}
