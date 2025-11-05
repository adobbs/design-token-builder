import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Design Toys - Design System Tool",
  description: "Interactive tools for visualizing and creating design system tokens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
