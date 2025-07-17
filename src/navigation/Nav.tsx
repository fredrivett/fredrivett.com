import React from "react";

import Link from "next/link";
import styled from "styled-components";
import tw from "twin.macro";

const SNav = styled.nav(tw`flex justify-between lg:sticky top-0 print:hidden`);
const SNavMain = styled.div(tw`flex`);
const SNavLink = styled(Link)<{
  availability?: "available" | "unavailable";
  large?: boolean;
}>(() => [
  tw`flex items-center px-3 py-2 cursor-pointer opacity-70 hover:opacity-100 focus:opacity-100 dark:bg-gray-950`,
  ({ large }) => (large ? tw`fs-2` : tw`text-sm sm:text-base`),

  ({ availability }) => availability === "available" && tw`text-green-500`,
  ({ availability }) => availability === "unavailable" && tw`text-yellow-500`,
  ({ availability }) =>
    availability !== undefined && [
      tw`font-bold`,
      `background-image: linear-gradient(to right, currentColor 0%, currentColor 100%) !important`,
    ],
]);

const Nav = () => (
  <SNav>
    <SNavLink large href="/">
      FR
    </SNavLink>
    <SNavMain>
      <SNavLink href="/now">/now</SNavLink>
      <SNavLink href="/cv">/cv</SNavLink>
      <SNavLink
        href="https://twitter.com/fredrivett"
        rel="nofollow noreferrer"
        target="_blank"
      >
        @fredrivett
      </SNavLink>
    </SNavMain>
  </SNav>
);

export { Nav };
