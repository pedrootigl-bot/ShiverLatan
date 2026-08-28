"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
};

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="deck-faq mt-4 divide-y divide-white/[0.06]">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `faq-panel-${index}`;

        return (
          <div
            key={item.question}
            className={`deck-faq-item${open ? " is-open" : ""}`}
          >
            <button
              type="button"
              className="deck-faq-item__trigger"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => {
                if (open) {
                  setOpenIndex(null);
                  return;
                }

                setOpenIndex(index);
                track("faq_open", { question: item.question, index });
              }}
            >
              <span className="text-sm font-semibold text-zinc-100">
                {item.question}
              </span>
              <span className="deck-faq-item__icon" aria-hidden="true">
                +
              </span>
            </button>
            <div id={panelId} className="deck-faq-item__panel" role="region">
              <div className="deck-faq-item__inner">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
