import React, { ReactNode } from "react";

import { RealTimeUsers } from "../components/RealTimeUsers";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  className?: string;
};

const Main = ({ children, className, meta }: IMainProps) => (
  <div
    className={`max-w-screen-md mx-auto antialiased w-full text-gray-700 px-3 mb-8 md:mb-16 md:px-0 ${className}`}
  >
    {meta}

    <div className="text-xl py-5">{children}</div>

    <RealTimeUsers />
  </div>
);

export { Main };
