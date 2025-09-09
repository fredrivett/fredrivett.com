import React, { useState, useEffect } from "react";

import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  arrow,
} from "@floating-ui/react";

const Tooltip = ({
  children,
  content,
  className,
  placement = "top",
}: {
  children: React.ReactNode;
  content: string;
  className?: string;
  placement?: "top" | "bottom" | "left" | "right";
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const arrowRef = React.useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    refs,
    floatingStyles,
    context,
    placement: computedPlacement,
    middlewareData,
  } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [
      offset(8),
      flip(),
      shift({ padding: 5 }),
      arrow({ element: arrowRef }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context);
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const { x: arrowX, y: arrowY } = middlewareData.arrow || {};

  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  }[computedPlacement.split("-")[0]] as string;

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={className}
      >
        {children}
      </div>
      {isMounted && isOpen && (
        <div
          className="bg-gray-900 text-white text-sm px-2 py-1 rounded shadow-lg z-50"
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {content}
          <div
            ref={arrowRef}
            className="absolute w-2 h-2 bg-gray-900 rotate-45"
            style={{
              left: arrowX != null ? `${arrowX}px` : "",
              top: arrowY != null ? `${arrowY}px` : "",
              [staticSide]: "-4px",
            }}
          />
        </div>
      )}
    </>
  );
};

export default Tooltip;
