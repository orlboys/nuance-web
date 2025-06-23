import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
} from "@mui/material";

export default function PrivacyPolicy() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Privacy Policy
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mb: 4 }}
        >
          Last updated: {new Date().toLocaleDateString()}
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            1. Introduction
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to Nuance Web (&quot;we,&quot; &quot;our,&quot; or
            &quot;us&quot;). We are committed to protecting your privacy and
            ensuring transparency in how we collect, use, and protect your
            personal information. This Privacy Policy explains our practices
            regarding data collection and use when you use our political bias
            detection service.
          </Typography>
          <Typography>
            Please note that this is Nuance Web is simply a personal / school
            project, and is not intended for professional advice. Please consult
            with a professional for proper advice.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            2. Information We Collect
          </Typography>

          <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2 }}>
            Account Information
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Email address (for account creation and communication)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Username and password (securely encrypted)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Profile information you choose to provide" />
            </ListItem>
          </List>

          <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2 }}>
            Text Analysis Data
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Text content you submit for bias analysis" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Analysis results and timestamps" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Usage patterns and frequency of service use" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Any feedback you choose to give us" />
            </ListItem>
          </List>

          <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2 }}>
            Technical Information
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="IP address and browser information" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Device type and operating system" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Cookies and similar tracking technologies" />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            3. How We Use Your Information
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Service Provision"
                secondary="To analyze text for political bias and provide accurate results"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Account Management"
                secondary="To create and maintain your user account and preferences"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Previous Analysis Storage"
                secondary="To allow you to access your previously analysed queries"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Service Improvement"
                secondary="To improve our bias detection algorithms and user experience"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Communication"
                secondary="To send important updates about our service and your account"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Security"
                secondary="To protect against fraud, abuse, and security threats"
              />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            4. Data Storage and Security
          </Typography>
          <Typography variant="body1" paragraph>
            We implement industry-standard security measures to protect your
            personal information:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Encryption of sensitive data both in transit and at rest" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Limited access to personal data on a need-to-know basis" />
            </ListItem>
          </List>
          <Typography variant="body1" paragraph>
            Text submitted for analysis is processed temporarily and not stored
            permanently unless you choose to save results to your account.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            5. Your Rights and Choices
          </Typography>
          <Typography variant="body1" paragraph>
            You have the following rights regarding your personal information:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Access"
                secondary="Request a copy of the personal information we hold about you"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Correction"
                secondary="Request correction of inaccurate or incomplete information"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Deletion"
                secondary="Request deletion of your personal information and account"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Portability"
                secondary="Request transfer of your data in a machine-readable format"
              />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            6. Cookies and Tracking
          </Typography>
          <Typography variant="body1" paragraph>
            We use cookies and similar technologies to:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Maintain your login session and preferences" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Analyze website usage and performance" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Provide personalized user experience" />
            </ListItem>
          </List>
          <Typography variant="body1" paragraph>
            You can control cookie settings through your browser preferences.
            Note that disabling certain cookies may affect website
            functionality.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            7. Third-Party Services
          </Typography>
          <Typography variant="body1" paragraph>
            We may use third-party services for:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Analytics and performance monitoring" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email delivery and communication" />
            </ListItem>
          </List>
          <Typography variant="body1" paragraph>
            These services have their own privacy policies, and we encourage you
            to review them. We only share necessary information and ensure these
            partners meet our privacy standards.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            8. Data Retention
          </Typography>
          <Typography variant="body1" paragraph>
            We retain your personal information only as long as necessary to:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Provide our services to you" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Comply with legal obligations" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Resolve disputes and enforce agreements" />
            </ListItem>
          </List>
          <Typography variant="body1" paragraph>
            When you delete your account, we will remove your personal
            information within 30 days, except where retention is required by
            law.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            9. Children&apos;s Privacy
          </Typography>
          <Typography variant="body1" paragraph>
            Our service is not intended for children under 13 years of age. We
            do not knowingly collect personal information from children under
            13. If you are a parent or guardian and believe your child has
            provided us with personal information, please contact us
            immediately.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            10. Changes to This Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update this Privacy Policy from time to time. We will notify
            you of any material changes by:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Posting the updated policy on this page" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Displaying a prominent notice on our website" />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            11. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions about this Privacy Policy or our data
            practices, please contact us:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Email: nuance-web@hotmail.com" />
            </ListItem>
          </List>
          <Typography variant="body1" paragraph>
            We are committed to resolving any privacy concerns promptly and
            transparently.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            By using our service, you acknowledge that you have read and
            understood this Privacy Policy.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <MuiLink href={"/"} sx={{ mt: 3 }}>
              Return Home
            </MuiLink>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
