"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { SignUpCard } from "./components/SignUpCard";
import { Stack } from "@mui/material";
import Content from "./components/Content";
import { useTheme } from "@mui/material/styles";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const theme = useTheme();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [signUpError, setSignUpError] = React.useState<string>("");
  const router = useRouter();

  // This function handles the sign-up process.
  // - Reads the email, password, and username from state.
  // - Calls Supabase's signUp method to create a new user.
  // - If successful, the user is inserted into the auth.users table and the profiles table.
  // - Handles any errors that occur during the sign-up process.

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string,
    username: string
  ) => {
    event.preventDefault();

    try {
      const [
        { data: emailMatches, error: emailError },
        { data: usernameMatches, error: usernameError },
      ] = await Promise.all([
        supabase.from("profiles").select("id").eq("email", email),
        supabase.from("profiles").select("id").eq("username", username),
      ]);

      if (emailError || usernameError) {
        console.error("Supabase query error:", emailError || usernameError);
        setSignUpError("Something went wrong checking for duplicates.");
        return;
      }

      if (
        (emailMatches?.length ?? 0) > 0 ||
        (usernameMatches?.length ?? 0) > 0
      ) {
        setSignUpError(
          "An account with this email or username already exists."
        );
        return;
      }

      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username },
          },
        });

      if (signUpError) {
        console.error("Supabase signUp error:", signUpError.message);
        setSignUpError(signUpError.message);
        return;
      }

      if (!signUpData.user) {
        setSignUpError("Signup succeeded, but no user object was returned.");
        return;
      }

      router.push("/emailAuth");
    } catch (err: unknown) {
      const message =
        typeof err === "object" && err !== null && "message" in err
          ? (err as { message?: string }).message
          : typeof err === "object" &&
            err !== null &&
            "error_description" in err
          ? (err as { error_description?: string }).error_description
          : "Unexpected error occurred. Please try again.";
      setSignUpError(message ?? "Unexpected error occurred. Please try again.");
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
              signUpError={signUpError}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
