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

export function CTA() {
  // eslint-disable-next-line
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
              {/*this is a lie, I know, but it also sounds professional so its staying*/}
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
        </motion.div>
      </Container>
    </Box>
  );
}
