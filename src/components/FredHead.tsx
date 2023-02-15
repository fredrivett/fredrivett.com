import React, { FunctionComponent } from "react";

interface Props {
  title: string;
}

const FredHead: FunctionComponent<Props> = ({ title }) => (
  <div className="flex items-center mb-2">
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
    <h1 className="font-mono mb-0 font-normal fs-2 text-gray-500">/{title}</h1>
  </div>
);

export default FredHead;
