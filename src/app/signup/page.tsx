"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { LogInCard } from "./components/SignUpCard";
import { Stack } from "@mui/material";
import Content from "./components/Content";
import { useTheme } from "@mui/material/styles";
import { supabase } from "@/lib/supabaseClient"; // Adjust the import based on your project structure

export default function SignIn() {
  const theme = useTheme();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (typeof email === "string" && typeof password === "string") {
      try {
        // 1. Sign up the user
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

        // 2. Insert into 'profiles' table
        const { error: insertError } = await supabase.from("profiles").insert([
          {
            id: user.id, // Match Supabase Auth UID
            username: username,
            avatar_url: "", // You can set default or let user upload later
          },
        ]);

        if (insertError) {
          console.error("Error inserting profile:", insertError.message);
        } else {
          console.log("Profile created successfully.");
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
            <LogInCard
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
