"use client";

import * as React from "react";

import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "lib/cn";

/**
 * Utility for generating consistent avatar colors based on string input
 */

// Define a set of background colors to use for avatars
export const AVATAR_COLORS = [
  "bg-blue-100 text-blue-800",
  "bg-green-100 text-green-800",
  "bg-yellow-100 text-yellow-800",
  "bg-red-100 text-red-800",
  "bg-purple-100 text-purple-800",
  "bg-pink-100 text-pink-800",
  "bg-indigo-100 text-indigo-800",
  "bg-cyan-100 text-cyan-800",
  "bg-amber-100 text-amber-800",
  "bg-emerald-100 text-emerald-800",
  "bg-violet-100 text-violet-800",
  "bg-rose-100 text-rose-800",
];

/**
 * Generates a consistent color class based on a string input
 * @param text String to generate color from
 * @returns Tailwind classes for background and text color
 */
export function getAvatarColorFromText(text: string): string {
  if (!text) return AVATAR_COLORS[0];

  // Generate a number from 0-11 based on the string
  // Sum the character codes of the string
  const charSum = text
    .toLowerCase()
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  // Use modulo to get an index within our color array
  const colorIndex = charSum % AVATAR_COLORS.length;

  return AVATAR_COLORS[colorIndex];
}

type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> & {
  type: "org" | "user";
};

function Avatar({ className, type, ...props }: AvatarProps) {
  const radiusClass = type === "org" ? "rounded-md" : "rounded-full";
  return (
    <AvatarPrimitive.Root
      className={cn(
        "relative flex h-8 w-8 border border-gray-200 dark:border-gray-900 shrink-0 overflow-hidden",
        radiusClass,
        className,
      )}
      data-slot="avatar"
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      className={cn("aspect-square w-full", className)}
      data-slot="avatar-image"
      {...props}
    />
  );
}

function AvatarFallback({
  children,
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  const text = typeof children === "string" ? children : "";
  const colorClasses = React.useMemo(() => {
    return getAvatarColorFromText(text);
  }, [text]);

  return (
    <AvatarPrimitive.Fallback
      className={cn(
        "flex w-full items-center justify-center",
        colorClasses,
        className,
      )}
      data-slot="avatar-fallback"
      {...props}
    >
      {typeof children === "string"
        ? children.slice(0, 1).toUpperCase()
        : children}
    </AvatarPrimitive.Fallback>
  );
}

export { Avatar, AvatarFallback, AvatarImage };
