import { create } from "zustand";
import { getAllergenAPI, getCategoriesAPI } from "../../API/sellerAPI/ManageProductAPI";



const useSellerAddProduct = create((set, get) => ({
  getCategories: async () => {
    try {
      const result = await getCategoriesAPI();
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  getAllergen: async () => {
    try {
      const result = await getAllergenAPI()
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  


}));

export default useSellerAddProduct;
