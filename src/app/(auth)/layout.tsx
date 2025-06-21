// app/(auth)/layout.tsx
import { Inter } from "next/font/google";
import { ThemeRegistry } from "@/providers/ThemeRegistry";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          {/* No nav here */}
          <main className="min-h-screen flex items-center justify-center p-4">
            {children}
          </main>
        </ThemeRegistry>
      </body>
    </html>
  );
}
