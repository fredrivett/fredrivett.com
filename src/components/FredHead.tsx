import React, { FunctionComponent, ReactNode } from "react";

interface Props {
  title: string;
  after?: ReactNode;
}

const FredHead: FunctionComponent<Props> = ({ title, after }) => (
  <div className="flex items-center gap-4 mb-2">
    <div className="flex items-center">
      <a
        className="no-underline hover:opacity-50"
        href="https://twitter.com/fredrivett"
        rel="nofollow noreferrer"
        target="_blank"
      >
        <img
          alt="Photo of me (Fred)"
          src="/assets/images/fredrivett.jpg"
          className="inline-block w-14 h-14 mr-1 rounded-full"
        />
      </a>
      <h1 className="font-mono mb-0 font-normal fs-2 text-gray-500">
        /{title}
      </h1>
    </div>
    {after && <div>{after}</div>}
  </div>
);

export default FredHead;
