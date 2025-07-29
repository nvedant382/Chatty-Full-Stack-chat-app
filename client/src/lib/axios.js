import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.BASE_URL ? "http://localhost:5001/api" : window.location.origin + "/api",
    withCredentials: true,
})

axiosInstance.interceptors.response.use((response) => response, (error) => {

    if (error.response?.status === 401) {
        useAuthStore.logout();
        toast.error("Session expired. Please Login again");
        window.location.href = "/login"
    }

    return Promise.reject(error)
})