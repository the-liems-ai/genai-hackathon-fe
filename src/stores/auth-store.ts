import { create } from "zustand"
import { persist } from "zustand/middleware"
import { ExtractState } from "./extract-state"

interface AuthStore {
    token: string
    setToken: (token: string) => void
    removeToken: () => void
}

export const useAuthStore = create<AuthStore, [["zustand/persist", AuthStore]]>(
    persist(
        (set) => ({
            token: "",
            setToken: (token) => set(() => ({ token })),
            removeToken: () => set(() => ({ token: "" })),
        }),
        {
            name: "access_token",
        }
    )
)

const authSelector = (state: ExtractState<typeof useAuthStore>) => {
    return {
        token: state.token,
        setToken: state.setToken,
        removeToken: state.removeToken,
    }
}

export const useAuth = () => useAuthStore(authSelector)
