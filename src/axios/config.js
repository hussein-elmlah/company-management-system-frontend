import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
    // const token = localStorage.getItem('token');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsaV90YWhhIiwiaWQiOiI2NjcyMjUxMTZiYmI5MmVhZDY2MmQ0MDEiLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNzE4NzU2NjMwLCJleHAiOjE3MTkzNjE0MzB9.eDnxxcJN5oS-JWy9iHH181azPFDOXgbsU0h96YL8814';
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
