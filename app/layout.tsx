import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Property Intelligence",
  description: "A public property mapping platform for discovering, sharing, and understanding properties.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
