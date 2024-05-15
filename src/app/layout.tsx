import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { constructMetadata } from "@/lib/utils";
import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "../styles/globals.css";
import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursive.className}>
        <Navbar />
        <main className="flex flex-col min-h-[calc(100vh-3.5rem-1px)] grainy-light">
          <div className="flex flex-col flex-1 h-full">
            <Providers>{children}</Providers>
          </div>
          <Footer />
        </main>
        <Toaster />
      </body>
    </html>
  );
}
