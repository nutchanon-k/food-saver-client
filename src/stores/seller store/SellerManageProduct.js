import { create } from "zustand";
import { getManageProductAPI ,DeleteProductAPI } from "../../API/sellerAPI/ManageProductAPI";

const useSellerManageProduct = create((set, get) => ({
  getStoreProduct: async (id) => {
    try {
      const result = await getManageProductAPI(id);
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  },
  
deleteProduct : async (id) => {
  try{
    console.log(id)
    const result = await DeleteProductAPI(id)
    return result.data
  }catch(error){
    console.log(error)
  }
},

}));

export default useSellerManageProduct;
