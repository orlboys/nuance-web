"use client";

import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from "@mui/material";

const steps = [
  {
    title: "Input Your Text",
    description:
      "Paste any article, social media post, or speech into our analyzer.",
  },
  {
    title: "AI Processing",
    description:
      "Our advanced AI models analyze the text for political language, rhetoric, and framing.",
  },
  {
    title: "Bias Detection",
    description:
      "The system identifies political leanings and potential bias in the content.",
  },
  {
    title: "Detailed Results",
    description:
      "Receive a comprehensive report with bias score, key phrases, and explanations.",
  },
];

export function HowItWorks() {
  return (
    <Box sx={{ py: 8, bgcolor: "background.default" }}>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{ mb: 6, fontWeight: 700 }}
        >
          How It Works
        </Typography>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Stepper orientation="vertical">
              {steps.map((step, index) => (
                <Step key={index} active={true}>
                  <StepLabel>
                    <Typography variant="h6">{step.title}</Typography>
                  </StepLabel>
                  <StepContent>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true, margin: "-50px" }}
                    >
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 2, mt: 1 }}
                      >
                        {step.description}
                      </Typography>
                    </motion.div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
