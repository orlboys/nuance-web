"use client";

import * as React from "react";
import { Box, Card, Divider, Typography } from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";

export default function EmailAuth() {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.primary,
        padding: 2,
        width: "100%",
      }}
    >
      <Card
        variant="outlined"
        sx={{ p: 4, maxWidth: 600, height: "40%", textAlign: "center" }}
      >
        <Box>
          <CheckCircle
            sx={{
              color: (theme) => theme.palette.success.main,
              fontSize: 60,
              mb: 2,
            }}
          />
        </Box>
        <Typography variant="h4" sx={{ mb: 2 }}>
          You&apos;re In! Just a few more steps.
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
          Email Authentication
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Please check your email for a verification link to complete the
          sign-up process.
        </Typography>
      </Card>
    </Box>
  );
}
