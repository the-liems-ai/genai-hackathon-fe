import { useMutation, useQuery } from "@tanstack/react-query"
import { getAskNode, getUser } from "./api"
import { useAuth } from "@/stores/auth-store"

export const useAskNode = () => {
    return useMutation({
        mutationFn: getAskNode,
    })
}

export const useUser = () => {
    const { token } = useAuth()

    if (!token) return { user: null, isLoading: false }

    const { data: user, isLoading } = useQuery({
        queryKey: ["user", token],
        queryFn: () => getUser(token),
    })

    return { user, isLoading }
}
