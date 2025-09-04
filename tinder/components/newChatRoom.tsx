'use client'; 
import React, { useEffect, useState, useRef } from 'react';
import { useSocket } from '@/hooks/useSocket'; 
import moment from 'moment'; 
import toast from 'react-hot-toast';
import { Ban , Loader, Send, Trash } from 'lucide-react'
import { useInfiniteQuery } from '@tanstack/react-query';

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

const NewChatRoom: React.FC<Props>= ({ chatId, currentUserId }) => {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [selectedMessages, setSelectedMessages] = useState<Set<string>>(new Set());
    const [sending, setSending] = useState(false);
    const { socket, ready, onlineUser } = useSocket({ userId: currentUserId });
    
   const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,} = useInfiniteQuery({
    queryKey: ['chatMessages', chatId],
    queryFn: async ({ pageParam = null }) => {
      const res = await fetch(`${url}/api/chart/getmessages/?chatId=${chatId}&userId=${currentUserId}${pageParam ? `&cursor=${pageParam}` : ''}`);
      const data = await res.json();
      if (data.status === 403) {
        toast.error('You are not a participant in this chat');
      }
      return data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.hasMore && lastPage.messages.length > 0) {
        return lastPage.messages[lastPage.messages.length - 1].id;
      }
      return undefined;
    },
        initialPageParam: null,
    enabled: !!chatId && !!currentUserId,
  });


  const bottomRef = useRef<HTMLDivElement | null>(null);
  const messages = data?.pages.flatMap(page => page.messages) ?? [];
  const user = data?.pages[0].user;

  useEffect(() => {
    const onNewMessage = (msg: Message) => {
      if (msg.chatId === chatId) {
        refetch();
      }
    };
    const onDeleted = ({ chatId: cId, messageIds }: { chatId: string, messageIds: string[] }) => {
      if (cId === chatId) {
        refetch();
      }
    };

    if (ready && socket) {
      socket.emit('join', chatId);
      socket.on('new_message', onNewMessage);
      socket.on('message_deleted', onDeleted);
    }

    return () => {
      if (socket) {
        socket.off('new_message', onNewMessage);
        socket.off('message_deleted', onDeleted);
      }
    };
  }, [socket, ready, chatId, refetch]);

  const handleScroll = () => {
    const scrollEl = scrollRef.current;
    if (scrollEl && scrollEl.scrollTop < 100 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
    useEffect(() => {
    if (!isLoading && data?.pages.length === 1) {
        bottomRef.current?.scrollIntoView({ behavior: 'auto' });
    }
    }, [isLoading, data]);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (scrollEl) scrollEl.addEventListener('scroll', handleScroll);
    return () => {
      if (scrollEl) scrollEl.removeEventListener('scroll', handleScroll);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    setSending(true);
    await fetch(`${url}/api/chart/sendmessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId, senderId: currentUserId, content: newMessage }),
    });
    setNewMessage('');
    setSending(false);
  };

  const deleteSelectedMessages = async () => {
    const messageIds = Array.from(selectedMessages);
    const res = await fetch(`${url}/api/chart/deletemessages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messageIds }),
    });
    const data = await res.json();
    if (data.status) {
      socket?.emit('message_deleted', { chatId, messageIds });
      toast.success('Messages deleted');
      setSelectedMessages(new Set());
      refetch();
    }
  };

  const toggleSelectMessage = (id: string) => {
    setSelectedMessages(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  useEffect(() => {
  if (sending === false) {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }
}, [sending]);

  const groupedMessages = messages?.reduce<Record<string, Message[]>>((acc, message) => {
    const dateKey = moment(message.createdAt).format('YYYY-MM-DD');
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(message);
    return acc;
  }, {});

  return (
    <div className="flex flex-col h-screen w-full p-4">
      <div className="h-[60px] border-b flex items-center justify-between px-2 bg-white/10 backdrop-blur-md shadow-md">
        <div>
          {user ? (
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-xs">{onlineUser?.includes(user?.id) ? 'Online' : 'Offline'}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        {selectedMessages.size > 0 && (
          <div className="flex gap-2">
            <button onClick={() => setSelectedMessages(new Set())}><Ban /></button>
            <button onClick={deleteSelectedMessages}><Trash /></button>
          </div>
        )}
      </div>
 

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-2 py-3 space-y-3">
  {isLoading ? (
    <p className="text-center text-gray-500">Loading messages...</p>
  ) : messages.length === 0 ? (
    <p className="text-center text-gray-500">Say hi 👋 to start the conversation!</p>
  ) : (
    [...messages]
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .map((msg) => {
        const isOwn = msg.senderId === currentUserId;
        const isSelected = selectedMessages.has(msg.id);
        return (
          <div
            key={msg.id}
            onClick={() => toggleSelectMessage(msg.id)}
            className={`max-w-[70%] w-fit px-4 py-2 rounded-2xl ${
              isOwn ? 'ml-auto bg-blue-500 text-white' : 'bg-gray-200 text-black'
            } ${isSelected ? 'ring-2 ring-red-400' : ''}`}
          >
            <p>{msg.content}</p>
            <p className="text-xs text-right">{moment(msg.createdAt).format('LT')}</p>
          </div>
        );
      })
  )}
  <div ref={bottomRef} />
  {isFetchingNextPage && (
    <p className="text-center text-xs text-gray-400">Loading more...</p>
  )}
</div>
 
      <div className="flex items-end gap-2 mt-2">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          rows={1}
          placeholder="Type a message..."
          className="flex-1 resize-none border px-4 py-2 rounded-2xl"
        />
        <button
          disabled={!newMessage.trim()}
          onClick={sendMessage}
          className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center"
        >
          {sending ? <Loader className="animate-spin" /> : <Send />}
        </button>
      </div>
    </div>
  );
}

export default NewChatRoom