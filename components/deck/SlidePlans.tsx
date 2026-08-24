import { PLANS, type Plan } from "@/lib/plans";

function PlanCheck() {
  return (
    <span className="plan-card__check" aria-hidden>
      <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
        <path
          d="M4.5 10.5 8.2 14.2 15.5 5.8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const featured = plan.featured;

  return (
    <article
      className={`plan-card deck-enter${featured ? " plan-card--vip" : " plan-card--free"}`}
    >
      <div className="plan-card__content">
        {plan.badge ? <p className="plan-card__badge">{plan.badge}</p> : null}

        <div className="plan-card__head">
          <h3 className="plan-card__name">{plan.name}</h3>
          <p className="plan-card__price">
            {plan.price}
            <span> / {plan.cadence}</span>
          </p>
        </div>

        <ul className="plan-card__list">
          {plan.features.map((feature) => (
            <li key={feature}>
              <PlanCheck />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href={plan.href}
          className={`plan-card__cta${featured ? " plan-card__cta--solid btn-shine" : " plan-card__cta--ghost"}`}
        >
          {plan.cta}
        </a>
      </div>
    </article>
  );
}

export default function SlidePlans() {
  return (
    <section id="planos" data-slide="6" className="deck-slide deck-slide--plans">
      <div className="deck-slide__layout">
        <div className="deck-slide__copy">
          <p className="deck-eyebrow deck-enter">Planos</p>
          <h2 className="deck-title deck-title--compact">
            <span className="sr-only">
              Planos Grátis e VIP da ferramenta Shiver para traders.{" "}
            </span>
            <span className="deck-title__fill">Dois</span>
            <span className="deck-title__outline">Acessos</span>
          </h2>
        </div>

        <div className="deck-visual plan-grid">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <p className="deck-lead deck-enter">
          Grátis para entrar no painel. VIP para ler o cenário com mais
          contexto. Nos dois, a ferramenta auxilia — quem opera é você.
        </p>
      </div>
    </section>
  );
}
