import React from "react";

import { cn } from "lib/cn";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "sm" | "md";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary:
    "border border-gray-300 dark:border-gray-800 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-900 focus:ring-gray-400",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "py-1 px-2.5 text-sm",
  md: "py-2 px-4 text-sm",
};

const baseClass =
  "inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", type = "button", className, ...rest },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        baseClass,
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...rest}
    />
  ),
);

Button.displayName = "Button";

export default Button;
