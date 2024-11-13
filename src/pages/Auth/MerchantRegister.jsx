import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../stores/userStore';
import { Eye, EyeOff, Upload } from 'lucide-react';

const MerchantRegister = () => {
    const navigate = useNavigate();
    const createUser = useUserStore((state) => state.createUser);
    const setToken = useUserStore((state)=>state.setToken)

    const [formRegister, setFormRegister] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "SELLER",
        phoneNumber: "",
        address: "",
    });

    const [isValid, setIsValid] = useState(true);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const isValidEmail = (email) => {
        const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailTest.test(email);
    };

    const isValidPassword = (password) => {
        const passwordTest = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/;
        return passwordTest.test(password);
    };

    const isValidPhoneNumber = (phoneNumber) => {
        const phoneTest = /^0[0-9]{9}$/;
        return phoneTest.test(phoneNumber);
    };

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
        } else if (!isValidPassword(formRegister.password)){
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
    };

    const hdlOnChange = (e) => {
        setFormRegister({
            ...formRegister,
            [e.target.name]: e.target.value
        });
    };

    const hdlSubmit = async (e) => {
        e.preventDefault();
        try {
            if(!validateForm()){
                return;
            }
            const body = formRegister;
            const data = await createUser(body);
            alert('Merchant register success');
            navigate('/login')
           
        } catch (error) {
            alert(error);
        }
    };



    return ( 
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 login-image">
            <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-black text-center mb-6">Merchant Register</h1>
                <hr className='border-black mb-6' />

                <form onSubmit={hdlSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-700 font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formRegister.firstName}
                                onChange={hdlOnChange}
                                placeholder="Enter Name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 font-medium mb-1">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formRegister.lastName}
                                onChange={hdlOnChange}
                                placeholder="Enter Last Name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-700 font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formRegister.email}
                                onChange={hdlOnChange}
                                placeholder="Enter email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 font-medium mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formRegister.phoneNumber}
                                onChange={hdlOnChange}
                                placeholder="Enter your Number"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 font-medium mb-1">Address</label>
                        <textarea
                            name="address"
                            value={formRegister.address}
                            onChange={hdlOnChange}
                            placeholder="Enter Address"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-700 font-medium mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formRegister.password}
                                    onChange={hdlOnChange}
                                    placeholder="Enter password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </span>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 font-medium mb-1">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formRegister.confirmPassword}
                                    onChange={hdlOnChange}
                                    placeholder="Confirm Password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <span
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </span>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 text-center mt-4">
                        By clicking Create account, you agree to the system's{" "}
                        <a href="#" className="text-blue-400 hover:underline">Terms and policies</a>
                    </p>

                    <button
                        type="submit"
                        className="w-full btn btn-primary text-white rounded-xl"
                        // disabled={!isValid}
                    >
                        Register
                    </button>

                    <p className="text-center text-sm my-4">or</p>


                    <div className="text-center text-sm">
                        <span className="text-gray-500">Do have an account? </span>
                        <button 
                            // onClick={() => navigate('/login')} 
                            className="text-blue-400 hover:underline"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MerchantRegister;
