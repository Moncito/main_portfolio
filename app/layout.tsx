import type { Metadata, Viewport } from "next";
import { Inter_Tight, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const display = Inter_Tight({
  variable: "--ff-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
});

const mono = Geist_Mono({
  variable: "--ff-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Moncito Hernandez — Full Stack Software Engineer",
  description:
    "Moncito Hernandez is a full stack software engineer in Manila building web platforms and mobile apps. Selected work, 2026.",
  openGraph: {
    title: "Moncito Hernandez — Index 2026",
    description: "Full stack software engineer in Manila. Web platforms and mobile apps.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#e4e3dd",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${mono.variable}`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
