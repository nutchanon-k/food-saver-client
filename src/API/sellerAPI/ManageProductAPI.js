import axiosInstance from "../Interceptor";

export const getManageProductAPI = async (id) => {
  return axiosInstance.get(`/products?storeId=${id}`);
};


export const DeleteProductAPI = async (id) => {
  console.log(id)
  return axiosInstance.delete(`/products/${id}`);
};

export const getCategoriesAPI = async () => {
  return axiosInstance.get(`/categories`);
};

export const getAllergenAPI = async () => {
  return axiosInstance.get(`/allergens`);
}

export const uploadProductAPI = async(body) => {
  return axiosInstance.post(`/products/`,body)
}