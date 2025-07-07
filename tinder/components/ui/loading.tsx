
import React from 'react';

const LoadingCom = ({ boxes, child, parent }: { boxes: number, child?: string, parent?: string }) => {
  return (
    <div className={`!${parent} w-full items-center justify-center flex flex-col px-3 gap-4 `}>
      {Array.from({ length: boxes }).map((_, index) => (
        <div key={index} className={`${child} h-14 rounded-xl bg-[#9393 93 backdrop-blur-[10px] relative overflow-hidden`}>
          <div className={` w-full h-full absolute top-0 left-0 bg-gradient-to-r from-[#00000014]   backdrop-blur-[10px] via-[#d5d5d575] to-[#00000014] pulseShimmer`}></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingCom;
