// import React from 'react';

// const KPICard = ({ title, value }) => {
//   return (
//     <div className="bg-white shadow-md rounded-lg p-6">
//       <h3 className="text-lg font-semibold mb-2">{title}</h3>
//       <p className="text-2xl font-bold">{value}</p>
//     </div>
//   );
// };

// export default KPICard;

const KPICard = ({ title, value }) => {
  return (
      <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">{title}</h3>
          <p className="text-xl md:text-2xl font-bold">{value}</p>
      </div>
  );
};

export default KPICard;
