import axios from "axios"

const BASE_URL = "http://be.mind-gpt.online:8080"

export const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})
