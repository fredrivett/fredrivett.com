import React from "react";

import Link from "next/link";

const Nav = () => (
  <nav className="c_main-nav">
    <Link href="/">
      <a className="c_main-nav__item fs-2">FR</a>
    </Link>
    <div className="c_main-nav__right">
      <Link href="/cv">
        <a className="c_main-nav__item c_main-nav__item--available">
          available
        </a>
      </Link>
      <a
        href="https://twitter.com/fredrivett"
        rel="nofollow noreferrer"
        target="_blank"
        className="c_main-nav__item"
      >
        @fredrivett
      </a>
    </div>
  </nav>
);

export { Nav };