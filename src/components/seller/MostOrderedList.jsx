// src/components/dashboard/MostOrderedList.jsx

import React from 'react';

// const MostOrderedList = ({ mostOrdered }) => {
//   return (


//     <div className="bg-white p-6 rounded-lg shadow flex flex-col">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Most Ordered</h2>
//         <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Today</button>
//       </div>
//       <div className='flex flex-col justify-between flex-1'>
//         <div className="mb-4">
//           {mostOrdered.map((item, index) => (
//             <div key={index} className="flex items-center mb-2 ">
//               <img src={item.imageUrl} alt={item.dish} className="rounded-full w-12 h-12 mr-2" />
//               <div>
//                 <p>{item.dish}</p>
//                 <p className="text-gray-500 text-sm">{item.totalOrdered} dishes ordered</p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <button className="bg-green-500 text-white px-4 py-2 rounded-lg w-full">View All</button>
//       </div>
//     </div>

//   );


// };

const MostOrderedList = ({ mostOrdered }) => {
  return (
      <div className="bg-white p-4 md:p-6 rounded-lg shadow h-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
              <h2 className="text-xl font-bold">Most Ordered</h2>
              <button className="bg-green-500 text-white px-3 py-1.5 rounded-lg text-sm w-full md:w-auto">
                  Today
              </button>
          </div>
          <div className="flex flex-col justify-between h-[calc(100%-64px)]">
              <div className="space-y-3 mb-4">
                  {mostOrdered.map((item, index) => (
                      <div key={index} className="flex items-center">
                          <img 
                              src={item.imageUrl} 
                              alt={item.dish} 
                              className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-3"
                          />
                          <div>
                              <p className="text-sm md:text-base font-medium">{item.dish}</p>
                              <p className="text-gray-500 text-xs md:text-sm">
                                  {item.totalOrdered} dishes ordered
                              </p>
                          </div>
                      </div>
                  ))}
              </div>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg w-full text-sm">
                  View All
              </button>
          </div>
      </div>
  );
};

export default MostOrderedList;
