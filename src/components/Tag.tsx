import React from "react";

import { cn } from "lib/cn";

type Props = React.HTMLAttributes<HTMLSpanElement>;

const Tag: React.FC<Props> = ({ className, ...rest }) => {
  return (
    <span
      className={cn(
        "px-3 py-1.5 print:font-bold text-sm bg-gray-200 dark:bg-gray-900 rounded-full",
        className,
      )}
      {...rest}
    />
  );
};

export default Tag;
