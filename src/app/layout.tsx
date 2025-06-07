// app/layout.tsx
import { Inter } from "next/font/google";
import { ThemeRegistry } from "@/providers/ThemeRegistry";
import ClientLayout from "./ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nuance",
  description: "AI-powered political bias detection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <ClientLayout>{children}</ClientLayout>
        </ThemeRegistry>
      </body>
    </html>
  );
}
