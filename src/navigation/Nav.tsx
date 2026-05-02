import React, { useEffect, useRef, useState } from "react";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

import { cn } from "lib/cn";

import ThemeToggle from "components/ThemeToggle";

const linkBase =
  "flex items-center px-1.5 py-1 sm:px-3 sm:py-2 cursor-pointer transition-colors duration-200";

type NavLinkProps = React.PropsWithChildren<{
  href: string;
  className?: string;
  rel?: string;
  target?: string;
  onClick?: () => void;
}>;

const NavLink = ({ href, className, children, ...rest }: NavLinkProps) => (
  <Link href={href} className={cn(linkBase, className)} {...rest}>
    {children}
  </Link>
);

const navLinks: Array<{
  href: string;
  label: string;
  rel?: string;
  target?: string;
}> = [
  { href: "/now", label: "/now" },
  { href: "/words", label: "/words" },
  { href: "/shelf", label: "/shelf" },
  { href: "/cv", label: "/cv" },
  {
    href: "https://twitter.com/fredrivett",
    label: "@fredrivett",
    rel: "nofollow noreferrer",
    target: "_blank",
  },
];

const Nav = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  return (
    <nav
      ref={containerRef}
      className={cn(
        "lg:sticky z-50 top-0 print:hidden bg-white/80 dark:bg-gray-950/80",
        "backdrop-blur-sm",
      )}
    >
      <div className="flex justify-between">
        <NavLink href="/" className="fs-2">
          FR
        </NavLink>
        <div className="flex items-center">
          <ThemeToggle />
          <div className="hidden sm:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                rel={link.rel}
                target={link.target}
                className="text-sm sm:text-base"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="mobile-nav-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex items-center px-1.5 pr-2.5 py-1 sm:hidden cursor-pointer text-blue-300 hover:text-blue-500 dark:text-blue-500 opacity-70 hover:opacity-100 focus:opacity-100"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <div
        id="mobile-nav-menu"
        aria-hidden={!open}
        className={cn(
          "sm:hidden absolute top-full inset-x-0 overflow-hidden",
          !open && "pointer-events-none",
        )}
      >
        <div
          className={cn(
            "flex flex-col bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800",
            "transition-transform duration-200 ease-out",
            open ? "translate-y-0" : "-translate-y-full",
          )}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              rel={link.rel}
              target={link.target}
              className="text-sm no-underline px-3 py-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export { Nav };
