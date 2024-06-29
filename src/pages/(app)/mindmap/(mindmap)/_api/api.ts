import { instance } from "@/utils/axios"
import { DiagramsResponse } from "./types"

enum DiagramEndpoint {
    GET_DIAGRAMS = "/diagrams",
}

export const getDiagrams = async () => {
    const { data } = await instance.get<DiagramsResponse>(
        DiagramEndpoint.GET_DIAGRAMS
    )

    return data
}
