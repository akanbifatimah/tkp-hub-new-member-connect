import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Newsreader, Nunito_Sans } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["600"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  axes: ["YTLC", "wdth"],
});

export const metadata: Metadata = {
  title: "Guest Registration · TKP Hub",
  description: "First time at RCCG The King's Palace? Let us know you're here.",
};

export const viewport: Viewport = {
  themeColor: "#fcf9f2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${fraunces.variable} ${inter.variable} ${nunitoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
