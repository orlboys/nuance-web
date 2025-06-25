"use client";

import { useEffect, useState, Suspense } from "react";
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
  Skeleton,
  CardContent,
  Card,
  Divider,
} from "@mui/material";
import { Title } from "./components/Title";
import { BiasResultCard } from "./components/BiasResult";
import { AnimatePresence, motion } from "framer-motion";
import ShinyText from "@/components/ui/ShinyText";
import { apiClient, BiasResponse } from "@/lib/api";
import { supabase } from "@/lib/supabaseClient";
import { useSearchParams } from "next/navigation";
import ConsentModal from "./components/ConsentModal";
import FeedbackModal from "./components/UserFeedbackModal";

// Separate component for the search params logic
function ResultsPageContent() {
  const theme = useTheme();

  const searchParams = useSearchParams();
  const resultId = searchParams.get("id");
  const [text, setText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<BiasResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingResult, setLoadingResult] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const handleOpenFeedback = () => setFeedbackOpen(true);
  const handleCloseFeedback = () => setFeedbackOpen(false);
  const [pendingBiasResult, setPendingBiasResult] =
    useState<BiasResponse | null>(null);
  const [thankYou, setThankYou] = useState(false);

  useEffect(() => {
    if (!resultId) return;
    const fetchResultById = async () => {
      setLoadingResult(true);
      const { data, error } = await supabase
        .from("requests")
        .select("id, input_text, bias_value, confidence, created_at")
        .eq("id", resultId)
        .single();
      if (error) {
        setError("Could not fetch result: " + error.message);
        setResult(null);
      } else if (data) {
        setResult({
          bias: {
            compound: data.bias_value / 50 - 1,
            confidence: data.confidence,
          },
        } as BiasResponse);
        setText(data.input_text);
      }
      setLoadingResult(false);
    };
    fetchResultById();
  }, [resultId]);

  // Thank you fade out timer
  useEffect(() => {
    if (thankYou) {
      const timer = setTimeout(() => {
        setThankYou(false);
      }, 3000); // Dismiss after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [thankYou]);

  // This function handles the submission of the text for bias analysis.
  // It uses the API client to call the bias analysis endpoint.
  const handleAnalysisSubmit = async () => {
    if (resultId) return;

    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    const isFirstTimeUser = await supabase
      .from("profiles")
      .select("first_time_user")
      .eq("id", userId)
      .single();

    if (!text.trim()) {
      setError("Please enter some text to analyze.");
      return;
    } // Prevent submission of empty text
    setAnalyzing(true);
    try {
      const biasData = await apiClient.analyzeBias(text.trim());
      setResult(biasData);
      if (isFirstTimeUser) {
        setPendingBiasResult(biasData);
        setShowConsentModal(true);
      } else {
        console.log("Bias analysis result:", biasData);
        handleSaveSubmit(biasData);
      }
      setError(null);
    } catch (error) {
      console.error("Error during bias analysis:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred during analysis.");
      }
    } finally {
      setAnalyzing(false);
    }
  };

  const handleConsentAccept = () => {
    if (pendingBiasResult) {
      handleSaveSubmit(pendingBiasResult);
      setPendingBiasResult(null);
      setShowConsentModal(false);
      // update user profile to not show again
      supabase.from("profiles").update({ first_time_user: false });
    }
  };

  const handleConsentDecline = () => {
    setShowConsentModal(false);
    setPendingBiasResult(null);
  };

  // Handles saving the results to database
  const handleSaveSubmit = async (biasResult = result) => {
    // Parameter is required b/c handleAnalysisSubmit is asynchronous
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    if (!userId) {
      setError("User not authenticated.");
      return;
    }

    if (!biasResult || typeof biasResult.bias?.compound !== "number") {
      setError("No valid analysis result to save.");
      return;
    }
    const { error: insertError } = await supabase.from("requests").insert({
      user_id: userId,
      input_text: text,
      bias_value: (biasResult.bias.compound + 1) * 50,
      confidence: biasResult.bias.confidence,
    });
    if (insertError) {
      setError(insertError.message);
    }
  };

  const handleFeedbackSubmit = async (
    rating: number,
    feedback: string,
    biasResult = result
  ) => {
    try {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;
      if (!userId) {
        setError("User not authenticated.");
        return;
      }
      const { error: insertError } = await supabase.from("feedback").insert({
        user_id: userId,
        detected_label:
          typeof biasResult?.bias.compound === "number"
            ? biasResult.bias.compound < 45
              ? 0
              : biasResult.bias.compound >= 45 && biasResult.bias.compound <= 65
              ? 1
              : biasResult.bias.compound > 65
              ? 2
              : null
            : null,
        correct_label: rating,
        text: text,
        feedback_text: feedback,
        created_at: new Date().toISOString(),
      });
      if (insertError) {
        setError(insertError.message);
      }
      setThankYou(true);
    } catch (err) {
      setError(
        "Failed to submit feedback. " +
          (err instanceof Error ? err.message : "")
      );
    }
  };

  // Skeleton component for the result section
  const ResultSkeleton = () => (
    <Box>
      <Skeleton variant="text" sx={{ fontSize: "1.5rem", mb: 2 }} width="60%" />
      <Skeleton
        variant="rectangular"
        height={200}
        sx={{ mb: 2, borderRadius: 2 }}
      />
      <Box alignItems="center">
        <Skeleton variant="text" width="40%" sx={{ mb: 1 }} />
        <Skeleton variant="text" width="80%" sx={{ mb: 2 }} />
      </Box>
    </Box>
  );

  const PageSkeleton = () => (
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
          {/* Title Skeleton */}
          <Grid size={12} sx={{ mt: 4, mb: 2 }}>
            <Box sx={{ textAlign: "center" }}>
              <Skeleton
                variant="text"
                sx={{ fontSize: "3rem", mx: "auto" }}
                width="60%"
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.2rem", mx: "auto" }}
                width="40%"
              />
            </Box>
          </Grid>

          {/* Input and Result Skeletons Side-by-Side */}
          <Grid container spacing={4} width={"100%"}>
            {/* Left side: Input Skeleton */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem", mb: 3 }}
                width="50%"
              />
              <Skeleton
                variant="rectangular"
                height={280}
                sx={{ mb: 3, borderRadius: 1 }}
              />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Skeleton
                  variant="rectangular"
                  height={48}
                  width={150}
                  sx={{ borderRadius: 1 }}
                />
              </Box>
            </Grid>

            {/* Right side: Result Skeleton */}
            <Grid size={{ xs: 12, md: 6 }}>
              <ResultSkeleton />
            </Grid>
          </Grid>
        </Grid>

        {/* Bottom Alert Skeleton */}
        <Box sx={{ maxWidth: "90%", mx: "auto", mt: 4 }}>
          <Skeleton
            variant="rectangular"
            height={80}
            sx={{ borderRadius: 1 }}
          />
        </Box>
      </Container>
    </Stack>
  );
  const formatCompound = (value: number): number => {
    return Math.floor((value + 1) * 50);
  }; // Converts compound score from [-1, 1] to [0, 100]

  if (loadingResult) {
    return <PageSkeleton />;
  }

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
        <AnimatePresence>
          {thankYou && (
            <motion.div
              style={{
                position: "fixed",
                top: 50,
                left: 0,
                width: "100%",
                zIndex: 1300,
                display: "flex",
                justifyContent: "center",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <Alert>
                Thank you for your feedback - it will contribute to the next
                version of Nuance.
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
        <Grid container spacing={4}>
          {/* Title */}
          <Grid size={12} sx={{ mt: 4 }}>
            <Title />
          </Grid>

          {/* Input Text and Bias Analysis Side-by-Side */}
          <Grid container spacing={4} width={"100%"}>
            {/* Left side: Analyzed Text */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 1,
                  overflow: "hidden",
                  p: 3,
                  maxWidth: "700px",
                  mx: "auto",
                  my: 1,
                  height: "95%",
                  bgcolor: theme.palette.background.paper,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h4"
                    fontWeight={600}
                    sx={{ mb: 2, ml: 1 }}
                    gutterBottom
                  >
                    Enter Text
                  </Typography>
                  <Divider sx={{ mb: 5 }} />
                  <TextField
                    label="Your text"
                    multiline
                    rows={10}
                    fullWidth
                    variant="outlined"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={!!resultId}
                    placeholder="Enter or paste the text you want to analyze for political bias..."
                    sx={{ height: "100%" }}
                  />
                  {!resultId && ( // only show analysis submit button if the text box is there.
                    <Box
                      sx={{ display: "flex", justifyContent: "center", mt: 3 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          onClick={handleAnalysisSubmit}
                          disabled={!text.trim() || !!resultId}
                        >
                          <ShinyText
                            text={analyzing ? "Analyzing..." : "Analyze Text"}
                            disabled={!!text.trim() || !!resultId}
                            color={text.trim() ? "primary" : undefined}
                          />
                        </Button>
                      </motion.div>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Right side: Result */}
            <Grid size={{ xs: 12, md: 6 }}>
              {error ? (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              ) : result ? (
                <>
                  <BiasResultCard
                    value={formatCompound(result.bias.compound)}
                    confidence={Number(result.bias.confidence.toPrecision(2))}
                    loading={analyzing}
                    onOpenFeedback={handleOpenFeedback}
                    // prediction={result.bias.prediction} --> Include if you want to use the model's inbuilt prediction methodology
                  />
                </>
              ) : analyzing ? (
                <ResultSkeleton />
              ) : null}
            </Grid>
          </Grid>
        </Grid>
        <Alert
          severity={"info"}
          sx={{ maxWidth: "90%", mx: "auto", mt: 6 }}
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
        <ConsentModal
          handleConsentAccept={handleConsentAccept}
          handleConsentDecline={handleConsentDecline}
          showConsentModal={showConsentModal}
        />
        <FeedbackModal
          open={feedbackOpen}
          onClose={handleCloseFeedback}
          handleSubmit={handleFeedbackSubmit}
        />
      </Container>
    </Stack>
  );
}

// Main component with Suspense wrapper
export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsPageContent />
    </Suspense>
  );
}
