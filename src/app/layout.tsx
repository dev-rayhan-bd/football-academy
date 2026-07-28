import type { Metadata } from "next";
import { Inter, Audiowide, Orbitron } from "next/font/google";
import "./globals.css";
import AuthGuard from "@/providers/AuthGuard";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "@/providers/StoreProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-audiowide",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});


export const metadata: Metadata = {
  title: 'K10 Football - AI-Powered Football Network',
  description: 'The world\'s first validated football network connecting players, coaches, and clubs through verified achievements and AI-powered matching',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${audiowide.variable} ${orbitron.variable} antialiased`}
        suppressHydrationWarning
      >
        <StoreProvider>
          <AuthGuard>
            {children}
            <Toaster />
          </AuthGuard>
        </StoreProvider>
      </body>
    </html>
  );
}
