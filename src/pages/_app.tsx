import React from "react";

import { AppProps } from "next/app";
import { Toaster } from "sonner";

import { Nav } from "navigation/Nav";

import "styles/main.scss";
import "styles/prism-a11y-dark.scss";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Nav />
    <Component {...pageProps} />
    <Toaster theme="dark" toastOptions={{ className: "!rounded-none" }} />
  </>
);

export default MyApp;
