import { AlertCircle, Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../stores/userStore';
import Swal from 'sweetalert2';

const SendEmailForgetPassword = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
  })

  const getForgetPassword = useUserStore((state) => state.getForgetPassword)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    console.log(formData)

  }
  const hdlSubmit = () => {
    try {
      const data = getForgetPassword(formData)
      Swal.fire({
        icon: "success",
        title: "สําเร็จ",
        text: "กรุณาตรวจสอบ Email ของคุณ",
      })
      navigate('/')
    } catch (err) {

    }
  }


  return (
    <div className='login-image'>
      (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <form
          onSubmit={hdlSubmit}
          className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            ระบุ Email เพื่อทำการ Reset รหัสผ่าน.
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="กรอก Email ของคุณ"
                />
              </div>
            </div>


            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              ยืนยัน
            </button>
          </div>
        </form>
      </div>
      );
    </div>
  )
}


export default SendEmailForgetPassword