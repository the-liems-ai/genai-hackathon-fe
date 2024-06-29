import { DiagramsResponse } from "@/types"
import { instance } from "@/utils/axios"

enum DiagramEndpoint {
    GET = "/diagrams",
}

export const getDiagrams = async () => {
    const { data } = await instance.get<DiagramsResponse>(DiagramEndpoint.GET)

    return data
}
