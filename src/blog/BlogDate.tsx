import React from "react";

export type IBlogDateProps = {
  className?: string;
  date: string;
};

const monthDayFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  month: "short",
  day: "numeric",
});

const yearFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  year: "2-digit",
});

const BlogDate = ({ className, date }: IBlogDateProps) => {
  const parsedDate = new Date(date);

  return (
    <div className={`text-gray-500 ${className}`}>
      {monthDayFormatter.format(parsedDate)}
      <sup className="ml-2">&lsquo;{yearFormatter.format(parsedDate)}</sup>
    </div>
  );
};

export { BlogDate };
