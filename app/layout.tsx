import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neurovice - Premium VR Experience",
  description: "Premium VR adult entertainment platform with immersive virtual reality experiences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className="bg-[#171614] text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
