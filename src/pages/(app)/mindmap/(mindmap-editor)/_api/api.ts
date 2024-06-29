import { DiagramResponse } from "@/types"
import { instance } from "@/utils/axios"

enum EditDiagramEndpoint {
    CREATE = "/create/diagram",
    GET_BY_ID = "/diagram",
}

export const createMindmap = (prompt: string) => {
    return instance.post<DiagramResponse>(EditDiagramEndpoint.CREATE, prompt)
}

export const getMindmapById = (id: string) => {
    return instance.get<DiagramResponse>(
        `${EditDiagramEndpoint.GET_BY_ID}/${id}`
    )
}
