import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Rubik } from "next/font/google";
import { WizardProvider } from "@/context/WizardContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import Navbar from "@/components/shared/Navbar";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const rubik = Rubik({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Savertooth — Stop Overpaying for Subscriptions",
  description:
    "We analyse your subscriptions and find opportunities to save money — while keeping the same services or upgrading to better plans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${dmMono.variable} ${rubik.variable} antialiased`}
      >
        <CurrencyProvider>
          <WizardProvider>
            <Navbar />
            {children}
          </WizardProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
