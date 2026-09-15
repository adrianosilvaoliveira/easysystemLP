export function PdvMock() {
  return (
    <div className="bg-surface p-[22px]">
      <span className="mb-4 inline-flex items-center gap-[7px] rounded-full bg-success-tint px-[11px] py-[5px] font-display text-[11px] font-bold text-success">
        <span className="size-1.5 rounded-full bg-success" />
        Modo offline — sincronizando
      </span>
      {[
        ["Heineken Long Neck", "R$ 72,50"],
        ["Amendoim Torrado 100g", "R$ 9,90"],
        ["Gelo 2kg", "R$ 6,00"],
      ].map(([name, price]) => (
        <div
          key={name}
          className="flex items-center gap-2.5 border-b border-border py-[11px] text-sm"
        >
          <span className="size-2 shrink-0 rounded-full bg-brand" />
          <span className="flex-1 text-text">{name}</span>
          <span className="font-display font-bold text-heading">{price}</span>
        </div>
      ))}
      <div className="flex justify-between pt-[13px] font-display text-base font-extrabold text-heading">
        <span>Total</span>
        <span>R$ 88,40</span>
      </div>
      <div className="mt-3.5 flex gap-[7px]">
        {["Pix", "Cartão", "Dinheiro"].map((method) => (
          <span
            key={method}
            className="rounded-lg bg-surface-alt-2 px-2.5 py-1 font-display text-[11px] font-bold text-text-secondary"
          >
            {method}
          </span>
        ))}
      </div>
    </div>
  );
}
