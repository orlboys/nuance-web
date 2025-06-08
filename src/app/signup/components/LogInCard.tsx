"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import { GoogleIcon, FacebookIcon } from "./CustomIcons";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  backgroundColor: theme.palette.background.paper,
  borderColor: theme.palette.divider,
  boxShadow: theme.shadows[4],
}));

interface SignUpCardProps {
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string,
    name: string
  ) => void;
}

export function LogInCard({ onSubmit }: SignUpCardProps) {
  const theme = useTheme();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [nameError, setNameError] = React.useState("");

  const validateInputs = () => {
    let valid = true;
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }
    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      valid = false;
    } else {
      setPasswordError("");
    }
    if (!nameError) {
      setNameError("Please enter a name");
      valid = false;
    } else {
      setNameError("");
    }
    return valid;
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateInputs()) {
      onSubmit(event, email, password, name);
    }
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{
          width: "100%",
          fontSize: "clamp(2rem, 10vw, 2.15rem)",
          color: theme.palette.text.primary,
        }}
      >
        Sign Up
      </Typography>
      <Box
        component="form"
        onSubmit={handleFormSubmit}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
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
        <FormControl error={!!emailError} fullWidth>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <FormHelperText>{emailError}</FormHelperText>}
        </FormControl>
        <FormControl error={!!passwordError} fullWidth>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <FormHelperText>{passwordError}</FormHelperText>}
        </FormControl>
        <FormControl error={!!nameError} fullWidth>
          <FormLabel htmlFor="name">First Name</FormLabel>
          <TextField
            name="name"
            placeholder="John"
            type="text"
            id="name"
            required
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <FormHelperText>{nameError}</FormHelperText>}
        </FormControl>
        <Button type="submit" fullWidth variant="contained">
          Sign Up
        </Button>
      </Box>
      <Divider
        sx={{
          "&::before, &::after": {
            borderColor: theme.palette.divider,
          },
          color: theme.palette.text.secondary,
        }}
      >
        or
      </Divider>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          "& .MuiButton-outlined": {
            borderColor: theme.palette.divider,
            "&:hover": {
              borderColor: theme.palette.primary.main,
              backgroundColor: theme.palette.action.hover,
            },
          },
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign in with Google")}
          startIcon={<GoogleIcon />}
        >
          Sign Up with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign in with Facebook")}
          startIcon={<FacebookIcon />}
        >
          Sign Up with Facebook
        </Button>
        <Typography
          sx={{
            textAlign: "center",
            color: theme.palette.text.secondary,
          }}
        >
          Have an account?{" "}
          <Link
            href="/login"
            variant="body2"
            sx={{
              color: theme.palette.primary.main,
              "&:hover": {
                color: theme.palette.primary.light,
              },
            }}
          >
            Log In
          </Link>
        </Typography>
      </Box>
    </Card>
  );
}
