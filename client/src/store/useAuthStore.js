import { create } from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"
import { io } from "socket.io-client"

const BASE_URL = import.meta.env.DEV ? 'http://localhost:5001' : window.location.origin

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isLoggingIn: false,
    isSigningup: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check")
            set({ authUser: res.data })

            get().connectSocket()
        } catch (error) {
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningup: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({ authUser: res.data })
            toast.success("Account Created Successfully");

            get().connectSocket()
        } catch (error) {
            let msg = error.response?.data?.message || error.message || "Signup failed"

            toast.error(msg)
        } finally {
            set({ isSigningup: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout")
            set({ authUser: null })
            toast.success("User Logout Successfully")

            get().disConnectSocket()
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Something went wrong")
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", data)
            set({ authUser: res.data })
            toast.success("Logged in Successfully")

            get().connectSocket()
        } catch (error) {
            set({ authUser: null })
            toast.error(error.response?.data?.message || error.message || "Something went wrong")
        } finally {
            set({ isLoggingIn: false })
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data })
            toast.success("Profile Picture Updated Successfully");
        } catch (error) {
            toast.error(error.message || error.response?.data?.message || "Something went wrong");
        } finally {
            set({ isUpdatingProfile: false })
        }
    },

    onlineUsers: [],

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            auth: {
                userId: authUser._id
            }
        })
        socket.connect();

        set({ socket: socket })

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds })
        })
    },

    disConnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },
}))