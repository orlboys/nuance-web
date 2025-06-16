"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { LogInCard } from "./components/LogInCard";
import { Stack } from "@mui/material";
import Content from "./components/Content";
import { useTheme } from "@mui/material/styles";
import { supabase } from "@/lib/supabaseClient"; // Adjust the import based on your project structure
import { useRouter } from "next/navigation";

export default function SignIn() {
  const theme = useTheme();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    });

    if (error) {
      console.error("Error signing in:", error);
    } else {
      console.log("User signed in:", data);
      router.push("/home"); // Redirect to home page after successful login
    }
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
            <LogInCard onSubmit={handleSubmit} />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
