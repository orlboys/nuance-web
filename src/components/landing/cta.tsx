"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export function CTA() {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        bgcolor: "background.paper",
        color: "text.primary",
        position: "relative",
        zIndex: 10,
        borderTop: 1,
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              fontWeight="bold"
            >
              Ready to Uncover Hidden Bias?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, fontWeight: "normal" }}>
              Join thousands of users who are making more informed decisions
              with our tool.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              sx={{ mb: 4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={Link}
                  href="/signup"
                  sx={{ px: 4, py: 1.5 }}
                >
                  Sign Up Free
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  component={Link}
                  href="/login"
                  sx={{ px: 4, py: 1.5 }}
                >
                  Log In
                </Button>
              </motion.div>
            </Stack>
          </Box>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            sx={{ mt: 4 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CheckCircleOutlineIcon fontSize="small" />
              <Typography variant="body2">No credit card required</Typography>
            </Box>
            <Box
              sx={{
                display: { xs: "none", sm: "block" },
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                bgcolor: "text.secondary",
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CheckCircleOutlineIcon fontSize="small" />
              <Typography variant="body2">
                Free tier with 50 analyses per month
              </Typography>
            </Box>
            <Box
              sx={{
                display: { xs: "none", sm: "block" },
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                bgcolor: "text.secondary",
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CheckCircleOutlineIcon fontSize="small" />
              <Typography variant="body2">Cancel anytime</Typography>
            </Box>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
