"use client";

import { useEffect, useState } from "react";
import { Box, Card, Typography, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { apiClient } from "@/lib/api";

export default function ApiCheckPage() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<string | null>(null);

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await apiClient.healthCheck();
        if (response.status === "healthy") {
          setApiStatus("API is up and running!");
        } else {
          setApiStatus("API is down or unreachable.");
        }
      } catch (error) {
        if (error instanceof Error) {
          setApiStatus("Error checking API status: " + error.message);
        } else {
          setApiStatus("Error checking API status: " + String(error));
        }
      } finally {
        setLoading(false);
      }
    };

    checkApiStatus();
  }, []);

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: 2,
        width: "100%",
      }}
    >
      <Card
        variant="outlined"
        sx={{ p: 4, maxWidth: 600, textAlign: "center" }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Nuance-API Status Check
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {apiStatus}
            </Typography>
          </>
        )}
      </Card>
    </Box>
  );
}
