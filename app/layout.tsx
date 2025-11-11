import type { Metadata } from "next";
import { Cutive_Mono, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cutiveMono = Cutive_Mono({
  subsets:["latin"],
  variable:"--font-cutive-mono",
  weight:["400"]
})
export const metadata: Metadata = {
  title: "Query.Fit — AI-Native Database Waitlist",
  description:
    "Join the waitlist for Query.Fit — an AI-native database that lets you query data using plain English. No SQL needed. Early access launching soon.",

  metadataBase: new URL("https://query.fit"),
  alternates: {
    canonical: "https://query.fit",
  },

  keywords: [
    "Query.Fit",
    "AI Database",
    "English to SQL",
    "Query with English",
    "AI Query Engine",
    "AI Native SaaS",
    "Database AI",
    "RAG",
    "AI Agents",
    "Gauresh Tambe"
  ],

  openGraph: {
    title: "Query.Fit — AI-Native Database Waitlist",
    description:
      "English → SQL. Query your database using plain English. Join the waitlist for early access.",
    url: "https://query.fit",
    siteName: "Query.Fit",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png", 
        width: 1200,
        height: 630,
        alt: "Query.Fit — AI Native Database",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Query.Fit — AI-Native Database",
    description: "Query your database using plain English. Join the waitlist.",
    images: ["/og.png"],
    creator: "@gaureshart",
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  creator: "Gauresh Tambe",
  publisher: "Query.Fit",
  authors: [{ name: "Gauresh Tambe", url: "https://gauresh.art" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cutiveMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
