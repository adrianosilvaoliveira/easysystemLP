export function DeliveryMock() {
  const cards = [
    { n: "18", l: "Novos" },
    { n: "20", l: "Prontos" },
    { n: "23", l: "Em rota" },
    { n: "25", l: "Entregues" },
  ];

  return (
    <div className="bg-surface p-[22px]">
      <div className="grid grid-cols-2 gap-[9px]">
        {cards.map((card) => (
          <div
            key={card.l}
            className="rounded-[10px] border border-border bg-surface-alt px-3.5 py-[13px]"
          >
            <div className="font-display text-[22px] font-extrabold text-heading">{card.n}</div>
            <div className="mt-0.5 font-display text-[11px] font-bold tracking-[0.05em] text-text-tertiary uppercase">
              {card.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
