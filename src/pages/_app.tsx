import React from "react";

import { AppProps } from "next/app";

import { RealTimeUsers } from "components/RealTimeUsers";
import { Nav } from "navigation/Nav";

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
