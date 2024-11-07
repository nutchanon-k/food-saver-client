
import { create } from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";
import { createFoundationAPI, deleteFoundationAPI, getFoundationByQueryAPI, updateFoundationAPI } from '../API/foundationAPI';




const useFoundationStore = create(persist((set, get) => ({


    getFoundationQuery: async (page, searchText) => {
        try {
            const result = await getFoundationByQueryAPI(page, searchText)
            return result.data
        } catch (error) {
            console.log(error)

        }
    },



    createFoundation: async (body) => {
        try {
            const result = await createFoundationAPI(body)
            return result.data
        } catch (error) {
            console.log(error)
        }
    },
    deleteFoundation: async (id) => {
        try {
            const result = await deleteFoundationAPI(id)
            return result.data
        } catch (error) {
            console.log(error)
        }
    },

    updateFoundation: async (id, body) => {
        try {
            const result = await updateFoundationAPI(id, body)
            return result.data
        } catch (error) {
            console.log(error)
        }
    },






}), {
    name: "foundationStore",
    storage: createJSONStorage(() => localStorage),
}));



export default useFoundationStore