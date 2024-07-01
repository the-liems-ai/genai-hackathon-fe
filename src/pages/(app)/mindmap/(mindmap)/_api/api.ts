import { DiagramsResponse } from "@/types"
import { instance } from "@/utils/axios"

enum DiagramEndpoint {
    GET = "/diagrams",
    DELETE = "/diagrams",
}

export const getDiagrams = async () => {
    const { data } = await instance.get<DiagramsResponse>(DiagramEndpoint.GET)

    return data
}

export const deleteDiagram = (id: number) => {
    return instance.delete(`${DiagramEndpoint.DELETE}/${id}`)
}
