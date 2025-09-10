import React from "react";

type MaxWidth = "2xl" | "lg" | "md" | "prose" | "xl";

const maxWidthClass: Record<MaxWidth, string> = {
  prose: "max-w-prose",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: MaxWidth;
}

const Container: React.FC<Props> = ({
  maxWidth = "lg",
  className = "",
  ...rest
}) => {
  const base = "flex flex-col mx-auto px-4 sm:px-8 box-content";
  const mw = maxWidthClass[maxWidth];
  return <div className={`${base} ${mw} ${className}`} {...rest} />;
};

export default Container;
