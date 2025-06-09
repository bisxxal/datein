'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useSocket } from '@/hooks/useSocket';
import Back from '@/components/ui/back';
import { LuSend } from "react-icons/lu";
import { MdBlock } from "react-icons/md";
import { deleteAllMessages } from '@/actions/chart';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FiLoader } from 'react-icons/fi';
 import moment from 'moment';
 import { AiTwotoneDelete } from "react-icons/ai";
type Message = {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
  chatId: string;
  sender?: {
    name: string | null;
  };
};

type Props = {
  chatId: string;
  currentUserId: string;
};

const ChatRoom: React.FC<Props> = ({ chatId, currentUserId }) => {
  const { socket, ready } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [msgloading, setMsgLoading] = useState(false);

  const router = useRouter();
  // Fetch initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`http://localhost:8000/api/chart/getmessages/?chatId=${chatId}`);
      const data = await res.json();
      setMessages(data.messages || []);
    };
    fetchMessages();
  }, [chatId]);

  // Join socket room & listen when socket is ready
  useEffect(() => {
    if (!ready || !socket) return;

    socket.emit('join', chatId);

    const onNewMessage = (msg: Message) => {
      if (msg.chatId === chatId) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on('new_message', onNewMessage);

    return () => {
      socket.off('new_message', onNewMessage);
    };
  }, [chatId, socket, ready]);

  // Scroll to bottom on message update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
 
  const sendMessage = async () => {
    setMsgLoading(true);
    if (!newMessage.trim()) return;

    await fetch('http://localhost:8000/api/chart/sendmessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        senderId: currentUserId,
        chatId,
        content: newMessage,
      }),
    });
    setNewMessage('');
    setMsgLoading(false);
  };

  const deleteCharts = async ()=>{
    const res =await deleteAllMessages(chatId)
    console.log(res.res === true)
    if(res.res){
      toast.success("deleted all messages")
      router.refresh()
    }
    else{
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="flex relative flex-col h-screen max-w-2xl min- h-screeen mx-auto px-4">
      <div className='fixed w-full h-[60px] pr-4 bg-[#c2c2c240] backdrop-blur-[18px] top-0 left-0 flex justify-between items-center shadow-xl '>
      <div className=' center gap-3'>
        <Back/>
        <h1 className=' text-lg textbase font-semibold'>User name</h1>
      </div>
      <p onClick={()=>deleteCharts()}><AiTwotoneDelete className=' text-red-500' size={23}/></p>
      </div>
    
        <div className='  flex flex-col mt-[70px] rounded-2xl max-md:border-none max-md:shadow-none border border-black/10 shadow-xl p-2  w-full max-md:h-[83vh] h-[80vh]'>
    <div className="flex- overflow-y-auto space-y-3 rounded-2xl h-[70vh] max-md:h-[76vh] ">
        { messages?.map((msg ) => (
          <div
            key={msg.id}
            className={`min-w-[30% w-fit py-1.5 text-base font-normal px-5 rounded-lg ${
              msg.senderId === currentUserId ? 'bg-blue-60 buttonbg text-white rounded-br-2xl ml-auto '
                : 'bg-gray-10 sidebarbg text-black/60 rounded-bl-2xl'
            }  `}
          >
            {/* <div className="text-sm font-semibold">{msg.sender?.name || 'User'}</div> */}
            <div>{msg.content}</div>
            <div className="text-xs opacity-70 mt- text-right">
              {moment(msg.createdAt).format('LT') }
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
  

      <div className="mt-4 flex border sidebg overflow-hidden border-gray-300 rounded-3xl">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-4 py-2  focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          hidden={!newMessage}
          disabled={!newMessage }
          className=" base text-white px-5 rounded-3xl center  hover:bg-blue-700 ">
          {msgloading ?  <FiLoader className='text-xl animate-spin '/> : <LuSend size={21} />}
        </button>
      </div>
    </div>
  {/* :
    <LoadingCom boxes={1} width='rounded-2xl mt-[70px] w-full h-[80vh]' margin=' ' /> 
  }
  */}

    </div>
  );
};

export default ChatRoom;
