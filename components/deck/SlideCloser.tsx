import Link from "next/link";
import { CTA_HREF, CTA_LABEL } from "@/lib/cta";
import FaqAccordion from "@/components/deck/FaqAccordion";
import { RISK_DISCLAIMER, ROUTES, SITE_YEAR } from "@/lib/config";
import { FAQ_ITEMS } from "@/lib/faq";

export default function SlideCloser() {
  return (
    <section id="faq" data-slide="7" className="deck-slide deck-slide--faq">
      <div id="comecar" className="absolute top-0 left-0 h-px w-px" />
      <div className="deck-slide__layout">
        <div className="deck-slide__copy">
          <p className="deck-eyebrow deck-enter">Começar</p>
          <h2 className="deck-title deck-title--compact">
            <span className="sr-only">
              Perguntas frequentes sobre a corretora Shiver e a ferramenta para
              traders.{" "}
            </span>
            <span className="deck-title__fill">À frente</span>
            <span className="deck-title__outline">do mercado</span>
          </h2>
          <p className="deck-lead deck-enter">
            Ferramenta da corretora Shiver para auxiliar o timing — sem robô e
            sem promessa de resultado. Quem opera é você.
          </p>
          <a href={CTA_HREF} className="deck-cta btn-shine deck-enter">
            {CTA_LABEL}
          </a>
          <div className="deck-footer deck-enter">
            <p>© {SITE_YEAR} Shiver. A ferramenta auxilia o trader.</p>
            <p className="deck-disclaimer">{RISK_DISCLAIMER}</p>
            <p className="mt-2 flex flex-wrap gap-4">
              <Link href={ROUTES.termos}>Termos</Link>
              <Link href={ROUTES.privacidade}>Privacidade</Link>
            </p>
          </div>
        </div>

        <div className="deck-visual deck-enter">
          <div className="deck-panel p-5 md:p-6">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-[#38bdf8] uppercase">
              FAQ
            </p>
            <FaqAccordion items={FAQ_ITEMS} />
          </div>
        </div>
      </div>
    </section>
  );
}
