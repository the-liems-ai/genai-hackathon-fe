import axios from "axios"

const BASE_URL = "http://35.230.104.194:8080"

export const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})
