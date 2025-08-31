import React from "react";

const Lines = () => {
  return (
    <div className="fixed top-0 left-0 -z-20 flex h-full w-full items-center justify-around">
      <span className="animate-line1 bg-stroke dark:bg-strokedark flex h-full w-[1px]"></span>
      <span className="animate-line2 bg-stroke dark:bg-strokedark flex h-full w-[1px]"></span>
      <span className="animate-line3 bg-stroke dark:bg-strokedark flex h-full w-[1px]"></span>
    </div>
  );
};

export default Lines;
