// src/components/ChatComponent.jsx
import React, { useEffect, useState, useRef } from 'react';
// import { firestore } from '../firebase';
import { collection, addDoc, query, onSnapshot, orderBy, serverTimestamp } from 'firebase/firestore';

const ChatComponent = ({ chatRoomId, buyerId, sellerId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Placeholder image URL (feel free to replace this with any preferred image URL)
  const placeholderImage = "https://randomuser.me/api/portraits/lego/1.jpg";

  useEffect(() => {
    const messagesRef = collection(firestore, 'chats', chatRoomId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [chatRoomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const messagesRef = collection(firestore, 'chats', chatRoomId, 'messages');
      await addDoc(messagesRef, {
        text: newMessage,
        timestamp: serverTimestamp(),
        sender: buyerId || sellerId || 'Anonymous',
        senderId: buyerId || sellerId || 'Anonymous',
      });
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto font-sans">
      <div className="chat-window overflow-y-auto border rounded-lg p-4 max-h-[500px] bg-base-100 shadow-md">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`chat ${msg.senderId === buyerId ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img 
                  src={placeholderImage} 
                  alt="profile"
                />
              </div>
            </div>
            <div className="chat-header">
              {msg.sender} <time className="text-xs opacity-50 ml-2">{new Date(msg.timestamp?.toDate()).toLocaleTimeString()}</time>
            </div>
            <div className={`chat-bubble ${msg.senderId === buyerId ? "bg-primary text-white" : "bg-gray-200"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center mt-4">
        <input 
          type="text" 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          placeholder="Type your message..." 
          className="input input-bordered flex-grow rounded-full"
        />
        <button onClick={sendMessage} className="btn btn-primary ml-2 rounded-full">Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
