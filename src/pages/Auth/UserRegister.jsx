import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../stores/userStore';
import { Eye, EyeOff, Upload } from 'lucide-react';

const UserRegister = () => {
    const navigate = useNavigate();
    const createUser = useUserStore((state) => state.createUser);
    
    const [formRegister, setFormRegister] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "BUYER",
        phoneNumber: "",
        address: ""
    });

    const [isValid, setIsValid] = useState(true);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const isValidEmail = (email) => {
        const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return (emailTest.test(email));
    }

    const isValidPassword = (password) => {
        const passwordTest = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/;
        return (passwordTest.test(password));
    }

    const isValidPhoneNumber = (phoneNumber) => {
        const phoneTest = /^0[0-9]{9}$/;
        return (phoneTest.test(phoneNumber));
    }

    const validateForm = () => {
        const newErrors = {};

        if (!formRegister.firstName.trim()) {
            newErrors.firstName = "กรุณากรอกชื่อ";
        }
    
        if (!formRegister.lastName.trim()) {
            newErrors.lastName = "กรุณากรอกนามสกุล";
        }
    
        if (!formRegister.email) {
            newErrors.email = "กรุณากรอกอีเมล";
        } else if (!isValidEmail(formRegister.email)) {
            newErrors.email = "กรุณากรอกอีเมลให้ถูกต้อง (example@email.com)";
        }
    
        if (!formRegister.phoneNumber) {
            newErrors.phoneNumber = "กรุณากรอกเบอร์โทรศัพท์";
        } else if (!isValidPhoneNumber(formRegister.phoneNumber)) {
            newErrors.phoneNumber = "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (0xxxxxxxxx)";
        }
    
        if (!formRegister.password) {
            newErrors.password = "กรุณากรอกรหัสผ่าน";
        } else if (!isValidPassword(formRegister.password)) {
            newErrors.password = "รหัสผ่านต้องมี 8-20 ตัว ประกอบด้วยตัวอักษรและตัวเลข";
        } else if (formRegister.password.length < 8) {
            newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 8 ตัว";
        }
    
        if (formRegister.password !== formRegister.confirmPassword) {
            newErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
        }
    
        if (!formRegister.address.trim()) {
            newErrors.address = "กรุณากรอกที่อยู่";
        }
    
        setErrors(newErrors);
        const isValid = Object.keys(newErrors).length === 0;
        setIsValid(isValid);
        return isValid;
    }

    const hdlOnChange = (e) => {
        setFormRegister({
            ...formRegister,
            [e.target.name]: e.target.value
        });
    }

    const hdlSubmit = async (e) => {
        try {
            if (!validateForm()) {
                return;
            }
            const body = formRegister;
            const data = await createUser(body);
            alert('UserRegister Success');
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-lg ">
                <h1 className="text-2xl font-semibold text-center mb-6">User Register</h1>
                <hr className='border-black mb-6'/>
                <form onSubmit={hdlSubmit} className="space-y-4">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formRegister.firstName}
                                onChange={hdlOnChange}
                                placeholder="Enter Name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {!isValid && errors.firstName && (
                                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formRegister.lastName}
                                onChange={hdlOnChange}
                                placeholder="Enter Last Name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {!isValid && errors.lastName && (
                                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                            )}
                        </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formRegister.email}
                                onChange={hdlOnChange}
                                placeholder="Enter email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {!isValid && errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formRegister.phoneNumber}
                                onChange={hdlOnChange}
                                placeholder="Enter your Number"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {!isValid && errors.phoneNumber && (
                                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                            )}
                        </div>
                    </div>

                    {/* Password Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formRegister.password}
                                    onChange={hdlOnChange}
                                    placeholder="Enter password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-2.5 text-gray-400"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {!isValid && errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formRegister.confirmPassword}
                                    onChange={hdlOnChange}
                                    placeholder="Confirm Password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-2 top-2.5 text-gray-400"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {!isValid && errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>
                    </div>

                    {/* Address Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea
                            name="address"
                            value={formRegister.address}
                            onChange={hdlOnChange}
                            placeholder="Enter your address"
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        {!isValid && errors.address && (
                            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                        )}
                    </div>

                    {/* Terms and Register Button */}
                    
                        <p className="text-sm text-center text-gray-500">
                            By clicking Create account, you agree to the system's{' '}
                            <a href="#" className="text-orange-400 hover:underline">Terms and policies</a>
                        </p>
                        
                        <button
                            type="button"
                            onClick={hdlSubmit}
                            className="w-full bg-gray-400 text-white py-2 rounded-md hover:bg-gray-200 transition-colors"
                        >
                            Register
                        </button>

                        <div className="text-center">
                            <p className="text-sm text-gray-500">or</p>
                        </div>

                        <button
                            type="button"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                        >
                            <img src="/api/placeholder/20/20" alt="Google icon" className="w-5 h-5" />
                            Continue with Google
                        </button>

                        <div className="text-center text-sm">
                            <span className="text-gray-500">Do have an account? </span>
                            <button 
                                onClick={() => navigate('/login')} 
                                className="text-orange-400 hover:underline"
                            >
                                Login
                            </button>
                        </div>
                    
                </form>
            </div>
        </div>
    );
}

export default UserRegister;