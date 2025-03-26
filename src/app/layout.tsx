import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Lexend_Deca } from 'next/font/google';

// Initialize the font with the weights we need
const lexendDeca = Lexend_Deca({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700'],
  display: 'swap',
  variable: '--font-lexend-deca',
});

export const metadata: Metadata = {
  title: "rowl.dev (Portfolio)",
  description: "My professional ROBLOX portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={lexendDeca.className}>
      <body className="font-nanami bg-black text-white">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
