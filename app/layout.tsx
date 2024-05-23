import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-providers";
import { ModalProvider } from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgeStore";

const inter = Inter({ subsets: ['latin'], display: 'swap', adjustFontFallback: false})

export const metadata: Metadata = {
  title: "Notion Clone By Sindujan",
  description: "Just a Cloned Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="jotion-theme"
          >
          <Toaster position="bottom-center" />
          <ModalProvider/>
          {children}
        </ThemeProvider>
        </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
