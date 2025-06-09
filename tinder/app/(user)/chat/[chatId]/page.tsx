// 'use client';
import { authOptions } from '@/lib/auth';
import ChatRoom from '../../../_components/ChatRoom';
import { getServerSession } from "next-auth"

export default async function ChatPage({ params }: { params: { chatId: string } }) {

 const session = await getServerSession(authOptions)  

  const currentUserId = session?.user.id as string
// console.log(params.chatId, 'currentUserId' , currentUserId);
  return <ChatRoom chatId={params.chatId} currentUserId={currentUserId} />;
}
