// app/ClientLayout.tsx
"use client";

import { useRouter } from "next/navigation";
import NavigationBar from "@/components/navigation/navbar";
import ScrollToTop from "@/components/navigation/scrollToTop";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <>
      <NavigationBar
        onLogin={() => router.push("/login")}
        onSignup={() => router.push("/signup")}
      />
      {children}
      <ScrollToTop></ScrollToTop>
    </>
  );
}
