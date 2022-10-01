import React from "react";

import { format } from "date-fns";

export type IBlogDateProps = {
  className?: string;
  date: string;
};

const BlogDate = ({ className, date }: IBlogDateProps) => (
  <div className={`text-gray-500 ${className}`}>
    {format(new Date(date), "LLL d")}
    <sup className="ml-2">&lsquo;{format(new Date(date), "yy")}</sup>
  </div>
);

export { BlogDate };
