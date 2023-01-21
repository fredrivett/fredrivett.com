import React, { ReactNode } from "react";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  className?: string;
};

const Main = ({ children, className, meta }: IMainProps) => (
  <div
    className={`mx-auto antialiased w-full mb-8 md:mb-16 py-8 md:py-14 lg:py-20 ${
      className || ``
    }`}
  >
    {meta}
    {children}
  </div>
);

export { Main };
