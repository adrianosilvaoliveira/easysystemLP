import { cn } from "cn";

interface AppChromeProps {
  path: string;
  dots?: number;
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
}

export function AppChrome({ path, dots = 4, children, className, compact }: AppChromeProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-white shadow-lg",
        className,
      )}
    >
      <div className="flex h-[38px] items-center gap-1.5 bg-navy px-4">
        <span className="size-2 rounded-full bg-white/30" />
        <span className="size-2 rounded-full bg-white/30" />
        <span className="size-2 rounded-full bg-white/30" />
        <span className="ml-2.5 font-display text-[11px] text-white/45">{path}</span>
      </div>
      <div className="flex">
        <div className="hidden w-[52px] shrink-0 flex-col items-center gap-3.5 border-r border-border bg-surface-alt py-[18px] min-[421px]:flex">
          {Array.from({ length: dots }).map((_, index) => (
            <i
              key={index}
              className={cn(
                "size-[22px] rounded-md",
                index === 0 ? "bg-brand" : "bg-surface-alt-2",
              )}
            />
          ))}
        </div>
        <div className={cn("min-w-0 flex-1", compact ? "p-4 pb-5" : "p-[22px] pb-6")}>
          {children}
        </div>
      </div>
    </div>
  );
}
