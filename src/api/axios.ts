import axios from "axios";
import store from "../app/store";
import type { ApiResponse, AuthResponse } from "../type/auth";
import { logout, updateAccessToken } from "../auth/authSlice";

const API = axios.create({
    baseURL: "http://localhost:8081/api"
})

API.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if(!error.response){
            alert("Le serveur est indisponible. Veuillez réessayer plus tard.")
        }
        const isAuthRoute =
            originalRequest.url?.includes('/v1/auth/login') ||
            originalRequest.url?.includes('/v1/auth/register') ||
            originalRequest.url?.includes('/v1/auth/refresh')
        if(
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !isAuthRoute
        ){
            originalRequest._retry = true
            try {
                const refreshToken = store.getState().auth.refreshToken
                const response = await axios.post<ApiResponse<AuthResponse>>("http://localhost:8081/api/v1/auth/refresh", {
                    refreshToken
                })
                const newAccessToken = response.data.data.accessToken
                store.dispatch(updateAccessToken(newAccessToken))
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return API(originalRequest)
            } catch (refreshError) {
                store.dispatch(logout())
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
)

export default API