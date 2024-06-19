import axios from 'axios';
const token = localStorage.getItem('token');
export const axiosInstance =
    axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
            Authorization: token ? `Token ${token}` : '', 
            'Content-Type': 'application/json', 
        },
    });