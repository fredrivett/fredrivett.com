import styled from "styled-components";
import tw from "twin.macro";

// be sure to add these to the safelist in `tailwind.config.js` otherwise they
// won't appear on initial load
const maxWidthVariants = {
  prose: tw`max-w-prose`,
  md: tw`max-w-screen-md`,
  lg: tw`max-w-screen-lg`,
  xl: tw`max-w-screen-xl`,
  "2xl": tw`max-w-screen-2xl`,
};

export default styled.div<{ maxWidth?: "2xl" | "lg" | "md" | "prose" | "xl" }>(
  () => [
    tw`flex flex-col mx-auto px-4 sm:px-8 box-content`,
    ({ maxWidth = "lg" }) => maxWidthVariants[maxWidth],
  ],
);
