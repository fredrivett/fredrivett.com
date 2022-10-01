import React from "react";

import { AppProps } from "next/app";

import "../styles/main.scss";
import "../styles/prism-a11y-dark.scss";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default MyApp;
