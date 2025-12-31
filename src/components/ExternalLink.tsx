import React from "react";

type ExternalLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * A link component that automatically adds target="_blank" and rel="noopener noreferrer"
 * to external links (those starting with http:// or https://).
 * Internal links (relative paths, anchors, etc.) are rendered as normal links.
 */
export const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  children,
  ...props
}) => {
  const isAbsoluteUrl =
    href?.startsWith("http://") || href?.startsWith("https://");
  const isOwnDomain =
    href?.startsWith("https://fredrivett.com") ||
    href?.startsWith("http://fredrivett.com");
  const isExternal = isAbsoluteUrl && !isOwnDomain;

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
};
