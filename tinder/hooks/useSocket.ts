import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:8000';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL);
      socketRef.current.on('connect', () => {
        setReady(true);
      });
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  return { socket: socketRef.current, ready };
};
