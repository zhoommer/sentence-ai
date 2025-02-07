import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/features/navbar/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sentese AI",
  description: "Sentese AI - Yapay Zeka Destekli Yazılım Geliştirme",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
