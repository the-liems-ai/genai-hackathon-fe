import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAskNode, getUser } from "./api"
import { useAuth } from "@/stores/auth-store"
import { UserResponse } from "@/types"

export const useAskNode = () => {
    return useMutation({
        mutationFn: getAskNode,
    })
}

export const useUser = () => {
    const { token } = useAuth()
    const queryClient = useQueryClient()
    if (!token) return { user: null, isLoading: false }

    const { data, isLoading } = useQuery({
        queryKey: ["user", token],
        queryFn: () => getUser(token),
    })
    const setUser = (user: UserResponse) => {
        queryClient.setQueryData(["user", token], user)
    }
    return { data, isLoading, setUser }
}
