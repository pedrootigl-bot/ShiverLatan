import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { SEO, SITE_LOCALE, SITE_NAME, SITE_URL, PRELOADER } from "@/lib/config";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO.title,
    template: `%s · ${SITE_NAME}`,
  },
  description: SEO.description,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  keywords: [...SEO.keywords],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    locale: SITE_LOCALE,
    type: "website",
    siteName: SITE_NAME,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem(${JSON.stringify(PRELOADER.storageKey)})==="1")document.documentElement.classList.add("splash-seen")}catch(e){}`,
          }}
        />
        <a href="#conteudo" className="skip-link">
          Ir para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
