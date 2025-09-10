import React, { FunctionComponent } from "react";

import { cn } from "lib/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Spacer: FunctionComponent<Props> = ({ children, className }) => (
  <div
    className={cn("flex flex-wrap -mr-2 -mb-2 md:-mr-3 md:-mb-3", className)}
  >
    {/* apply spacing to children */}
    {React.Children.map(children, (child) => (
      <div className="flex-shrink-0 mr-2 mb-2 md:mr-3 md:mb-3">{child}</div>
    ))}
  </div>
);

export default Spacer;
