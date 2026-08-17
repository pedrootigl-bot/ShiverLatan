import Preloader from "@/components/Preloader";
import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const title = "Shiver — Leitura clara do mercado";
const description =
  "Ferramenta de análise para traders: dados, contexto e sinais em um só lugar. Shiver não executa operações e não promete resultado financeiro.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s · Shiver",
  },
  description,
  applicationName: "Shiver",
  authors: [{ name: "Shiver" }],
  keywords: [
    "Shiver",
    "análise de mercado",
    "ferramenta para traders",
    "leitura de mercado",
    "dashboard de trading",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    locale: "pt_BR",
    type: "website",
    siteName: "Shiver",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Preloader>{children}</Preloader>
      </body>
    </html>
  );
}
