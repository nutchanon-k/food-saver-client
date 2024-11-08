import axiosInstance from "./Interceptor";


export const getProducts = async ({ id, storeId, name, salePrice }) => {
        return await axiosInstance.get(`/products?storeId=${storeId}&name=${name}&salePrice=${salePrice}&id=${id}`);
    };