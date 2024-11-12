
import {create} from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";
import { getCartDataAPI } from '../API/cartItemAPI';
import { loginAPI, RegisterAPI, getMeAPI, getAllUserAPI, activateUserAPI, patchSellerAPI, loginGoogle, createStoreAPI, forgetPasswordAPI, resetPasswordAPI } from "../API/UserApi";
import axios, { all } from 'axios';
import Swal from 'sweetalert2';








const useUserStore = create(persist((set, get) => ({
    user: null,
    token: "",
    allUser: [],
    isAuthenticated: false,
    
    setToken : (token) => {
      set({token:token})
    },
    // maintenanceMembers: [],
    // locationData: [],
    // departmentData: [],
    // allUser : [],
    // currentUser : null,
    // searchText : '',
  
    
  
    hdlLogin: async (body) => {
      try{
        const result = await loginAPI(body)
        if(result){
          set({ user: result.data.user ,token: result.data.token, isAuthenticated: true})
          localStorage.setItem('token', result.data.token);
        }
        return result.data
      }catch(err){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message,
        })
        console.log(err)
        
      }
    },
    actionLoginGoogle: async (codeResponse) => {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${codeResponse.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${codeResponse.access_token}`,
          },
        }
      );
      // console.log(res.data);
      const result = await loginGoogle(res.data);
      console.log(result, "Check result");
      localStorage.setItem('token', result.data.token);
      set({ user: result.data.user ,token: result.data.token, isAuthenticated: true})
      return res.data;
    },
    resetPassword : async (token, body) => {
      try{
        const result = await resetPasswordAPI(token, body)
        console.log(result.data)
        // localStorage.setItem('token', result.data.token);
      }catch(err){
        console.log(err)
      }
    },
  
    hdlLogout: () => {
      set({ 
        user: null, 
        token: "",
        isAuthenticated: false,
        allUser : [],
        
      })
        
        localStorage.removeItem("userStore");
        localStorage.removeItem("token");
        // window.location.assign('/')
       
    },


  
    createUser : async (body) => {
      try{
        const result = await RegisterAPI(body)
       
        return result.data
      }catch(error){
        console.log(error)
        
      }
    },

    
  
    
  
    
  
 

    getMe : async () => {
      try{
        const result = await getMeAPI()
        set({user : result.data, isAuthenticated: true})
        return result
      }catch(error){
        console.log(error)
        set({ user: null, isAuthenticated: false })
      }
    },

    getAllUser : async () => {
      try{
        console.log("testttttt")
        const result = await getAllUserAPI()
        set({allUser : result.data.data})
        return result.data
      }catch(error){
        console.log(error)
      }
    },

    activateUser : async (id) => {
      try{
        const result = await activateUserAPI(id)
        return result.data
      }catch(error){
        console.log(error)
      }
    },
  

      


  
//     changePassword : async (token, body, userId) => {
//       try{
//         const result = await changePasswordAPI(token, body, userId)
//         return result.data
//       }catch(error){
//         console.log(error)
//         toast.error(error.response.data.message)
//     }
//   },
  
    getForgetPassword : async (body) => {
      try{
        const result = await forgetPasswordAPI(body)
        return result
      }catch(error){
        console.log(error)
      }
    },
  
//     getResetPassword : async (token,body) => {
//       try{
//         const result = await resetPasswordAPI(token,body)
//         return result
//       }catch(error){
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: `${error.response.data.message}`,
//         });
//         console.log(error)
//       }
//     },
  
                              // seller store
//______________________________________________________________________________________//

  patchSellerProfile : async (body,storeId) => {
    try {
      const data = await patchSellerAPI(body,storeId)
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  },
  createSellerStore : async (body) => {

    try{
      console.log(body)
      const resp = await createStoreAPI(body)
    
      set({
        user: resp.data,
        isAuthenticated: true
      });

    console.log('Store creation response:', resp.data);
      return resp.data


    }catch(err){
      console.log(err)
      throw err
    }
  }

    
  }),{
    name: "userStore",
    storage: createJSONStorage(() => localStorage),
  }));
  
  
  
  
  
  export default useUserStore