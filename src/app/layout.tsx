import { Inter } from "next/font/google";
import { ThemeRegistry } from "@/providers/ThemeRegistry";
import NavigationBar from "@/components/navigation/navbar";
import ScrollToTop from "@/components/navigation/scrollToTop";
import { ApiDownWarning } from "@/components/global/apiDownWarning";

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
          <NavigationBar />
          {children}
          <ScrollToTop />
          <ApiDownWarning />
        </ThemeRegistry>
      </body>
    </html>
  );
}
