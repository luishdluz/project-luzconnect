import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ServicesProvider } from "@/data/providers/ServicesProvider";
import { ToastContainer } from "react-toastify";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LuzConnect",
  description: "By luishdluz",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen m-0 p-0 bg-gray-100`}
      >
        <Header />
        <ServicesProvider>{children}</ServicesProvider>
        <ToastContainer />
        <Footer />
      </body>
    </html>
  );
}
