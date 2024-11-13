// src/pages/ChatPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import ChatComponent from '../components/ChatComponent';

const ChatPage = () => {
  const { chatRoomId } = useParams(); 
  const [buyerId, sellerId] = chatRoomId ? chatRoomId.split('_') : [null, null]; 

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Chat Room between Buyer {buyerId} and Seller {sellerId}</h2>
      <ChatComponent 
        chatRoomId={chatRoomId} 
        buyerId={buyerId} 
        sellerId={sellerId} 
      />
    </div>
  );
};

export default ChatPage;
