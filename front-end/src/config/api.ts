import axios from "axios";


const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    withCredentials: true,
});


export const { get, post, patch, put, delete: destroy } = apiClient
export default apiClient;