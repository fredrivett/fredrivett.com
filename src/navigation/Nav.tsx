import React from "react";

import Link from "next/link";

import { cn } from "lib/cn";

import ThemeToggle from "components/ThemeToggle";

const linkBase =
  "flex items-center px-1.5 py-1 sm:px-3 sm:py-2 cursor-pointer transition-colors duration-200";

type NavLinkProps = React.PropsWithChildren<{
  href: string;
  className?: string;
  rel?: string;
  target?: string;
}>;

const NavLink = ({ href, className, children, ...rest }: NavLinkProps) => (
  <Link href={href} className={cn(linkBase, className)} {...rest}>
    {children}
  </Link>
);

const Nav = () => (
  <nav
    className={cn(
      "flex justify-between lg:sticky z-50 top-0 print:hidden bg-white/80 dark:bg-gray-950/80",
      "backdrop-blur-sm",
    )}
  >
    <NavLink href="/" className="fs-2">
      FR
    </NavLink>
    <div className="flex">
      <ThemeToggle />
      <NavLink href="/now" className="text-sm sm:text-base">
        /now
      </NavLink>
      <NavLink href="/shelf" className="text-sm sm:text-base">
        /shelf
      </NavLink>
      <NavLink href="/cv" className="text-sm sm:text-base">
        /cv
      </NavLink>
      <NavLink
        href="https://twitter.com/fredrivett"
        rel="nofollow noreferrer"
        target="_blank"
        className="text-sm sm:text-base"
      >
        @fredrivett
      </NavLink>
    </div>
  </nav>
);

export { Nav };
