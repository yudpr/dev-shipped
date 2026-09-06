import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/organisms/header";
import Footer from "@/components/organisms/footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans"
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono"
})

export const metadata: Metadata = {
  title: "devShipped - Share and Get Feedback",
  description: "devShipped is a community platform for developers to share their apps and get real feedback through upvotes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${spaceMono.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
