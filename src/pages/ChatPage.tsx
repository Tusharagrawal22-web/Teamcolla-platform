import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5173'); // Replace with your server URL

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('chat-message', (message: string) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('chat-message');
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('chat-message', input);
      setMessages((prev) => [...prev, `You: ${input}`]);
      setInput('');
    }
  };

  return (
    <div className="p-6 min-h-[80vh] bg-white rounded shadow flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Team Chat</h1>
      <div className="flex-1 overflow-y-auto border p-4 rounded mb-4 bg-gray-50 space-y-2">
        {messages.map((msg, idx) => (
          <p key={idx} className="text-sm text-gray-800">{msg}</p>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 border px-3 py-2 rounded text-sm"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
