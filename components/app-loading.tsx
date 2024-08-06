import { useState } from "react";
import useLayoutEffect from "@/helpers/use-isomorphic-layout-effect";

export function AppLoading({
  loading,
  children
}: {
  loading: boolean;
  children: any;
}) {
  return (
    <>
      {loading ?
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-10">
          <div className="flex space-x-3 justify-center items-center bg-transparent">
            <div className="h-3 w-3 bg-[#1e71f6] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-3 w-3 bg-[#1e71f6] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-3 w-3 bg-[#1e71f6] rounded-full animate-bounce"></div>
          </div>
        </div> :
        <></>}

      {children}
    </>
  );
}
