import { cn } from "cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

export function Container({ children, className, narrow }: ContainerProps) {
  return (
    <div className={cn("wrap", narrow && "wrap-narrow", className)}>
      {children}
    </div>
  );
}
