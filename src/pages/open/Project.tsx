import React, { FunctionComponent } from "react";

import { formatDuration } from "date-fns";

interface Props {
  seconds: number;
  emoji: string;
  href?: string;
  name: string;
  rel?: string;
  target?: "_blank";
}

const getDuration = (seconds: number) => {
  const secondsInMinute = 60;
  const secondsInHour = 60 * secondsInMinute;
  const secondsInDay = 24 * secondsInHour;

  const days = Math.floor(seconds / secondsInDay);
  const hours = Math.floor((seconds % secondsInDay) / secondsInHour);
  const minutes = Math.floor((seconds % secondsInHour) / secondsInMinute);

  return {
    days,
    hours,
    minutes,
  };
};

const Project: FunctionComponent<Props> = ({
  seconds,
  emoji,
  href,
  name,
  rel,
  target,
}) => {
  const HtmlElement = href ? "a" : "div";

  const duration = formatDuration(getDuration(seconds));

  return (
    <HtmlElement
      className="inline-flex gap-2 flex-wrap items-end max-w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-3xl fs-5"
      href={href}
      rel={rel}
      target={target}
    >
      <span>
        {emoji} {name}
      </span>
      <span className="text-sm">{duration ? `(${duration})` : ""}</span>
    </HtmlElement>
  );
};

export default Project;
