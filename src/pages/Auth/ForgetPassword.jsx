import { AlertCircle, Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useUserStore from '../../stores/userStore';
import Swal from 'sweetalert2';

const ForgetPassword = () => {
  const navigate = useNavigate()
  const {token} = useParams()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  })
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: ''
  });
  const resetPassword = useUserStore((state) => state.resetPassword)

  const isValidPassword = (password) => {
    const passwordTest = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/
    return (passwordTest.test(password)

    )
  }

  const validateForm = () => {
    const newErrors = {};


    if (!formData.password.trim() || !formData.confirmPassword.trim()) {
      alert('please fill email or password ')
      return false

    } if (!isValidPassword(formData.password)) {
      newErrors.password = "รหัสผ่านต้องมี 8-20 ตัว ประกอบด้วยตัวอักษรและตัวเลข"

    }


    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';

    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    console.log(formData)

  }
  const hdlSubmit = () => {
    
    if (!validateForm()) {
      return
    }
    try{
      
      const data = resetPassword(token,formData)
      if(data) {
        console.log("daataaaaaa",data)
        Swal.fire({
          icon: 'success',
          title: 'สําเร็จ',
          text: 'รีเซ็ตรหัสผ่านเรียบร้อย',
        })
        navigate('/login')
      }
      
    }catch(err){
      console.log(err)
    }
  }


  return (
    <div>
      (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            รีเซ็ตรหัสผ่าน
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                รหัสผ่านใหม่
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="กรอกรหัสผ่านใหม่"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.password}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ยืนยันรหัสผ่านใหม่
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <button
              type="submit"
              onClick={() => hdlSubmit()}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              ยืนยันการเปลี่ยนรหัสผ่าน
            </button>
          </div>
        </div>
      </div>
      );
    </div>
  )
}

export default ForgetPassword

