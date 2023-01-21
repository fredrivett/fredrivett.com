import React from "react";

import Link from "next/link";
import styled from "styled-components";
import tw from "twin.macro";

const SNav = styled.nav(tw`flex justify-between print:hidden`);
const SNavMain = styled.div(tw`flex`);
const SNavItem = styled.a<{
  availability?: "available" | "unavailable";
  large?: boolean;
}>(() => [
  tw`flex items-center px-3 py-2 cursor-pointer opacity-70 hover:opacity-100 focus:opacity-100`,
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
    <Link href="/">
      <SNavItem large>FR</SNavItem>
    </Link>
    <SNavMain>
      <Link href="/cv">
        <SNavItem availability="unavailable">available Q3 2023</SNavItem>
      </Link>
      <SNavItem
        href="https://twitter.com/fredrivett"
        rel="nofollow noreferrer"
        target="_blank"
      >
        @fredrivett
      </SNavItem>
    </SNavMain>
  </SNav>
);

export { Nav };
