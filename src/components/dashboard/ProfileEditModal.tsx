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
import { supabase } from "@/lib/supabaseClient";
import { UserProfile } from "@/types/UserProfile";

type FormErrors = {
  username?: string;
  bio?: string;
  avatar_url?: string;
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
  user: Partial<UserProfile>;
  onSave: (data: UserProfile) => void;
}) {
  const [formData, setFormData] = useState<UserProfile>({
    username: user?.username || "",
    email: user?.email || "",
    bio: user?.bio || "",
    avatar_url: user?.avatar_url || "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      // Get the current user ID
      const { data: authData } = await supabase.auth.getUser();
      const userId = authData?.user?.id;
      if (!userId) {
        setErrors((prev) => ({ ...prev, username: "User not authenticated" }));
        return;
      }

      const { data: profile, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (fetchError || !profile) {
        setErrors((prev) => ({
          ...prev,
          username: "Profile does not exist for this user.",
        }));
        return;
      }

      console.log({
        username: formData.username,
        bio: formData.bio,
        avatar_url: formData.avatar_url,
      });
      // Update the profile in Supabase
      const { error } = await supabase
        .from("profiles")
        .update({
          username: formData.username,
          bio: formData.bio,
          avatar_url: formData.avatar_url,
        })
        .eq("id", userId);

      if (error) {
        setErrors((prev) => ({
          ...prev,
          username: "Failed to update profile",
        }));
        return;
      }

      onSave(formData); // Update parent state
    }
  };

  const handleAvatarChange = () => {
    const mockNewAvatarUrl = `/placeholder.svg?height=100&width=100&text=${formData.username.charAt(
      0
    )}`;
    setFormData((prev) => ({
      ...prev,
      avatar_url: mockNewAvatarUrl,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Avatar
              src={formData.avatar_url}
              alt={formData.username}
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
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            error={!!errors.username}
            helperText={errors.username}
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
