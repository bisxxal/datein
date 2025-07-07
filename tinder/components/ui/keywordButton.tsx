
import { PopUpProps } from '@/util/constant';
import React from 'react'

const KeywordButton = ({ current, user }: PopUpProps) => {
  return (
    <div className=" !text-sm  mt-3 font-light flex flex-wrap">
      {current?.profile?.keywords?.map((i: { name: string }, index: number) => {
        const isMatch = user?.profile?.keywords?.some((u: { name: string }) => u.name.toLowerCase() === i.name.toLowerCase());
        return (
          <span key={index}
            className={`${isMatch ? "rounded-full !text-sm buttonbg2 text-white border-red-500"
                : "bg-white/10 border border-white/40"} backdrop-blur-[8px]  px-2.5 py-1 center  rounded-full mr-2 mb-1`}>
            {i.name}
          </span>
        );
      })}
    </div>
  )
}

export default KeywordButton