"use client";

import { useTheme } from "@mui/material/styles";
import { Stack, Container, Grid, useMediaQuery } from "@mui/material";
import { Title } from "./components/Title";
import { BiasResultCard } from "./components/BiasResult";
import { AnalysedText } from "./components/AnalysedText";

export default function ResultsPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack
      component="main"
      alignItems="center"
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: "100vh",
        width: "100vw",
        py: 4,
      }}
    >
      <Container>
        <Grid container spacing={4}>
          {/* Title */}
          <Grid size={12}>
            <Title />
          </Grid>

          {/* Input Text and Bias Analysis Side-by-Side */}
          <Grid container spacing={4} width={"100%"}>
            {!isSmallScreen && (
              <Grid size={{ xs: 12, md: 6 }}>
                <AnalysedText></AnalysedText>
              </Grid>
            )}

            <Grid size={{ xs: 12, md: 6 }}>
              <BiasResultCard />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
}
