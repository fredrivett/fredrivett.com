import React, { FunctionComponent } from "react";

interface Props {
  emoji: string;
  href?: string;
  name: string;
  rel?: string;
  target?: "_blank";
}

const Project: FunctionComponent<Props> = ({
  emoji,
  href,
  name,
  rel,
  target,
}) => {
  const HtmlElement = href ? "a" : "div";

  return (
    <HtmlElement
      className="inline-flex px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full fs-5"
      href={href}
      rel={rel}
      target={target}
    >
      {emoji} {name}
    </HtmlElement>
  );
};

export default Project;
