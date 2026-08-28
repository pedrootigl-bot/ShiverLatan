import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import BfcacheHmr from "@/components/BfcacheHmr";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import SkipLink from "@/components/i18n/SkipLink";
import { SEO, SITE_LOCALE, SITE_NAME, SITE_URL } from "@/lib/config";
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
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "finance",
  keywords: [...SEO.keywords],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
    },
  },
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    locale: SITE_LOCALE,
    type: "website",
    siteName: SITE_NAME,
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: SEO.ogAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
    images: [
      {
        url: "/opengraph-image",
        alt: SEO.ogAlt,
      },
    ],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
            __html: `(function(){try{var l=localStorage.getItem("shiver-locale");if(l==="es")document.documentElement.lang="es";}catch(e){}})();`,
          }}
        />
        {process.env.NODE_ENV === "development" ? <BfcacheHmr /> : null}
        <LocaleProvider>
          <SkipLink />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
