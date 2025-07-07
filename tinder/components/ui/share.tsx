'use client'
import { Share } from 'lucide-react';
import React from 'react'
import { WhatsappShareButton } from 'react-share'
const ShareCom = () => {
    const shareUrl = 'https://date-in.vercel.app/'
    return (
        <div className=' w-full h-full border-2 border-blue-500 bg-blue-600/30  rounded-3xl center '>
            <WhatsappShareButton url={shareUrl} title="Check out this awesome site!">
                <div className=" w-full px-5 flex-col h-full  center">
                    <p className=" center my-4 max-md:my-1 text-3xl max-md:text-xl gap-4"> Share Date in. <Share /> </p>
                    <p className=" max-md:text-xs text-center "> share Date in .</p>
                </div>
            </WhatsappShareButton>
        </div>
    )
}

export default ShareCom