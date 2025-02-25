import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dewa Management - Pernikahan Impian Anda",
  description:
    "Dewa Management menghadirkan pengalaman pernikahan yang tak terlupakan dengan sentuhan profesional dan dedikasi penuh.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/logo.png" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
