import React, { FunctionComponent } from "react";

import styled from "styled-components";
import tw from "twin.macro";

const SSpacer = styled.div.attrs(({ className }) => ({
  className,
}))`
  ${tw`flex flex-wrap -mr-2 -mb-2 md:-mr-3 md:-mb-3`};

  & > * {
    ${tw`flex-shrink-0 mr-2 mb-2 md:mr-3 md:mb-3`};
  }
`;

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Spacer: FunctionComponent<Props> = ({ children, className }) => (
  <SSpacer className={className}>{children}</SSpacer>
);

export default Spacer;
