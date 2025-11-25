import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";
import AuroraBackground from "./_components/AuroraBackground";
import Preloader from "./_components/Preloader";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "Grocery App",
  description: "Fresh groceries delivered to your doorstep",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased`}>
        <Preloader>
          <AuroraBackground>
            <Header />
            {children}
            <Toaster />
          </AuroraBackground>
        </Preloader>
      </body>
    </html>
  );
}
