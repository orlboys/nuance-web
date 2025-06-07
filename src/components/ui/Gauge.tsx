"use client";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

export interface MeterProps {
  value: number;
  width?: number;
  height?: number;
  ariaLabel?: string;
}

export const Meter = ({
  value,
  width = 600,
  height = 600,
  ariaLabel = "Bias Meter",
}: MeterProps) => {
  const theme = useTheme();

  return (
    <Gauge
      value={Math.ceil(value)}
      width={width}
      height={height}
      startAngle={-90}
      endAngle={90}
      aria-label={ariaLabel}
      sx={{
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 50,
          fill: theme.palette.text.primary,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: theme.palette.primary.main, // At some point, change this to a gradient (matching the theme, example in app/components/.tsx)
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.text.disabled,
        },
      }}
    />
  );
};
