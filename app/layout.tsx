import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const title = "Shiver — Auxílio na hora de comprar e vender";
const description =
  "Ferramenta da corretora Shiver para auxiliar o trader na hora de compra e venda. Tendência, momentum e volatilidade no mesmo painel. A ferramenta não opera sozinha.";

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
    "corretora",
    "ferramenta para traders",
    "hora de compra e venda",
    "tendência momentum volatilidade",
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
    card: "summary_large_image",
    title,
    description,
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
            __html:
              'try{if(sessionStorage.getItem("shiver-preloader-seen")==="1")document.documentElement.classList.add("splash-seen")}catch(e){}',
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
