import { getAuth } from "@/stores/auth-store"
import axios from "axios"

const BASE_URL = "https://be.mind-gpt.online"
const AUTH_SERVICE = "https://auth.mind-gpt.online"

const getToken = () => {
    const data = JSON.parse(localStorage.getItem("access_token"))
    return data?.state?.token
}

const commonHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAuth().token || getToken()}`,
}

export const instance = axios.create({
    baseURL: BASE_URL,
    headers: commonHeaders,
})

export const authInstance = axios.create({
    baseURL: AUTH_SERVICE,
    headers: commonHeaders,
})
