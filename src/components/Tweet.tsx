import React from "react";

import { Tweet as EmbeddedTweet } from "react-tweet";

interface TweetProps {
  id: string;
}

const Tweet: React.FC<TweetProps> = ({ id }) => {
  return (
    <div className="my-8 first:mt-0 last:mb-0 [&>*]:!my-0">
      <EmbeddedTweet id={id} />
    </div>
  );
};

export default Tweet;
