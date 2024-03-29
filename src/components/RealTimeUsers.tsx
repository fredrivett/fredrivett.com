import React from "react";

import Script from "next/script";

const RealTimeUsers = () => (
  <div className="mt-auto pt-8 pb-16 lg:pb-24 text-center print:hidden">
    <div className="realtimeuserscounter realtimeuserscounter--styled"></div>
    <Script src="https://realtimeusers.bycontrast.co/realtimeusers.js" />
  </div>
);

export { RealTimeUsers };
