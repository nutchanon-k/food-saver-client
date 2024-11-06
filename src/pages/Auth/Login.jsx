import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import useUserStore from '../../stores/userStore'


const Login = () => {

    
    const hdlLogin = useUserStore((state)=>state.hdlLogin)
   const navigate = useNavigate()
   const [formLogin,setFormLogin] = useState({
    email:'',
    password:''
   })

   const [isShowPassword,setIsShowPassword] = useState(false)



   const hdlOnChange = (e) => {
    setFormLogin({
        ...formLogin,
        [e.target.name] : e.target.value
    })
    console.log(formLogin)


   }
   

   const hdlSubmit =async (e) => {
    try{
        if (!formLogin.email.trim() || !formLogin.password.trim()){
            alert('please fill email or password ')
            return
        }
        

        const body = formLogin
        // console.log('sayhi',body)
        const data = await hdlLogin(body)
        console.log(data)
        if(data){
            console.log("testtttttttttttttttttttttttttttttttttttttttttt")
            navigate('/')
        }
        
        
        
    }catch(error){
        alert(error)

    }
   }

   //Tirawat11@gmail.com tirawat123456

  

    

    return (
        <div className='bg-red-50'>
            <div className="max-w-md mx-auto p-4">
                {/* Header */}
                <div className="flex items-center mb-6">
                    <button className="text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="text-xl font-medium ml-4">Log in</h1>
                </div>

                {/* Login Form */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-gray-800">Email</label>
                        <input
                            type="email"
                            name='email'
                            onChange={hdlOnChange}
                            placeholder="Enter Email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-gray-800">Password</label>
                        <div className="relative">
                            <input
                                type={isShowPassword? 'text' :'password'}
                                placeholder="Enter password"
                                name='password'
                                onChange={hdlOnChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2"
                            onClick={()=>setIsShowPassword(!isShowPassword)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            </button>
                        </div>
                        <button onClick={()=>navigate('/forgetPassword')} className="text-orange-500 text-sm">Forgot password?</button>
                    </div>

                    <button 
                    className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg mt-4"
                    onClick={(e)=>hdlSubmit(e)}
                    >
                    
                        Log in
                    </button>

                    <div className="text-center text-gray-500 my-4">or</div>

                    <button className="w-full bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center space-x-2">
                        <img src="/api/placeholder/20/20" alt="Google Logo" className="w-5 h-5" />
                        <span>Continue with Google</span>
                    </button>

                    <div className="text-center text-sm mt-6">
                        <span className="text-gray-600">Do not have an account? </span>
                        <button onClick={()=>navigate('/selectRegister')} className="text-orange-500">Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login