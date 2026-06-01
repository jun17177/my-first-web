import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/contexts/AuthContext";
import HeaderNav from "@/components/HeaderNav";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "F1 Fan Page — 2025 시즌",
  description: "2025 F1 시즌 드라이버·팀·레이스 일정을 소개하는 팬 사이트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={cn("font-sans", geist.variable)}>
      <body className="bg-[#f5f5f5] text-gray-900" suppressHydrationWarning>
        <AuthProvider>
          <HeaderNav />
          <main className="mx-auto max-w-6xl px-4 py-10">
            {children}
          </main>
          <footer className="bg-[#1a1a1a] text-white mt-16">
            <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-lg font-bold tracking-tight">F1 Fan Page</p>
              <p className="text-sm text-gray-400">© 2026 F1 Fan Page. All rights reserved.</p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
