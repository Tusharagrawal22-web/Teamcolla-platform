// src/pages/dashboard/ChatPage.tsx
import { useEffect, useState } from 'react';
import socket from '../../lib/socket';
import { useAuth } from '../../context/AuthContext';

export default function ChatPage() {
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    socket.on('receiveMessage', (message: { sender: string; content: string }) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    const messageData = {
      sender: currentUser?.name || 'Anonymous',
      content: input.trim(),
    };

    socket.emit('sendMessage', messageData); // emit to server
    setMessages((prev) => [...prev, messageData]); // display immediately
    setInput('');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Team Chat</h1>
      <div className="border rounded p-4 h-96 overflow-y-auto bg-white mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="text-sm text-gray-800">
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 border rounded px-3 py-2 mr-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
