const items = [
  { symbol: "BTC/USD", value: "+2.48%", tone: "up" },
  { symbol: "ETH/USD", value: "+1.76%", tone: "up" },
  { symbol: "Momentum", value: "74%", tone: "accent" },
  { symbol: "Sinal", value: "Bullish", tone: "up" },
  { symbol: "Volatilidade", value: "42%", tone: "accent" },
  { symbol: "EUR/USD", value: "+0.32%", tone: "up" },
  { symbol: "Confiança", value: "82%", tone: "accent" },
  { symbol: "Status", value: "Mercado ativo", tone: "live" },
];

function TickerRow() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((item) => (
        <div key={item.symbol} className="flex items-center gap-2.5">
          <span className="text-[11px] font-medium tracking-[0.14em] text-zinc-500 uppercase">
            {item.symbol}
          </span>
          <span
            className={
              item.tone === "up"
                ? "text-[11px] font-semibold text-emerald-400"
                : item.tone === "live"
                  ? "text-[11px] font-semibold text-[#9aa7ff]"
                  : "text-[11px] font-semibold text-[#7488ff]"
            }
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function MarketTicker() {
  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] bg-[#070a12] py-2.5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#05070d] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#05070d] to-transparent" />

      <div className="ticker-track flex w-max">
        <TickerRow />
        <TickerRow />
      </div>
    </div>
  );
}
