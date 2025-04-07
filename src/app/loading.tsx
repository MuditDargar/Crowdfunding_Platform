import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-[#164863] border-solid"></div>
    </div>
  );
}

export default Loading;
