import React from 'react'
import { useNavigate } from 'react-router-dom'

const SelectRegister = () => {
  const navigate = useNavigate()
  return (
    <div className='login-image w-screen h-screen flex items-center justify-center'>
      <div className=" flex items-center justify-center gap-4">
        {/* User Option */}
        <div className='w-full h-[150px] '>
          <button
            onClick={() => navigate('/UserRegister')}
            className="w-full p-6 h-full bg-white rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-medium text-gray-900">Register as User</h2>
                <p className="text-gray-500">Create an account to explore and shop</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        {/* Store Option */}
        <div className='w-full h-[150px] '>
          <button
            onClick={() => navigate('/MerchantRegister', { state: { type: 'store' } })}
            className="w-full p-6 h-full bg-white rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-medium text-gray-900">Register as Store</h2>
                <p className="text-gray-500">Start selling your products online</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SelectRegister