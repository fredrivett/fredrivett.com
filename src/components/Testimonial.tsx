import React, { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
  cite: ReactNode;
};

const Testimonial = ({ className, children, cite }: Props) => (
  <blockquote className={`relative ml-0 text-sm ${className ?? ""}`}>
    <div className="relative p-4 print:p-3 indent-4 bg-gray-200 dark:bg-gray-900 rounded-xl rounded-bl-none print:rounded-lg print:rounded-bl-none after:content-[''] after:absolute after:top-full after:left-0 after:w-6 after:h-6 after:bg-gray-200 dark:after:bg-gray-900 after:pointer-events-none after:[mask-image:radial-gradient(circle_at_100%_100%,transparent_0,transparent_1.5rem,#000_1.5rem)] after:[-webkit-mask-image:radial-gradient(circle_at_100%_100%,transparent_0,transparent_1.5rem,#000_1.5rem)] after:[mask-repeat:no-repeat] after:[-webkit-mask-repeat:no-repeat] after:[mask-size:100%] after:[-webkit-mask-size:100%]">
      <span className="absolute top-1 left-0 md:top-0 md:-left-1 text-gray-500 dark:text-gray-700 fs-1 font-header">
        “
      </span>
      {children}
      <span className="absolute -mt-3 md:-mt-4 -ml-4 text-gray-500 dark:text-gray-700 fs-1 font-header">
        ”
      </span>
    </div>
    <cite className="mt-4 ml-4">{cite}</cite>
  </blockquote>
);

export default Testimonial;
