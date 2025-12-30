import { ReactNode, Children, isValidElement } from "react";

/**
 * Recursively extracts text content from React children.
 * Handles nested elements and arrays of children.
 */
export function getTextFromChildren(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string") {
        return child;
      }
      if (typeof child === "number") {
        return String(child);
      }
      if (isValidElement(child) && child.props.children) {
        return getTextFromChildren(child.props.children);
      }
      return "";
    })
    .join("");
}
