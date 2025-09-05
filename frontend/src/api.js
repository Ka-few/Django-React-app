import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const apiUrl = "https://20884de5-c0f0-4731-992e-0b339b2d4aa9-dev.e1-us-east-azure.choreoapis.dev/notes-app/backend/v1"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL 
    ? import.meta.env.VITE_API_URL : apiUrl,
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (Error) => {
        return Promise.reject(Error)
    }
    )

export default api