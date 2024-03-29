import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { cn } from "@/lib/utils";

import Header from "@/components/Header";
import Providers from "@/components/Providers";

import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WRAPPPED",
  description: "WRAPPPED",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div
            className={cn(
              "min-h-screen max-w-screen-md mx-auto",
              montserrat.className
            )}
          >
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
