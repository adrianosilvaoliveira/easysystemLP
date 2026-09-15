import { cn } from "cn";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}

export function Eyebrow({ children, className, light }: EyebrowProps) {
  return (
    <div
      className={cn(
        "mb-3.5 flex items-center gap-2 font-display text-[12.5px] font-bold tracking-[0.14em] uppercase",
        light ? "text-accent-pink" : "text-brand",
        className,
      )}
    >
      <span className={cn("h-0.5 w-[18px] shrink-0 rounded-sm", light ? "bg-accent-pink" : "bg-brand")} />
      {children}
    </div>
  );
}
