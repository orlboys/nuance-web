"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

type FormData = {
  name: string;
  email: string;
  bio: string;
  avatar: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  bio?: string;
  avatar?: string;
  [key: string]: string | undefined;
};

export default function ProfileEditModal({
  open,
  onClose,
  user,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  user: Partial<FormData>;
  onSave: (data: FormData) => void;
}) {
  const [formData, setFormData] = useState<FormData>({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    avatar: user?.avatar || "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  // In a real app, this would handle file uploads
  const handleAvatarChange = () => {
    // Mock implementation - in a real app, this would open a file picker
    const mockNewAvatarUrl = `/placeholder.svg?height=100&width=100&text=${formData.name.charAt(
      0
    )}`;
    setFormData((prev) => ({
      ...prev,
      avatar: mockNewAvatarUrl,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
          {/* Avatar Upload */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Avatar
              src={formData.avatar}
              alt={formData.name}
              sx={{ width: 100, height: 100 }}
            />
            <IconButton
              sx={{
                position: "absolute",
                bottom: -5,
                right: "50%",
                transform: "translateX(50%)",
                backgroundColor: "background.paper",
                "&:hover": { backgroundColor: "action.hover" },
              }}
              onClick={handleAvatarChange}
            >
              <PhotoCameraIcon />
            </IconButton>
          </Box>

          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
