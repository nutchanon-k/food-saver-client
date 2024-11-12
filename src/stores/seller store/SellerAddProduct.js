import { create } from "zustand";
import { EditProductAPI, getAllergenAPI, getCategoriesAPI, uploadProductAPI } from "../../API/sellerAPI/ManageProductAPI";



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
  uploadProductData : async(body)=>{
    console.log(body)
    try{
      const resp = await uploadProductAPI(body)
      return resp
    }catch(err){
      console.log(err)
    }
  },
  EditProductData : async(id,body)=>{
    console.log(body)
    try{
      const resp = await EditProductAPI(id,body)
      return resp
    }catch(err){
      console.log(err)
    }
  }

  


}));

export default useSellerAddProduct;
