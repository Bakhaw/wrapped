import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { cn } from "@/lib/utils";

import Providers from "@/components/Providers";

import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WRAPPED",
  description: "WRAPPED",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen lg:p-24 bg-amber-700",
          montserrat.className
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
