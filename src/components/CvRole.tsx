import React, { ReactNode } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "components/Avatar";
import Spacer from "components/Spacer";
import Tag from "components/Tag";

interface Link {
  url: string;
  text: string;
}

interface ICvRoleProps {
  title: string;
  company: string;
  companyLogoPath?: string;
  links?: Link[];
  dates: string;
  blurb: string[];
  tags: string[];
}

const CvRole = ({
  title,
  company,
  companyLogoPath,
  links,
  dates,
  blurb,
  tags,
}: ICvRoleProps) => (
  <div className="mb-6 md:mb-12">
    <h3 className="mb-2">{title}</h3>
    <p className="font-bold mb-0.5 flex items-center gap-2.5">
      <Avatar className="h-7 w-7 flex-shrink-0 shadow-xs" type="org">
        {companyLogoPath ? (
          <AvatarImage
            alt={company}
            src={`/assets/images/company-logos/${companyLogoPath}`}
          />
        ) : undefined}
        <AvatarFallback>{company}</AvatarFallback>
      </Avatar>
      <span>
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
      </span>
    </p>
    <p className="opacity-50">{dates}</p>
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
