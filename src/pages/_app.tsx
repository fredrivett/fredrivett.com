import React from "react";

import { AppProps } from "next/app";
import styled from "styled-components";
import tw from "twin.macro";

import { RealTimeUsers } from "components/RealTimeUsers";
import { Nav } from "navigation/Nav";

import "styles/main.scss";
import "styles/prism-a11y-dark.scss";

const SWrapper = styled.div(
  tw`text-gray-700 dark:text-gray-400 dark:bg-gray-950`,
);

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SWrapper>
    <Nav />
    <Component {...pageProps} />
    <RealTimeUsers />
  </SWrapper>
);

export default MyApp;
