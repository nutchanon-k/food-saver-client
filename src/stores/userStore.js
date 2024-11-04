
import {create} from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";


const useUserStore = create(persist((set, get) => ({
    user: null,
    token: "",
    maintenanceMembers: [],
    locationData: [],
    departmentData: [],
    allUser : [],
    currentUser : null,
    searchText : '',
  
    setSearchText : (text) => {
      set({searchText : text})
    },
  
    hdlLogin: async (body) => {
      try{
        const result = await loginAPI(body)
        set({ token: result.data.token, user: result.data.user })
        localStorage.setItem('token', result.data.token);
       
        return result.data
      }catch(error){
        console.log(error)
       
        
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
  
    getMaintenanceMembers: async (token) => {
      try{
        const result = await getMaintenanceMembersAPI(token)
        set({ maintenanceMembers: result.data.data })
        // console.log("xxxxxxxx", result.data.data)
        return result.data.data
      }catch(error){
        console.log(error)
        
      }
    },
    getLocationAndDepartmentData: async (token) => {
      try{
        const result = await getLocationAndDepartmentAPI(token)
        set({ locationData: result.data.locations})
        set({ departmentData: result.data.departments})
        // console.log(result.data)
        return result.data
      }catch(error){
        console.log(error)
      }
    },
  
    createUser : async (token, body) => {
      try{
        const result = await createUserAPI(token, body)
       
        return result
      }catch(error){
        console.log(error)
        
      }
    },
  
    getAllUser : async (token) => {
      try{
        const result = await getUserAPI(token)
        set({allUser : result.data.data})
        return result
      }catch(error){
        console.log(error)
      }
    },
  
    getCurrentUser : async (token, userId) => {
      try{
        const result = await getUserByIdAPI(token , userId)
        set({currentUser : result.data.data})
        return result.data.data
      }catch(error){
        console.log(error)
      }
    },
  
    deleteUser : async (token, userId) => {
      try{
        const result = await deleteUserAPI(token , userId)
       
        return result
      }catch(error){
        console.log(error)
       
      }
    },
  
    resetCurrentUser : () => {
      set({currentUser : null})
    },
  
    // updateUser : async (token, body, userId) => {
    //   try{
    //     console.log(body)
    //     const result = await updateUserAPI(token, body, userId)
    //     return result
    //   }catch(error){
    //     console.log(error)
    //   }
    // },

    // getMe : async (token) => {
    //   try{
    //     const result = await getMeAPI(token)
    //     set({user : result.data})
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