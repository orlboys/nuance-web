"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { SignUpCard } from "./components/SignUpCard";
import { Stack } from "@mui/material";
import Content from "./components/Content";
import { useTheme } from "@mui/material/styles";
import { supabase } from "@/lib/supabaseClient";

export default function SignIn() {
  const theme = useTheme();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");

  // This function handles the sign-up process.
  // - Reads the email, password, and username from state.
  // - Calls Supabase's signUp method to create a new user.
  // - If successful, the user is inserted into the auth.users table and the profiles table.
  // - Handles any errors that occur during the sign-up process.

  const handleSubmit = async () => {
    if (typeof email === "string" && typeof password === "string") {
      try {
        // 1. Sign up the user - this should insert the user into the auth.users table and the profiles table
        const { data: signUpData, error: signUpError } =
          await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                username: username, // optional, still good for metadata
              },
            },
          });

        if (signUpError) {
          console.error("Error signing up:", signUpError.message);
          return;
        }

        const user = signUpData.user;
        if (!user) {
          console.error("User not returned after sign-up.");
          return;
        }
      } catch (err) {
        console.error("Error during sign-up flow:", err);
      }
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
            <Content />
            <SignUpCard
              onSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              username={username}
              setUsername={setUsername}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
