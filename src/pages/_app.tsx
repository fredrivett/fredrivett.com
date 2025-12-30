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
    <Toaster
      theme="dark"
      position="top-right"
      toastOptions={{ className: "!rounded-none text-sm" }}
      className="lg:!top-[5.5rem]"
    />
  </>
);

export default MyApp;
