"use client";

import { useI18n } from "@/components/i18n/LocaleProvider";
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
  const { t } = useI18n();
  const copy = t.plans.items[plan.id];
  const featured = plan.featured;

  return (
    <article
      className={`plan-card deck-enter${featured ? " plan-card--vip" : " plan-card--free"}`}
    >
      <div className="plan-card__content">
        {copy.badge ? <p className="plan-card__badge">{copy.badge}</p> : null}

        <div className="plan-card__head">
          <h3 className="plan-card__name">{copy.name}</h3>
          <p className="plan-card__price">
            {plan.price}
            <span> / {copy.cadence}</span>
          </p>
        </div>

        <ul className="plan-card__list">
          {copy.features.map((feature) => (
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
          {copy.cta}
        </a>
      </div>
    </article>
  );
}

export default function SlidePlans() {
  const { t } = useI18n();

  return (
    <section id="planos" data-slide="6" className="deck-slide deck-slide--plans">
      <div className="deck-slide__layout">
        <div className="deck-slide__copy">
          <p className="deck-eyebrow deck-enter">{t.plans.eyebrow}</p>
          <h2 className="deck-title deck-title--compact">
            <span className="sr-only">{t.plans.sr} </span>
            <span className="deck-title__fill">{t.plans.fill}</span>
            <span className="deck-title__outline">{t.plans.outline}</span>
          </h2>
        </div>

        <div className="deck-visual plan-grid">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <p className="deck-lead deck-enter">{t.plans.lead}</p>
      </div>
    </section>
  );
}
