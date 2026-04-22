import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Qzino Ambassador Program",
  description:
    "Official Qzino Ambassador Program landing page for affiliates, streamers, hunters, and VIP partners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
