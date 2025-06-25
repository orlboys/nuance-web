import { Button, Modal, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface ConsentModalProps {
  handleConsentAccept: () => void;
  handleConsentDecline: () => void;
  showConsentModal: boolean;
}

export default function ConsentModal({
  handleConsentAccept,
  handleConsentDecline,
  showConsentModal,
}: ConsentModalProps) {
  const theme = useTheme();
  return (
    <Modal open={showConsentModal} onClose={handleConsentDecline}>
      <Paper
        elevation={3}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: theme.palette.background.default,
          p: 4,
          borderRadius: 2,
          minWidth: 320,
          boxShadow: 6,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Consent to Store Data
        </Typography>
        <Typography gutterBottom>
          Do you consent to having your analysis data stored for future
          reference? This helps us improve your experience.
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            marginTop: 24,
          }}
        >
          <Button onClick={handleConsentDecline} color="secondary">
            Decline
          </Button>
          <Button onClick={handleConsentAccept} color="primary" autoFocus>
            Accept
          </Button>
        </div>
      </Paper>
    </Modal>
  );
}
