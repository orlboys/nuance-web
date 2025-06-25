"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface FeedbackModalProps {
  handleSubmit: (rating: number, feedback_text: string) => Promise<void>;
  open: boolean;
  onClose: () => void;
}

export default function FeedbackModal({
  handleSubmit,
  open,
  onClose,
}: FeedbackModalProps) {
  const theme = useTheme();
  const [feedback, setFeedback] = useState("");
  const [bias, setBias] = useState("");

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let rating = 0;
    if (bias === "left") rating = 0;
    else if (bias === "neutral") rating = 1;
    else if (bias === "right") rating = 2;
    await handleSubmit(rating, feedback);
    setFeedback("");
    setBias("");
    onClose();
  };

  const handleClose = () => {
    setFeedback("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 1,
          bgcolor: theme.palette.background.default,
        },
      }}
    >
      <form
        onSubmit={handleSubmitForm}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(1),
        }}
      >
        <DialogTitle>
          <Typography variant="h5" component="h2" fontWeight="bold">
            Share Your Feedback
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Help us improve Nuance Web with your thoughts and suggestions
          </Typography>
        </DialogTitle>

        <DialogContent
          sx={{
            "& .MuiFormLabel-root": {
              color: theme.palette.text.secondary,
            },
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme.palette.background.default,
              "& fieldset": {
                borderColor: theme.palette.divider,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
        >
          <Stack spacing={3} sx={{ mt: 1 }}>
            {/* Bias Selection */}
            <FormControl fullWidth>
              <InputLabel>What bias did you think it was?</InputLabel>
              <Select
                value={bias}
                label="What bias did you think it was?"
                name="bias"
                onChange={(e) => setBias(e.target.value)}
                required
              >
                <MenuItem value="left">Left</MenuItem>
                <MenuItem value="neutral">Neutral</MenuItem>
                <MenuItem value="right">Right</MenuItem>
              </Select>
            </FormControl>

            {/* Feedback Text */}
            <TextField
              label="Additional Feedback"
              multiline
              rows={4}
              value={feedback}
              name="feedback"
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Please share any additional thoughts or feedback..."
              fullWidth
              variant="outlined"
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleClose}
            color="inherit"
            type="button"
            sx={{ color: theme.palette.text.secondary }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!bias}
            sx={{
              bgcolor: theme.palette.primary.main,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
              "&:disabled": {
                bgcolor: theme.palette.action.disabled,
              },
            }}
          >
            Submit Feedback
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
