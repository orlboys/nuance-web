"use client";

import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Journalist",
    avatar: "/placeholder.svg?height=60&width=60",
    quote:
      "This tool has become essential in my editorial process. It helps me ensure my reporting remains balanced and fair.",
  },
  {
    name: "Sarah Chen",
    role: "Political Science Professor",
    avatar: "/placeholder.svg?height=60&width=60",
    quote:
      "I use this with my students to help them recognize bias in media and develop critical thinking skills.",
  },
  {
    name: "Michael Rodriguez",
    role: "Content Creator",
    avatar: "/placeholder.svg?height=60&width=60",
    quote:
      "As someone creating political content, this helps me understand how my messaging might be perceived across the spectrum.",
  },
];

export function Testimonials() {
  return (
    <Box sx={{ py: 8, bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{ mb: 6, fontWeight: 700 }}
        >
          What Users Say
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid sx={{ xs: 12, md: 4 }} key={index}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    boxShadow:
                      "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
                  }}
                >
                  <Card sx={{ height: "100%" }}>
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ position: "relative", mb: 3 }}>
                        <FormatQuoteIcon
                          sx={{
                            position: "absolute",
                            top: -20,
                            left: -15,
                            fontSize: 40,
                            color: "primary.main",
                            opacity: 0.2,
                          }}
                        />
                        <Typography
                          variant="body1"
                          sx={{ fontStyle: "italic" }}
                        >
                          {testimonial.quote}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          sx={{ mr: 2 }}
                        />
                        <Box>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                          >
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
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
