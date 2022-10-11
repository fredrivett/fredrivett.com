import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  cite: ReactNode;
};

const Testimonial = ({ children, cite }: Props) => (
  <blockquote className="relative ml-0 mb-8 text-sm">
    <div className="p-4 indent-4 bg-gray-200 rounded-xl">
      <span className="absolute top-1 left-0 md:top-0 md:-left-1 text-gray-500 fs-1 font-header">
        “
      </span>
      {children}
      <span className="absolute -mt-3 md:-mt-4 -ml-4 text-gray-500 fs-1 font-header">
        ”
      </span>
    </div>
    <cite className="mt-4 ml-4">{cite}</cite>
  </blockquote>
);

export default Testimonial;
