import { cn } from "@/lib/utils";
import { Milk } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Milk className="h-6 w-6 text-accent" />
      <span className="text-xl font-bold text-foreground font-headline">DairyMix</span>
    </div>
  );
}
