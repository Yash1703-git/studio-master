"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { useLanguage } from "@/context/language-context";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} DairyMix. {t('allRightsReserved')}
          </p>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link
            href="/#products"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            {t('products')}
          </Link>
           <Link
            href="/advisor"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            {t('advisor')}
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            {t('dashboard')}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
