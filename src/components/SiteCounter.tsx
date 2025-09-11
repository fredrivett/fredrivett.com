"use client";

import React, { useState, useEffect } from "react";

interface SiteCounterProps {
  className?: string;
}

const SiteCounter: React.FC<SiteCounterProps> = ({ className = "" }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Add a small delay to ensure the widget script has time to detect the element
    // This helps with timing issues on fast-rendering pages
    const timer = setTimeout(() => {
      // Dispatch a custom event to notify the widget of a new element
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("herenow-scan"));
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Don't render anything during SSR
  if (!mounted) return null;

  return (
    <div className={className}>
      <div data-herenow />
    </div>
  );
};

export default SiteCounter;
