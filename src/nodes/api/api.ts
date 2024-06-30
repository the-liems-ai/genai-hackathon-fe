import { AskNodeRequest, AskNodeResponse } from "@/types"
import { instance } from "@/utils/axios"

enum NodeAPI {
    ASK_NODE = "/ask/node",
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
