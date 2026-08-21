import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jyoti-Sameer",
  description: "Waiting with love.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Jyoti-Sameer",
    description: "Waiting with love.",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jyoti-Sameer",
    description: "Waiting with love.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
