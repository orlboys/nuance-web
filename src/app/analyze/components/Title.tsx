"use client";
import { Typography, Container } from "@mui/material";
import { motion } from "framer-motion";

export function Title() {
  return (
    <Container>
      <Typography
        variant="h2"
        component={motion.h1}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        sx={{
          mb: 2,
          background:
            "linear-gradient(90deg, #f44336 0%, #9c27b0 50%, #2196f3 100%)",
          backgroundSize: "200% 200%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent", // fallback for unsupported browsers
          display: "inline-block",
        }}
      >
        Analysis Results
      </Typography>
    </Container>
  );
}
