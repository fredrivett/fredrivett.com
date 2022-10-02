import React from "react";

import Script from "next/script";

const RealTimeUsers = () => (
  <div className="py-8">
    <div className="realtimeuserscounter realtimeuserscounter--styled"></div>
    <Script src="https://realtimeusers.bycontrast.co/realtimeusers.js" />
  </div>
);

export { RealTimeUsers };
