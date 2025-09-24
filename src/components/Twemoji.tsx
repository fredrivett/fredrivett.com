import React from "react";

import twemoji from "twemoji";

type TwemojiProps = {
  emoji: string;
  size?: number;
  className?: string;
  label?: string;
};

const CDN_BASE = "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg";

const Twemoji = ({ emoji, size = 20, className, label }: TwemojiProps) => {
  const codePoint = twemoji.convert.toCodePoint(emoji);
  const altText = label ?? emoji;

  return (
    <img
      src={`${CDN_BASE}/${codePoint}.svg`}
      width={size}
      height={size}
      alt={altText}
      className={className}
      draggable={false}
      loading="lazy"
    />
  );
};

export default Twemoji;
