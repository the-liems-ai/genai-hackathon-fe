import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
    addUsersToOrg,
    deleteOrg,
    getAskNode,
    getOrg,
    getUser,
    leaveOrg,
    removeUsersFromOrg,
    transferOwnership,
    updateOrg,
} from "./api"
import { useAuth } from "@/stores/auth-store"
import { OrgResponse, UserResponse } from "@/types"
import { useCurrentOrg } from "@/stores/org-store"

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

export const useOrg = () => {
    const { currentOrg: orgId } = useCurrentOrg()
    const queryClient = useQueryClient()
    if (!orgId) return { org: null, isLoading: false }

    const { data, isLoading } = useQuery({
        queryKey: ["org", orgId],
        queryFn: () => getOrg(orgId),
    })
    const setOrg = (org: OrgResponse) => {
        queryClient.setQueryData(["org", orgId], org)
    }
    return { data, isLoading, setOrg }
}

export const useUpdateOrg = () => {
    return useMutation({
        mutationFn: updateOrg,
    })
}

export const useAddUsersToOrg = () => {
    return useMutation({
        mutationFn: addUsersToOrg,
    })
}

export const useRemoveUsersFromOrg = () => {
    return useMutation({
        mutationFn: removeUsersFromOrg,
    })
}

export const useTransferOwnership = () => {
    return useMutation({
        mutationFn: transferOwnership,
    })
}

export const useLeaveOrg = () => {
    return useMutation({
        mutationFn: leaveOrg,
    })
}

export const useDeleteOrg = () => {
    return useMutation({
        mutationFn: deleteOrg,
    })
}
