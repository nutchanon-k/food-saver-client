import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import ChatComponent from '../components/ChatComponent';
import useUserStore from '../stores/userStore';

const SellerInboxPage = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null); // ChatRoomId for the selected buyer
  const currentUser = useUserStore((state) => state.user); // Assuming seller is the current user

  useEffect(() => {
    if (!currentUser) return;
  
    const chatsRef = ref(database, 'chats');
    const unsubscribe = onValue(chatsRef, (snapshot) => {
      const data = snapshot.val();
      const sellerChats = [];
  
      for (let chatRoomId in data) {
        const [buyerId, sellerId] = chatRoomId.split('_');
  
        // Only include chats where the current user is the seller
        if (sellerId === String(currentUser.id)) {
          const chatData = data[chatRoomId];
          const latestMessage = chatData.latestMessage;
  
          if (latestMessage) {
            sellerChats.push({
              buyerId,
              chatRoomId,
              latestMessage,
            });
          }
        }
      }
      setChats(sellerChats); // Only chats related to the current seller
    });
  
    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className="flex h-full">
      {/* Sidebar - List of buyers */}
      <div className="w-1/3 border-r p-4">
        <h2 className="text-xl font-semibold mb-4">Inbox</h2>
        <div className="space-y-4">
          {chats.length > 0 ? (
            chats.map((chat) => (
              <div
                key={chat.chatRoomId}
                onClick={() => setSelectedChat(chat.chatRoomId)}
                className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-100 transition-colors ${
                  selectedChat === chat.chatRoomId ? 'bg-gray-200' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-lg">Buyer {chat.buyerId}</h3>
                    <p className="text-gray-600 text-sm">{chat.latestMessage?.text || 'No messages yet'}</p>
                  </div>
                  <small className="text-gray-500">
                    {chat.latestMessage && new Date(chat.latestMessage.timestamp).toLocaleTimeString()}
                  </small>
                </div>
              </div>
            ))
          ) : (
            <p>No messages from buyers yet.</p>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-2/3 p-4">
        {selectedChat ? (
          <ChatComponent
            chatRoomId={selectedChat}
            currentUser={currentUser}
            buyerId={selectedChat.split('_')[0]}
            sellerId={selectedChat.split('_')[1]}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerInboxPage;
