import React, { ReactNode } from "react";

import Spacer from "components/Spacer";
import Tag from "components/Tag";

interface Link {
  url: string;
  text: string;
}

interface ICvRoleProps {
  title: string;
  company: string;
  links?: Link[];
  dates: string;
  blurb: string[];
  tags: string[];
}

const CvRole = ({
  title,
  company,
  links,
  dates,
  blurb,
  tags,
}: ICvRoleProps) => (
  <div className="mb-6 md:mb-12">
    <h3 className="mb-0">{title}</h3>
    <p className="font-bold mb-0">
      {company}
      {links && " ("}
      {links &&
        links
          .map<ReactNode>((link) => (
            <a
              key={link.url}
              href={link.url}
              rel="nofollow noreferrer"
              target="_blank"
            >
              {link.text}
            </a>
          ))
          .reduce((prev, curr) => [prev, " / ", curr])}
      {links && ")"}
    </p>
    <p>{dates}</p>
    {blurb.map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ))}
    <Spacer>
      {tags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </Spacer>
  </div>
);

export { CvRole };
