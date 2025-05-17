"use client";

import { Box, Slider, Typography, Chip } from "@mui/material";
import { motion } from "framer-motion";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import BalanceIcon from "@mui/icons-material/Balance";

interface BiasMeterProps {
  value: number;
}

export function BiasMeter({ value }: BiasMeterProps) {
  const getColor = (val: number) => {
    if (val < -30) return "#f44336"; // red
    if (val < -10) return "#ef5350"; // light red
    if (val > 30) return "#2196f3"; // blue
    if (val > 10) return "#42a5f5"; // light blue
    return "#4caf50"; // green
  };

  const getLabel = (val: number) => {
    if (val < -30) return "Strong Left Bias";
    if (val < -10) return "Left-Leaning";
    if (val > 30) return "Strong Right Bias";
    if (val > 10) return "Right-Leaning";
    return "Balanced";
  };

  const getIcon = (val: number) => {
    if (val < -30) return <KeyboardDoubleArrowLeftIcon fontSize="small" />;
    if (val > 30) return <KeyboardDoubleArrowRightIcon fontSize="small" />;
    if (val < -10) return <KeyboardArrowLeftIcon fontSize="small" />;
    if (val > 10) return <KeyboardArrowRightIcon fontSize="small" />;
    return <BalanceIcon fontSize="small" />;
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography color="error">Left</Typography>
        <Typography color="success">Neutral</Typography>
        <Typography color="info">Right</Typography>
      </Box>
      <Box sx={{ position: "relative", height: "80px" }}>
        <Slider
          value={value}
          min={-50}
          max={50}
          disabled
          sx={{
            "& .MuiSlider-track": {
              background:
                "linear-gradient(90deg, #f44336 0%, #4caf50 50%, #2196f3 100%)",
            },
            "& .MuiSlider-thumb": {
              width: 24,
              height: 24,
              backgroundColor: "#fff",
              border: "2px solid currentColor",
              "&:before": {
                boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
              },
              "&:after": {
                width: 32,
                height: 32,
              },
              "&.Mui-active, &.Mui-focusVisible": {
                boxShadow: "0 0 0 8px rgba(0,0,0,0.1)",
              },
              color: getColor(value),
            },
          }}
        />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            top: "45px",
            left: `calc(${((value + 50) / 100) * 100}% - 100px)`,
            textAlign: "center",
            width: "200px",
          }}
        >
          <Chip
            icon={getIcon(value)}
            label={getLabel(value)}
            sx={{
              backgroundColor: getColor(value),
              color: "#fff",
              fontWeight: "bold",
            }}
          />
        </motion.div>
      </Box>
    </Box>
  );
}
