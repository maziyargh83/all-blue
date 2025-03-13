import { Geist, Geist_Mono } from "next/font/google";
import "@all-blue/ui/globals.css";
import { Providers } from "@/components/ui/providers";
import { Toaster } from "@all-blue/ui/components/sonner";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
