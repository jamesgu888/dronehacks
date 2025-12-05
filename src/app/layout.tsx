import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.stanfordhorizons.com"),
  title: "Horizons | Stanford Robotics Drone Hackathon",
  description: "Join 200+ students for a 48-hour drone hackathon at Stanford University. Build, test, and fly autonomous drones. May 15-17, 2025. $20K+ in prizes.",
  keywords: ["drone hackathon", "Stanford", "robotics", "hackathon", "autonomous drones", "Horizons", "Stanford Robotics"],
  authors: [{ name: "Stanford Robotics" }],
  openGraph: {
    title: "Horizons | Stanford Robotics Drone Hackathon",
    description: "Join 200+ students for a 48-hour drone hackathon at Stanford University. Build, test, and fly autonomous drones. May 15-17, 2025.",
    url: "https://www.stanfordhorizons.com",
    siteName: "Horizons",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Horizons - Stanford Robotics Drone Hackathon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Horizons | Stanford Robotics Drone Hackathon",
    description: "Join 200+ students for a 48-hour drone hackathon at Stanford University. May 15-17, 2025. $20K+ in prizes.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
