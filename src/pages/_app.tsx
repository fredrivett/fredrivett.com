import React from "react";

import { AppProps } from "next/app";

import { Nav } from "navigation/Nav";

import { RealTimeUsers } from "components/RealTimeUsers";

import "styles/main.scss";
import "styles/prism-a11y-dark.scss";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Nav />
    <Component {...pageProps} />
    <RealTimeUsers />
  </>
);

export default MyApp;
