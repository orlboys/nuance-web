"use client";

import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import UpdateIcon from "@mui/icons-material/Update";
import CodeIcon from "@mui/icons-material/Code";
import { useTheme } from "@mui/material/styles";

const items = [
  {
    icon: <GavelRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "Accurate Bias Detection",
    description:
      "Leveraging advanced NLP techniques to reliably classify political bias across the spectrum.",
  },
  {
    icon: <UpdateIcon sx={{ color: "text.secondary" }} />,
    title: "Real-Time Analysis",
    description:
      "Process and analyze incoming text instantly, so you get bias insights as soon as data arrives.",
  },
  {
    icon: <CodeIcon sx={{ color: "text.secondary" }} />,
    title: "Developer-Friendly API",
    description:
      "Integrate bias detection into your own apps with our simple FastAPI endpoint and SDK.",
  },
];

export default function Content() {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        flexDirection: "column",
        alignSelf: "center",
        gap: 4,
        maxWidth: 450,
      }}
    >
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: "medium" }}>
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
