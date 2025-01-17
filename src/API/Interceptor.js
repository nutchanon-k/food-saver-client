import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: import.meta.env.REACT_APP_BASE_URL || 'https://food-saver-server.onrender.com' 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    //เอาไว้ test token
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMwNzcxMzY0LCJleHAiOjE3MzMzNjMzNjR9.5Q8VuLpeI-ZEYl04iJk0m5Mz9tzxjrHzOE_3ef480Js" 
    // const tokoen = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzMwNzg5MTMxLCJleHAiOjE3MzMzODExMzF9.wcrJko9LXrgxmvY39C7uf4mE66cB8Xv-4XV0OIHNwKQ" 
    // console.log("token from interceptor", token)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; 
    }

    return config;
  },
  (error) => {
    return Promise.reject(error); 
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
    return response; 
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized! Please log in again.');
    }
    return Promise.reject(error); 
  }
);

export default axiosInstance;
