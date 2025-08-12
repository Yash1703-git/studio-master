"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { useLanguage } from "@/context/language-context";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} Kanhaiya pashukhadya. {t('allRightsReserved')}
        </p>
        <div className="flex items-center gap-4">
          <Logo />
        </div>
      </div>
    </footer>
  );
}
