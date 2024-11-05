
import {create} from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";
import { loginAPI, RegisterAPI, getMeAPI, getAllUserAPI, activateUserAPI } from "../API/UserApi";
import { all } from 'axios';






const useSearchStore = create(persist((set, get) => ({
    
    searchText  : '',


    setSearchText : (text) => {
        set({searchText : text})
    }
    
  
    
  }),{
    name: "searchStore",
    storage: createJSONStorage(() => localStorage),
  }));
  
  
  
  
  
  export default useSearchStore