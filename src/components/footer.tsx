import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} DairyMix. All Rights Reserved.
          </p>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link
            href="/#products"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Products
          </Link>
          <Link
            href="/advisor"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            AI Advisor
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </footer>
  );
}
