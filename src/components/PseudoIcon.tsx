import React from "react";

import { cn } from "lib/cn";

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  icon: "arrow" | "happy";
};

const PseudoIcon: React.FC<Props> = ({ icon, className, ...rest }) => {
  return (
    <span
      className={cn(
        "after:text-gray-400 dark:after:text-gray-800",
        icon === "arrow" &&
          "after:content-['\\21B4'] after:relative after:ml-2",
        icon === "happy" && "after:content-['( ¨̮ )'] after:ml-2",
        className,
      )}
      style={icon === "arrow" ? { fontSize: undefined } : undefined}
      {...rest}
    />
  );
};

export default PseudoIcon;
