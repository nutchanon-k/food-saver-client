import axios from "axios";
import axiosInstance from "./Interceptor";

export const getAllergensAPI = async () => {
  return await axiosInstance.get("/allergens");
};

export const getCategoriesAPI = async () => {
  return await axiosInstance.get("/categories");
};
