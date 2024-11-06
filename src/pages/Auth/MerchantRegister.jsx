import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import useUserStore from '../../stores/userStore'



const MerchantRegister = () => {
    const navigate = useNavigate()
    const createUser = useUserStore((state)=>state.createUser)


    const [formRegister, setFormRegister] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "SELLER",
        phoneNumber: "",
        address: ""
    })

    const [isValid, setIsValid] = useState(true)
    const [errors, setErrors] = useState({})

    const isValidEmail = (email) => {
        const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return (emailTest.test(email) 
        
    )
    }

    const isValidPassword = (password) => {
        const passwordTest =  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/
        return (passwordTest.test(password) 

    )
    }

    const isValidPhoneNumber = (phoneNumber) => {
        const phoneTest = /^0[0-9]{9}$/
        return (phoneTest.test(phoneNumber))
    }

    const validateForm = () => {
      
        const newErrors = {}

        if (!formRegister.firstName.trim()) {
            newErrors.firstName = "กรุณากรอกชื่อ"
        }
    
        if (!formRegister.lastName.trim()) {
            newErrors.lastName = "กรุณากรอกนามสกุล"
        }
    
        if (!formRegister.email) {
            newErrors.email = "กรุณากรอกอีเมล"
        } else if (!isValidEmail(formRegister.email)) {
            newErrors.email = "กรุณากรอกอีเมลให้ถูกต้อง (example@email.com)"
        }
    
        if (!formRegister.phoneNumber) {
            newErrors.phoneNumber = "กรุณากรอกเบอร์โทรศัพท์"
        } else if (!isValidPhoneNumber(formRegister.phoneNumber)) {
            newErrors.phoneNumber = "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (0xxxxxxxxx)"
        }
    
        if (!formRegister.password) {
            newErrors.password = "กรุณากรอกรหัสผ่าน"
        }else if (!isValidPassword(formRegister.password)){
            newErrors.password = "รหัสผ่านต้องมี 8-20 ตัว ประกอบด้วยตัวอักษรและตัวเลข"

        } else if (formRegister.password.length < 8) {
            newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 8 ตัว"
        }
    
        if (formRegister.password !== formRegister.confirmPassword) {
            newErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน"
        }
    
        if (!formRegister.address.trim()) {
            newErrors.address = "กรุณากรอกที่อยู่"
        }
    
        setErrors(newErrors)
        const isValid = Object.keys(newErrors).length === 0 //เช็คว่าในobjectของnewError มีerrorหรือไม่ถ้าใlenght = 0 คือไม่มีerror 
        setIsValid(isValid)
        return isValid
    }

    const hdlOnChange = (e) => {
        setFormRegister({
            ...formRegister,
            [e.target.name]: e.target.value
        })
    }


    const hdlSubmit = async (e) => {
        // e.preventDefault()
        try {        
            
            if(!validateForm()){
                return
            }
            console.log(formRegister)
            const body = formRegister
            const data = await createUser(body)
            console.log(data)
            alert('merchantregister success' )


        } catch (error) {
            alert(error)

        }
    }


    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    return (
        <div className="max-w-md mx-auto p-6 bg-red-300 rounded-lg shadow-sm">
            <div className="mb-6">
                <img
                    src="/api/placeholder/400/250"
                    alt="Thai Food"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h1 className="text-2xl font-bold text-center">Merchant Register</h1>
            </div>

            <div className="space-y-4">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name='firstName'
                            value={formRegister.firstName}
                            onChange={hdlOnChange}
                            placeholder="Enter Name"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                         {!isValid && errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Last Name</label>
                        <input
                            type="text"
                            name='lastName'
                            value={formRegister.lastName}
                            onChange={hdlOnChange}

                            placeholder="Enter Last Name"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {!isValid && errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Phone number</label>
                        <input
                            type="tel"
                            name='phoneNumber'
                            value={formRegister.phoneNumber}
                            onChange={hdlOnChange}

                            placeholder="Enter your phone number"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                         {!isValid && errors.phoneNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>)}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            name='email'
                            value={formRegister.email}
                            onChange={hdlOnChange}
                            

                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                         {!isValid && errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>)}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Address</label>
                        <textarea
                            placeholder="Enter your address"
                            rows={3}
                            name='address'
                            value={formRegister.address}
                            onChange={hdlOnChange}

                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {!isValid && errors.address && (
                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>)}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            name='password'
                            value={formRegister.password}
                            onChange={hdlOnChange}

                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                          {!isValid && errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>)}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Enter password"
                            name='confirmPassword'
                            value={formRegister.confirmPassword}
                            onChange={hdlOnChange}

                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {!isValid && errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>)}
                    </div>
                </div>

                <div className="text-sm text-gray-600">
                    By clicking <span className="font-medium">Create account</span>, you agree to the system's{" "}
                    <a href="#" className="text-blue-600 hover:underline">Terms and policies</a>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={(e)=>hdlSubmit()}
                >
                    Register
                </button>

                <div className="text-center text-gray-500">or</div>

                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <img
                        src="/api/placeholder/24/24"
                        alt="Google logo"
                        className="w-6 h-6"
                    />
                    Continue with Google
                </button>

                <div className="text-center text-sm">
                    Do  have an account?{" "}
<<<<<<< HEAD
                    <h1 onClick={()=>navigate('/auth')}  className="text-blue-600 hover:underline" >login </h1>
=======
                    <h1 onClick={()=>navigate('/login')}  className="text-blue-600 hover:underline" >login </h1>
>>>>>>> dev
                </div>
            </div>
        </div>
    );
}

export default MerchantRegister