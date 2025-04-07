import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

interface ChatContextType {
  socket: Socket | null;
  currentChat: string | null;
  messages: any[];
  sendMessage: (content: string) => void;
  joinChat: (chatId: string) => void;
  markMessagesAsRead: (chatId: string) => void;
}

const ChatContext = createContext<ChatContextType>({
  socket: null,
  currentChat: null,
  messages: [],
  sendMessage: () => {},
  joinChat: () => {},
  markMessagesAsRead: () => {}
});

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentChat, setCurrentChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on('messages_read', ({ chatId }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.chatId === chatId ? { ...msg, read: true } : msg
        )
      );
    });

    return () => {
      socket.off('receive_message');
      socket.off('messages_read');
    };
  }, [socket]);

  const joinChat = (chatId: string) => {
    if (!socket) return;
    socket.emit('join_chat', chatId);
    setCurrentChat(chatId);
  };

  const sendMessage = (content: string) => {
    if (!socket || !currentChat || !user) return;

    socket.emit('send_message', {
      chatId: currentChat,
      senderId: user.id,
      content
    });
  };

  const markMessagesAsRead = (chatId: string) => {
    if (!socket || !user) return;

    socket.emit('mark_read', {
      chatId,
      userId: user.id
    });
  };

  return (
    <ChatContext.Provider
      value={{
        socket,
        currentChat,
        messages,
        sendMessage,
        joinChat,
        markMessagesAsRead
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};