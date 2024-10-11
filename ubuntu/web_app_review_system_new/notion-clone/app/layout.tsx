import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DatabaseInitializer } from "../components/DatabaseInitializer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Code Review System",
  description: "A platform for submitting and reviewing code changes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DatabaseInitializer>{children}</DatabaseInitializer>
      </body>
    </html>
  );
}
