import axios from "axios"

const BASE_URL = "https://be.mind-gpt.online"
const AUTH_SERVICE = "https://auth.mind-gpt.online"

export const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})
