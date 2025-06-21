"use client";

import { Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api";
import { motion } from "framer-motion";

export function ApiDownWarning() {
  const [isDown, setIsDown] = useState(false);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const health = await apiClient.healthCheck();
        setIsDown(health.status !== "healthy");
      } catch {
        setIsDown(true);
      }
    };
    checkHealth();
  }, [isDown]);

  if (!isDown) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 1300, // above most content
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none", // allows clicks through the container
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Alert
        severity="error"
        sx={{
          borderRadius: 0,
          width: "100%",
          maxWidth: 600,
          mb: 3,
          pointerEvents: "all", // Allows clicking on the alert.
        }}
      >
        Nuance API is currently down. Please try again later.
      </Alert>
    </motion.div>
  );
}
