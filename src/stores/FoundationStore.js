
import { create } from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";
import { getFoundationByQueryAPI } from '../API/foundationAPI';




const useFoundationStore = create(persist((set, get) => ({


    getFoundationQuery: async (page, searchText) => {
        try {
            const result = await getFoundationByQueryAPI(page, searchText)
            return result.data
        } catch (error) {
            console.log(error)

        }
    },



    // createFoundation: async (body) => {
    //     try {
    //         const result = await RegisterAPI(body)

    //         return result.data
    //     } catch (error) {
    //         console.log(error)

    //     }
    // },






}), {
    name: "foundationStore",
    storage: createJSONStorage(() => localStorage),
}));



export default useFoundationStore