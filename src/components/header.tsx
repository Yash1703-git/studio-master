"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "./ui/dropdown-menu";
import { Globe, Menu, LogOut, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

const navLinks = [
  { href: "/", labelKey: "home" },
  { href: "/dashboard", labelKey: "dashboard" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, loading, logout } = useAuth();

  const NavLink = ({ href, labelKey }: { href: string; labelKey: string }) => (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        pathname === href ? "" : "text-muted-foreground"
      )}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {t(labelKey)}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
            {user?.role === 'admin' && <NavLink href="/admin" labelKey="admin" />}
          </nav>
        </div>

        <div className="md:hidden">
           <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
               <Link href="/" className="mr-6 flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                <Logo />
              </Link>
              <nav className="grid gap-6 text-lg font-medium mt-6">
                 {navLinks.map((link) => (
                  <NavLink key={link.href} {...link} />
                ))}
                {user?.role === 'admin' && <NavLink href="/admin" labelKey="admin" />}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('mr')}>Marathi</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {!loading && (
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            )
          )}
        </div>
      </div>
    </header>
  );
}
