"use client";

import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Meter } from "@/components/ui/Gauge";
import { motion } from "framer-motion";

interface BiasResultCardProps {
  value: number;
  confidence: number; // optional, used for the confidence level of the bias prediction
  loading: boolean;
  // prediction: number; // kind of a backup for the getBiasInfo function, its the class that is actually guessed by the model [0, 1, 2]
}

export function BiasResultCard({
  value,
  confidence,
  loading,
}: BiasResultCardProps) {
  const theme = useTheme();

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

  const biasInfo = value !== null ? getBiasInfo(value) : null;

  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        p: 3,
        maxWidth: "700px",
        mx: "auto",
        my: 4,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <CardContent>
        <Typography variant="h4" sx={{ mb: 2, ml: 1 }} gutterBottom>
          Bias Analysis
        </Typography>
        <Divider sx={{ mb: 5 }} />
        <Stack alignItems="center">
          {loading ? (
            <Box sx={{ py: 6, textAlign: "center" }}>
              <CircularProgress size={60} />
              <Typography variant="body1" sx={{ mt: 2 }}>
                Analyzing text for political bias...
              </Typography>
            </Box>
          ) : (
            value !== null &&
            biasInfo && (
              <>
                <Box sx={{ mb: 4, textAlign: "center" }}>
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
                    Bias Score: {value}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    <motion.div
                      whileHover={{
                        y: -10,
                        boxShadow:
                          "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 50,
                      }}
                    >
                      <Box
                        sx={{
                          height: "300px",
                          width: "100%",
                          maxWidth: "500px",
                          p: 2,
                          bgcolor: theme.palette.background.default,
                          borderRadius: 2,
                          boxShadow: 2,
                        }}
                      >
                        <Meter value={value} fillColor={biasInfo.color} />
                      </Box>
                      <Box sx={{ mt: 2, textAlign: "center" }}>
                        <Chip
                          sx={{
                            mt: 2,
                            maxWidth: "90%",
                            mx: "auto",
                            textAlign: "center",
                          }}
                          label={`Confidence: ${(confidence * 100).toFixed(
                            2
                          )}%`}
                          variant="outlined"
                        />
                      </Box>
                    </motion.div>
                  </motion.div>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    maxWidth: "100%",
                    mx: "auto",
                    mb: 4,
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="info.main"
                    sx={{ flex: 1, textAlign: "center" }}
                  >
                    Left (0)
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="success.main"
                    sx={{ flex: 1, textAlign: "center" }}
                  >
                    Neutral (50)
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="error.main"
                    sx={{ flex: 1, textAlign: "center" }}
                  >
                    Right (100)
                  </Typography>
                </Box>

                {biasInfo.severity !== "neutral" && (
                  <Alert
                    severity={biasInfo.severity === "high" ? "warning" : "info"}
                    sx={{ maxWidth: "90%", mx: "auto" }}
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
        </Stack>
      </CardContent>
    </Card>
  );
}
