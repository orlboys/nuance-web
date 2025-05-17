import {
  Box,
  Container,
  Typography,
  Grid,
  Link as MuiLink,
  Divider,
} from "@mui/material";
import Link from "next/link";

export function Footer() {
  return (
    <Box
      sx={{
        py: 6,
        bgcolor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Political Bias Analyzer
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
              An ethical AI tool designed to help you identify political bias in
              text content.
            </Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Product
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none" }}>
              {["Features", "Pricing", "API", "FAQ"].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1 }}>
                  <MuiLink
                    component={Link}
                    href="#"
                    sx={{
                      color: "text.secondary",
                      textDecoration: "none",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    {item}
                  </MuiLink>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Company
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none" }}>
              {["About", "Blog", "Careers", "Contact"].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1 }}>
                  <MuiLink
                    component={Link}
                    href="#"
                    sx={{
                      color: "text.secondary",
                      textDecoration: "none",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    {item}
                  </MuiLink>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Legal
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none" }}>
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "GDPR",
              ].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1 }}>
                  <MuiLink
                    component={Link}
                    href="#"
                    sx={{
                      color: "text.secondary",
                      textDecoration: "none",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    {item}
                  </MuiLink>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
