import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/contexts/AuthContext";
import HeaderNav from "@/components/HeaderNav";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "내 블로그",
  description: "내 블로그입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={cn("font-sans", geist.variable)}>
      <body className="bg-gray-50 text-gray-900" suppressHydrationWarning>
        <AuthProvider>
          <HeaderNav />
          <main className="mx-auto max-w-4xl px-6 py-8">
            {children}
          </main>
          <footer className="border-t border-gray-200 px-6 py-5 text-center text-sm text-gray-500">
            © 2026 내 블로그
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
