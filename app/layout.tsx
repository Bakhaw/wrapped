import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { cn } from "@/lib/utils";

import Providers from "@/components/Providers";

import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WRAPPPED",
  description: "WRAPPPED",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div
          className={cn(
            "min-h-screen p-4 py-8 bg-background",
            montserrat.className
          )}
        >
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
