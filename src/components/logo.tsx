import { cn } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <ShieldCheck className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold text-foreground font-lexend">DairyMix</span>
    </div>
  );
}
