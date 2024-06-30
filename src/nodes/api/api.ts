import { AskNodeRequest, AskNodeResponse } from "@/types"
import { instance } from "@/utils/axios"

enum NodeAPI {
    ASK_NODE = "/ask/node",
}

export const getAskNode = async (request: AskNodeRequest) => {
    return instance.post<AskNodeResponse>(NodeAPI.ASK_NODE, request)
}
