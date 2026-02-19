import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { WizardProvider } from "@/context/WizardContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Savertooth — Stop Overpaying for Subscriptions",
  description:
    "We find you cheaper alternatives and curated packs for your subscriptions and services. Same services, less money.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CurrencyProvider>
          <WizardProvider>{children}</WizardProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
