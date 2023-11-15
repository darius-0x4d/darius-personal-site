import * as React from "react";

// Based off code from Tim Wilson: https://twitter.com/actualTimWilson/status/1707408675424383443

export const BlurredBackground = (): JSX.Element => {
  return (
    <div className="absolute flex-initial w-screen items-center justify-center h-48 lg:h-32">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden blur-[10vw] saturate-150">
        <div className="absolute h-full w-full animate-orbit">
          <div className="absolute left-[25%] top-[25%] w-[50%] rounded-full bg-sky-500 pb-[50%]"></div>
        </div>
        <div className="absolute h-1/2 w-full animate-orbit2">
          <div className="absolute left-[25%] top-[20%] w-[40%] rounded-full bg-fuchsia-500 pb-[40%]"></div>
        </div>
        <div className="absolute h-full w-full animate-orbit3">
          <div className="absolute left-[30%] top-[50%] w-[30%] rounded-full bg-cyan-400 pb-[30%]"></div>
        </div>
        <div className="absolute h-full w-1/2 animate-orbit4">
          <div className="absolute left-[25%] top-[25%] w-[30%] rounded-full bg-white pb-[30%]"></div>
        </div>
      </div>
    </div>
  );
};
