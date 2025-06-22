// app/(auth)/layout.tsx

import { ThemeRegistry } from "@/providers/ThemeRegistry";

export const metadata = {
  title: "Nuance – Auth",
  description: "Login or sign up to Nuance",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeRegistry>
      <main className="min-h-screen flex items-center justify-center p-4">
        {children}
      </main>
    </ThemeRegistry>
  );
}
