
import {create} from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";

import { loginAPI, RegisterAPI, getMeAPI, getAllUserAPI } from '../API/userAPI';




const useUserStore = create(persist((set, get) => ({
    user: null,
    token: "",
    // maintenanceMembers: [],
    // locationData: [],
    // departmentData: [],
    // allUser : [],
    // currentUser : null,
    // searchText : '',
  
    
  
    hdlLogin: async (body) => {
      try{
        const result = await loginAPI(body)
        // set({ token: result.data.token, user: result.data.user })
        console.log(result.data)
        localStorage.setItem('token', result.data.token);
      }catch(err){
        console.log(err)
      }
    },
  
    hdlLogout: () => {
      set({ 
        user: null, 
        token: "",
        maintenanceMembers: [],
        locationData: [],
        departmentData: [],
        allUser : [],
        currentUser : null 
      })
        localStorage.removeItem("accessToken");
        localStorage.removeItem("token");
       
    },
  
    

  
    createUser : async (body) => {
      try{
        const result = await RegisterAPI(body)
       
        return result.data
      }catch(error){
        console.log(error)
        
      }
    },
  
    
  
    
  
 
    //   }
    // },

    getMe : async () => {
      try{
        const result = await getMeAPI()
        set({user : result.data})
        return result
      }catch(error){
        console.log(error)
      }
    },

    getAllUser : async () => {
      try{
        console.log("testttttt")
        const result = await getAllUserAPI()
        // set({user : result.data})
        return result.data
      }catch(error){
        console.log(error)
      }
    },
  
    // hdlLogout: () => {
    //   set({ 
    //     user: null, 
    //     token: "",
    //     maintenanceMembers: [],
    //     locationData: [],
    //     departmentData: [],
    //     allUser : [],
    //     currentUser : null 
    //   })
    //     localStorage.removeItem("accessToken");
    //     localStorage.removeItem("token");
        
        
    // },

    // createUser : async (token, body) => {
    //   try{
    //     const result = await createUserAPI(token, body)
       
    //     return result
    //   }catch(error){
    //     console.log(error)
        
    //   }
    // },
  
    // getAllUser : async (token) => {
    //   try{
    //     const result = await getUserAPI(token)
    //     set({allUser : result.data.data})
    //     return result
    //   }catch(error){
    //     console.log(error)
    //   }
    // },
  
    // deleteUser : async (token, userId) => {
    //   try{
    //     const result = await deleteUserAPI(token , userId)
       
    //     return result
    //   }catch(error){
    //     console.log(error)
       
    //   }
    // },
  
    // resetCurrentUser : () => {
    //   set({currentUser : null})
    // },
  
    // updateUser : async (token, body, userId) => {
    //   try{
    //     console.log(body)
    //     const result = await updateUserAPI(token, body, userId)
    //     return result
    //   }catch(error){
    //     console.log(error)
    //   }
    // },


  
//     changePassword : async (token, body, userId) => {
//       try{
//         const result = await changePasswordAPI(token, body, userId)
//         return result.data
//       }catch(error){
//         console.log(error)
//         toast.error(error.response.data.message)
//     }
//   },
  
//     getForgetPassword : async (body) => {
//       try{
//         const result = await forgetPasswordAPI(body)
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
  
    
  }),{
    name: "userStore",
    storage: createJSONStorage(() => localStorage),
  }));
  
  
  
  
  
  export default useUserStore