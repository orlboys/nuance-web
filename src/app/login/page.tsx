"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { SignInCard } from "./components/SignInCard";
import { Stack } from "@mui/material";
import Content from "./components/Content";
import { useTheme } from "@mui/material/styles";

export default function SignIn() {
  const theme = useTheme();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Change this eventually to supabase auth
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <>
      <CssBaseline />
      <Stack
        direction="column"
        component="main"
        sx={{
          justifyContent: "center",
          height: "100vh",
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          marginTop: "0px",
          minHeight: "100vh",
          padding: "0px",
          width: "100%",
        }}
      >
        {/*  This First stack is the Outer stack. Handles vertically centring everything, applying background styles, full height coverage*/}
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          sx={{
            justifyContent: "center",
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: "auto", // Centers the stack horizontally
          }}
        >
          {/* This Stack is the Inner stack. Handles centring the card horizontally and vertically */}
          <Stack
            direction={{ xs: "column-reverse", md: "row" }}
            sx={{
              justifyContent: "center",
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: "auto",
            }}
          >
            {/* This Stack is the Card stack. Handles the card itself, which contains the sign-in form */}
            <Content />
            <SignInCard onSubmit={handleSubmit} />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
