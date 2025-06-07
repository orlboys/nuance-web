"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  CircularProgress,
  Button,
  Card,
  CardContent,
  Divider,
  useTheme,
  Alert,
  Chip,
} from "@mui/material";
import { Meter } from "../../components/ui/Gauge";
import { ArrowBack, InfoOutlined, Share, Analytics } from "@mui/icons-material";
import router from "next/router";

export default function ResultsPage() {
  const theme = useTheme();
  const [biasValue, setBiasValue] = useState<number | null>(null);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const getBiasInfo = (value: number) => {
    if (value < 10)
      return {
        label: "Far Left",
        color: theme.palette.info.dark,
        severity: "high",
      };
    if (value < 35)
      return {
        label: "Left",
        color: theme.palette.info.main,
        severity: "medium",
      };
    if (value < 45)
      return {
        label: "Slightly Left",
        color: theme.palette.info.light,
        severity: "low",
      };
    if (value <= 55)
      return {
        label: "Neutral",
        color: theme.palette.success.main,
        severity: "neutral",
      };
    if (value <= 65)
      return {
        label: "Slightly Right",
        color: theme.palette.warning.light,
        severity: "low",
      };
    if (value <= 90)
      return {
        label: "Right",
        color: theme.palette.warning.main,
        severity: "medium",
      };
    return {
      label: "Far Right",
      color: theme.palette.error.main,
      severity: "high",
    };
  };

  // Simulate loading results - in a real app, this would come from your analysis
  useEffect(() => {
    const timer = setTimeout(() => {
      // Example bias value between -100 (far left) and 100 (far right)
      const randomBias = Math.floor(Math.random() * 100);
      setBiasValue(randomBias);
      setText(
        "The government should provide universal healthcare to all citizens regardless of their ability to pay, as access to healthcare is a fundamental human right that should not be determined by one's economic status."
      );
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const biasInfo = biasValue !== null ? getBiasInfo(biasValue) : null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
          Political Bias Analysis
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Results
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Our AI has analyzed your text for political bias using ethical
          programming principles
        </Typography>
      </Box>
      {/* Main Result Display */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          mb: 4,
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
        }}
      >
        {/* Analyzed Text Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Analytics color="primary" />
            Analyzed Text:
          </Typography>
          <Paper
            variant="outlined"
            sx={{ p: 3, bgcolor: "background.default" }}
          >
            <Typography
              variant="body1"
              sx={{ fontStyle: "italic", lineHeight: 1.6 }}
            >
              {loading ? <CircularProgress size={20} /> : text}
            </Typography>
          </Paper>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Bias Result Section */}
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
            pb: 4,
            boxShadow:
              "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
          }}
        >
          <Typography
            variant="h3"
            component="div"
            fontWeight="bold"
            gutterBottom
          >
            Bias Detection Result
          </Typography>

          {loading ? (
            <Box sx={{ py: 6 }}>
              <CircularProgress size={60} />
              <Typography variant="body1" sx={{ mt: 2 }}>
                Analyzing text for political bias...
              </Typography>
            </Box>
          ) : (
            biasValue !== null &&
            biasInfo && (
              <>
                {/* Main Bias Label */}
                <Box sx={{ mb: 4 }}>
                  <Chip
                    label={biasInfo.label}
                    sx={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      height: "50px",
                      px: 3,
                      backgroundColor: biasInfo.color,
                      color: "white",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, color: "text.secondary" }}
                  >
                    Bias Score: {biasValue}
                  </Typography>
                </Box>
                {/* Gauge Component */}
                <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
                  <Meter value={biasValue} />
                </Box>

                {/* Bias Scale Labels */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    maxWidth: "400px",
                    mx: "auto",
                    mb: 4,
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="info.main"
                  >
                    Left (-100)
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="success.main"
                  >
                    Neutral (0)
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="error.main"
                  >
                    Right (+100)
                  </Typography>
                </Box>

                {/* Bias Severity Alert */}
                {biasInfo.severity !== "neutral" && (
                  <Alert
                    severity={biasInfo.severity === "high" ? "warning" : "info"}
                    sx={{ maxWidth: "600px", mx: "auto" }}
                  >
                    <Typography variant="body2">
                      This text shows{" "}
                      <strong>
                        {biasInfo.severity === "high"
                          ? "significant"
                          : biasInfo.severity === "medium"
                          ? "moderate"
                          : "slight"}
                      </strong>{" "}
                      political bias toward the {biasInfo.label.toLowerCase()}{" "}
                      perspective.
                    </Typography>
                  </Alert>
                )}
              </>
            )
          )}
        </Box>
      </Paper>
      {/* Information Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
          mb: 4,
        }}
      >
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary">
              Understanding Your Results
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              The bias score ranges from -100 (far left) to +100 (far right),
              with 0 representing neutral content. This analysis identifies
              political leaning based on language patterns, framing, and topic
              selection commonly associated with different political
              perspectives.
            </Typography>
          </CardContent>
        </Card>

        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary">
              Our Methodology
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              Our algorithm analyzes politically charged language, partisan
              framing, emotional appeals, and topic selection. Built with
              ethical AI principles, it aims to promote awareness of bias rather
              than censorship, encouraging more balanced discourse.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          size="large"
          startIcon={<ArrowBack />}
          onClick={() => router.push("/")}
          sx={{ minWidth: "150px" }}
        >
          New Analysis
        </Button>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button variant="outlined" startIcon={<InfoOutlined />}>
            Methodology
          </Button>
          <Button variant="contained" startIcon={<Share />}>
            Share Results
          </Button>
        </Box>
      </Box>

      {/* Disclaimer */}
      <Alert severity="info" sx={{ mt: 4 }}>
        <Typography variant="body2">
          <strong>Disclaimer:</strong> This tool is designed for educational
          purposes to promote awareness of potential bias in text. Results
          should be interpreted as one perspective among many, and we encourage
          critical thinking and diverse viewpoints in all discussions.
        </Typography>
      </Alert>
    </Container>
  );
}
