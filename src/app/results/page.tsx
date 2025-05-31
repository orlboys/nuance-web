"use client";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Stack } from "@mui/material";
import { Meter } from "./components/ui/Gauge";

export default function Results() {
  return <Meter value={25} />;
}
