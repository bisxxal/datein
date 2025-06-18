'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useSocket } from '@/hooks/useSocket';
import Back from '@/components/ui/back';
import { LuSend } from "react-icons/lu";
import { FiLoader } from 'react-icons/fi';
import moment from 'moment';
import { AiTwotoneDelete } from "react-icons/ai";
import PopUpCom from '@/components/ui/popUpCom';
type Message = {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
  chatId: string;
  sender?: {
    name: string | null;
    id: string
  };
};

type Props = {
  chatId: string;
  currentUserId: string;
};

const ChatRoom: React.FC<Props> = ({ chatId, currentUserId }) => {
  const { socket, ready, onlineUser } = useSocket({ userId: currentUserId });
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [msgloading, setMsgLoading] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [user, setUser] = useState<{ name: string | null, id: string } | null>(null);
  const url = process.env.NEXT_PUBLIC_BACKEND_URL
  // Fetch initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`${url}/api/chart/getmessages/?chatId=${chatId}&userId=${currentUserId}`);
      const data = await res.json();
      setMessages(data.messages || []);
      setUser(data.user.user);
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

    await fetch(`${url}/api/chart/sendmessage`, {
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
  return (
    <div className="flex relative flex-col h-screen w-full  min- h-screeen mx-auto px-4">
      <div className='fixed w-full h-[60px] pr-4 bg-[#c2c2c240] backdrop-blur-[18px] top-0 left-0 flex justify-between items-center shadow-xl '>
        <div className=' center gap-3'>
          <Back url={'/chat'} className='' />
          {user && <>
            <h1 className=' text-lg textbase font-semibold'>{user.name}</h1>
            {
              onlineUser && onlineUser.includes(user?.id) ? (
                <span className=' text-green-500'>Online</span>
              ) : (
                <span className=' text-red-500'>Offline</span>
              )}
          </>}
        </div>
        <p onClick={() => setShowPopUp(!showPopUp)} ><AiTwotoneDelete className=' text-red-500' size={23} /></p>

      </div>
      {
        showPopUp && <PopUpCom showPopUp={showPopUp} setShowPopUp={setShowPopUp} chatId={chatId} />
      }

      <div className='  flex flex-col mt-[70px]  mx-auto max-w-2xl rounded-2xl max-md:border-none max-md:shadow-none border border-black/10 shadow-xl p-2  w-full max-md:h-[83vh] h-[80vh]'>
        <div className=" w-full  overflow-y-auto space-y-3 rounded-2xl h-[70vh] max-md:h-[76vh] ">
          {messages?.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[80%] mt-3 w-fit py-1.5 overflow-hidden flex flex-col flex-wrap text-base font-normal px-5  ${msg.senderId === currentUserId ? 'bg-blue-60 buttonbg text-white rounded-b-2xl rounded-l-2xl ml-auto '
                  : 'bg-gray-10 sidebarbg text-black/60 rounded-b-2xl rounded-r-2xl'
                }  `}
            >
              <p className=' max-w-[99%]'>{msg.content}</p>
              <p className="text-xs opacity-70 mt- text-right">
                {moment(msg.createdAt).format('LT')}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className=" flex justify-between  glass overflow-hidden max-md:pr-[2px] rounded-3xl">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-4 py-2 w-[96%] focus:outline-none"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            // hidden={!newMessage}
            disabled={!newMessage}
            className={` ${!newMessage && " opacity-[0.5] "} base text-white px-5 max-md:px-2 rounded-3xl center  hover:bg-blue-700 `}>
            {msgloading ? <FiLoader className='text-xl animate-spin ' /> : <LuSend size={21} />}
          </button>
        </div>
      </div>
       
    </div>
  );
};

export default ChatRoom;
