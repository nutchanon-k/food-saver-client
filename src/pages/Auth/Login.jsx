import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import useUserStore from '../../stores/userStore'

const Login = () => {
    const hdlLogin = useUserStore((state) => state.hdlLogin);
    const navigate = useNavigate();
    const [formLogin, setFormLogin] = useState({
        email: "",
        password: "",
    });

    const [isShowPassword, setIsShowPassword] = useState(false);

    const hdlOnChange = (e) => {
        setFormLogin({
            ...formLogin,
            [e.target.name]: e.target.value,
        });
    };

    const hdlSubmit = async (e) => {
        try {
            e.preventDefault()

            if (!formLogin.email.trim() || !formLogin.password.trim()) {
                alert('Please fill in both email and password.')
                return
            }

            const body = formLogin
            const data = await hdlLogin(body)
            console.log(data)
            if (data) {
                navigate('/');
                window.location.reload();
                // if (data.user.role === 'ADMIN') {
                //     navigate('/admin');
                // } else if (data.user.role === 'BUYER') {
                //     navigate('/buyer');
                // } else if (data.user.role === 'SELLER') {
                //     navigate('/seller');
                // } else {
                //     navigate('/');
                // }
            }
        } catch (error) {
            alert(error)
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 ">
            <div className="bg-white border-[1px] border-[#666666] rounded-xl  p-8 w-full max-w-md">
                <h1 className="text-2xl font-medium  text-center mb-8">Log in</h1>

                <form className="space-y-6" onSubmit={hdlSubmit}>
                    <div className="space-y-2">
                        <label className="block text-gray-800 text-sm">Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={hdlOnChange}
                            placeholder="Enter your Email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-gray-800 text-sm">Password</label>
                        <div className="relative">
                            <input
                                type={isShowPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter password"
                                onChange={hdlOnChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                onClick={() => setIsShowPassword(!isShowPassword)}
                            >
                                {isShowPassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={() => navigate("/forgetPassword")}
                            className="text-orange-500 text-sm hover:text-orange-600"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-300 text-gray-800 py-3 px-4 rounded-3xl hover:bg-gray-200 transition-colors"
                    >
                        Log in
                    </button>

                    <div className="flex gap-2 justify-center items-center">
                        <div className="h-[0.5px] opacity-30 w-full bg-gray-500"></div>
                        <div className="text-center text-gray-500">or</div>
                        <div className="h-[0.5px] opacity-30 w-full bg-gray-500"></div>
                    </div>

                    <button
                        type="button"
                        className="w-full bg-blue-500 text-white py-3 px-4 rounded-3xl hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                        onClick={() => {
                            // เพิ่มฟังก์ชันสำหรับการล็อกอินด้วย Google หากมี
                        }}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z"
                            />
                        </svg>
                        <span>Continue with Google</span>
                    </button>

                    <div className="text-center text-sm">
                        <span className="text-gray-600">Do not have an account? </span>
                        <button
                            type="button"
                            onClick={() => navigate("/selectRegister")}
                            className="text-orange-500 hover:text-orange-600"
                        >
                            Register
                        </button>
                    </div>

                    <div className="text-center text-sm">
                        <span className="text-gray-600">Or? </span>
                        <button
                            type="button"
                            onClick={() => navigate("/MerchantRegister")}
                            className="text-orange-500 hover:text-orange-600"
                        >
                            Merchant Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
