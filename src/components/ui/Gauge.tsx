"use client";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

export interface MeterProps {
  value: number;
  fillColor: string;
  ariaLabel?: string;
}

export const Meter = ({
  value,
  fillColor,
  ariaLabel = "Bias Meter",
}: MeterProps) => {
  const theme = useTheme();

  return (
    <Gauge
      value={Math.ceil(value)}
      startAngle={-90}
      endAngle={90}
      aria-label={ariaLabel}
      sx={{
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 30,
          fill: theme.palette.text.primary,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: fillColor,
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.text.disabled,
        },
      }}
    />
  );
};
