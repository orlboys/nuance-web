"use client";

import { motion } from "framer-motion";
import { Box, Typography, Container, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid";
import BarChartIcon from "@mui/icons-material/BarChart";
import PsychologyIcon from "@mui/icons-material/Psychology";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SecurityIcon from "@mui/icons-material/Security";

const features = [
  {
    icon: <BarChartIcon fontSize="large" />,
    title: "Advanced Analysis",
    description:
      "Our AI analyzes text across multiple dimensions to detect subtle political bias and leanings.",
  },
  {
    icon: <PsychologyIcon fontSize="large" />,
    title: "Contextual Understanding",
    description:
      "The system understands context and nuance, not just keywords, for more accurate results.",
  },
  {
    icon: <LightbulbIcon fontSize="large" />,
    title: "Educational Insights",
    description:
      "Learn why certain phrases or arguments are associated with particular political viewpoints.",
  },
  {
    icon: <SecurityIcon fontSize="large" />,
    title: "Ethical Design",
    description:
      "Built with transparency and fairness in mind, avoiding its own algorithmic bias.",
  },
];

export function Features() {
  return (
    <Box sx={{ py: 8, bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{ mb: 6, fontWeight: 700 }}
        >
          Powerful Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid sx={{ xs: 12, md: 6, lg: 3 }} key={index}>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <motion.div
                  whileHover={{
                    y: -10,
                    boxShadow:
                      "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Card sx={{ height: "100%" }}>
                    <CardContent sx={{ p: 4, textAlign: "center" }}>
                      <Box sx={{ mb: 2, color: "primary.main" }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
