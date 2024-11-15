import React from 'react'

const Inbox = () => {
  return (
    <div>
 <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="bg-gray-800 p-4 flex items-center justify-between">
                        <h1 className="text-white text-lg font-bold">Inbox</h1>
                        <div className="flex items-center">
                            <i className="fas fa-search text-white mr-4"></i>
                            <i className="fas fa-plus-circle text-white"></i>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="mb-4">
                            <h2 className="text-gray-600 text-sm font-bold mb-2">PINNED CHATS</h2>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <img src="https://placehold.co/40x40" alt="Profile picture of Liam Anderson" className="w-10 h-10 rounded-full mr-4"/>
                                    <div>
                                        <h3 className="text-gray-800 font-bold">Liam Anderson</h3>
                                        <p className="text-[#5abd4f] text-sm">Typing...</p>
                                    </div>
                                </div>
                                <span className="text-gray-500 text-sm">04:50 PM</span>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <img src="https://placehold.co/40x40" alt="Profile picture of Lucas Williams" className="w-10 h-10 rounded-full mr-4"/>
                                    <div>
                                        <h3 className="text-gray-800 font-bold">Lucas Williams</h3>
                                        <p className="text-gray-500 text-sm">Hey, how's it going?</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-gray-500 text-sm mr-2">10:30 AM</span>
                                    <span className="bg-[#5abd4f] text-white text-xs rounded-full px-2">2</span>
                                </div>
                            </div>
                            <div className=' bg-green-100 py-2 px-2 rounded-lg'>
                            <div className="flex justify-between  ">
                                <div className="flex items-center">
                                    <img src="https://placehold.co/40x40" alt="Profile picture of Grace Miller" className="w-10 h-10 rounded-full mr-4"/>
                                    <div>
                                        <h3 className="text-gray-800 font-bold">Grace Miller</h3>
                                        <p className="text-gray-500 text-sm">↩ Can't wait for the weekend!</p>
                                    </div>
                                </div>
                                <span className="text-gray-500 text-sm">10:25 AM</span>
                            </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-gray-600 text-sm font-bold mb-2">ALL MESSAGES</h2>
                            {[
                                { name: "Sophia Chen", time: "07:23 PM", message: "Remember that concert last y...", img: "https://placehold.co/40x40" },
                                { name: "Benjamin Knight", time: "08:45 PM", message: "Just got back from a hiking trip!", img: "https://placehold.co/40x40", badge: 1 },
                                { name: "Olivia Foster", time: "Yesterday", message: "↩ Excited for the upcoming vac...", img: "https://placehold.co/40x40" },
                                { name: "Jackson Adams", time: "Yesterday", message: "Looking forward to the weekend...", img: "https://placehold.co/40x40" },
                                { name: "Ethan Sullivan", time: "Yesterday", message: "Finished reading a captivating no...", img: "https://placehold.co/40x40" },
                                { name: "Sophia Chen", time: "07:23 PM", message: "Remember that concert last y...", img: "https://placehold.co/40x40" },
                                { name: "Sophia Chen", time: "07:23 PM", message: "Remember that concert last y...", img: "https://placehold.co/40x40" },
                                { name: "Olivia Foster", time: "Yesterday", message: "↩ Excited for the upcoming vac...", img: "https://placehold.co/40x40" },
                                { name: "Jackson Adams", time: "Yesterday", message: "Looking forward to the weekend...", img: "https://placehold.co/40x40" },
                                { name: "Ethan Sullivan", time: "Yesterday", message: "Finished reading a captivating no...", img: "https://placehold.co/40x40" }
                            ].map((chat, index) => (
                                <div key={index} className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <img src={chat.img} alt={`Profile picture of ${chat.name}`} className="w-10 h-10 rounded-full mr-4"/>
                                        <div>
                                            <h3 className="text-gray-800 font-bold">{chat.name}</h3>
                                            <p className="text-gray-500 text-sm">{chat.message}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-gray-500 text-sm mr-2">{chat.time}</span>
                                        {chat.badge && <span className="bg-[#5abd4f] text-white text-xs rounded-full px-2">{chat.badge}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
         
    </div>
  )
}

export default Inbox