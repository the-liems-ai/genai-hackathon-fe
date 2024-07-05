import { getAuth } from "@/stores/auth-store"
import { getCurrentOrg } from "@/stores/org-store"
import {
    AddUserToOrgRequest,
    AskNodeRequest,
    AskNodeResponse,
    OrgResponse,
    RemoveUserFromOrgRequest,
    TransferOwnershipRequest,
    UpdateOrgRequest,
    UserResponse,
} from "@/types"
import { authInstance, instance } from "@/utils/axios"

enum NodeAPI {
    ASK_NODE = "/ask/node",
}

enum UserAPI {
    LOGIN = "/login",
    VERIFY = "/verify",
}

enum OrgAPI {
    ORG = "/org",
    ADD_USERS = "/add",
    REMOVE_USERS = "/remove",
    LEAVE = "/leave",
    TRANSFER = "/transfer",
}

export const getAskNode = async ({
    id,
    request,
}: {
    id: number
    request: AskNodeRequest
}) => {
    return instance.post<AskNodeResponse>(`${NodeAPI.ASK_NODE}/${id}`, request)
}

export const getUser = async (token: string) => {
    if (!token || token.trim() === "") return null
    const { data } = await authInstance.get<UserResponse>(
        `${UserAPI.VERIFY}/${token}`
    )

    return data
}

export const getOrg = async (id: string) => {
    if (!id || id.trim() === "") return null
    const { data } = await authInstance.get<OrgResponse>(
        `${OrgAPI.ORG}/${id}`,
        {
            headers: {
                Authorization: `Bearer ${getAuth().token}`,
            },
        }
    )

    return data
}

export const updateOrg = async (request: UpdateOrgRequest) => {
    const { currentOrg: id } = getCurrentOrg()
    const { data } = await authInstance.put<OrgResponse>(
        `${OrgAPI.ORG}/${id}`,
        request,
        {
            headers: {
                Authorization: `Bearer ${getAuth().token}`,
            },
        }
    )

    return data
}

export const addUsersToOrg = async (request: AddUserToOrgRequest) => {
    const { currentOrg: id } = getCurrentOrg()

    const { data } = await authInstance.put<OrgResponse>(
        `${OrgAPI.ORG}/${id}${OrgAPI.ADD_USERS}`,
        request,
        {
            headers: {
                Authorization: `Bearer ${getAuth().token}`,
            },
        }
    )

    return data
}

export const removeUsersFromOrg = async (request: RemoveUserFromOrgRequest) => {
    const { currentOrg: id } = getCurrentOrg()

    const { data } = await authInstance.put<OrgResponse>(
        `${OrgAPI.ORG}/${id}${OrgAPI.REMOVE_USERS}`,
        request,
        {
            headers: {
                Authorization: `Bearer ${getAuth().token}`,
            },
        }
    )

    return data
}

export const transferOwnership = async (request: TransferOwnershipRequest) => {
    const { currentOrg: id } = getCurrentOrg()

    const { data } = await authInstance.put<OrgResponse>(
        `${OrgAPI.ORG}/${id}${OrgAPI.TRANSFER}`,
        request,
        {
            headers: {
                Authorization: `Bearer ${getAuth().token}`,
            },
        }
    )

    return data
}

export const leaveOrg = async () => {
    const { currentOrg: id } = getCurrentOrg()

    const { data } = await authInstance.delete<OrgResponse>(
        `${OrgAPI.ORG}/${id}${OrgAPI.LEAVE}`,
        {
            headers: {
                Authorization: `Bearer ${getAuth().token}`,
            },
        }
    )

    return data
}

export const deleteOrg = async () => {
    const { currentOrg: id } = getCurrentOrg()

    const { data } = await authInstance.delete<OrgResponse>(
        `${OrgAPI.ORG}/${id}`,
        {
            headers: {
                Authorization: `Bearer ${getAuth().token}`,
            },
        }
    )

    return data
}
