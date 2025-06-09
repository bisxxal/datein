'use client'
import moment from 'moment';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PiArrowBendUpLeft } from "react-icons/pi";

 
interface ChartsProps {
    chats: {
        chatId: string;
        name: string;
        image: string;
        chat:{
            participants: {
            user:{
                id: string;
                name: string;
                image: string;
            }
        }[];
        messages: {
            content: string;
            createdAt: string;
        }[];
        }
    }[];
    userId?: string;  
}
const Charts = ({chats ,userId}:ChartsProps) => {
  return (
    <div className='flex flex-col w-full'>
        {chats &&
            [...chats]
                .sort((a, b) => {
                    const dateA = a?.chat?.messages[0]?.createdAt
                        ? new Date(a.chat.messages[0].createdAt).getTime()
                        : 0;
                    const dateB = b?.chat?.messages[0]?.createdAt
                        ? new Date(b.chat.messages[0].createdAt).getTime()
                        : 0;
                    return dateB - dateA;
                })
                .map((item, i) => {
                    return (
                        <Link
                            href={`/user/chat/${item.chatId}`}
                            key={i}
                            className=' base3 rounded-3xl center mb-3 shadow-lg border-black/10 p-2 !justify-start '
                        >
                            {item.chat.participants
                                .filter((participant) => participant.user.id !== userId)
                                .map((participant, index) => (
                                    <div key={index} className='flex items-center gap-2'>
                                        <Image
                                            className='!w-[80px] !h-[80px] rounded-full border border-black/20 object-cover'
                                            src={participant?.user.image}
                                            alt={participant.user.name}
                                            width={300}
                                            height={300}
                                        />
                                        <div className=' flex flex-col'>
                                            <h1 className='pl-1 pt-1 text-sm text-gray-900'>
                                                {participant.user.name}
                                            </h1>
                                            {item?.chat?.messages[0]?.content && (
                                                <p className=' pl-3 text-sm text-blue-300 center gap-2'>
                                                    <PiArrowBendUpLeft size={21} />
                                                    {item?.chat?.messages[0]?.content}
                                                    <span className='text-xs text-gray-400 mt-1'>
                                                        {moment(item?.chat?.messages[0]?.createdAt).format(
                                                            'LT MMM Do '
                                                        )}
                                                    </span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </Link>
                    );
                })}
    </div>
  )
}

export default Charts