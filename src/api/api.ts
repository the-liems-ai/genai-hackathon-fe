import { AskNodeRequest, AskNodeResponse, UserResponse } from "@/types"
import { authInstance, instance } from "@/utils/axios"

enum NodeAPI {
    ASK_NODE = "/ask/node",
}

enum UserAPI {
    LOGIN = "/login",
    VERIFY = "/verify",
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
