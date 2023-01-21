import styled from "styled-components";
import tw from "twin.macro";

export default styled.span<{ icon: "arrow" | "happy" }>(() => [
  tw`after:text-gray-400 dark:after:text-gray-800`,
  ({ icon }) =>
    icon === "arrow" && [
      tw`after:content-['\\21B4'] after:relative after:ml-2`,
      `&::after { font-size: 0.7em; top: 0.3em; right: 0em; }`,
    ],
  ({ icon }) => icon === "happy" && [tw`after:content-['( ¨̮ )'] after:ml-2`],
]);
